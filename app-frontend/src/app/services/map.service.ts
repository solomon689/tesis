import * as mapboxgl from 'mapbox-gl';
import { Injectable } from '@angular/core';
import { SocketsService } from './sockets.service';
import { Geolocation } from '@capacitor/geolocation';
import { UserLocation } from '../models/user-location';
import { environment } from '../../environments/environment';

import { registerPlugin } from '@capacitor/core';
import { BackgroundGeolocationPlugin } from "@capacitor-community/background-geolocation";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private interval: any;
  private map: mapboxgl.Map;
  private zoom: number = 15;
  private lastPosition: UserLocation = {
    latitude: 0,
    longitude: 0
  };
  private marker: mapboxgl.Marker;
  private watchId: Promise<string>;
  private mapbox = (mapboxgl as typeof mapboxgl);
  private BackgroundGeolocation: BackgroundGeolocationPlugin;
  private style: string = `mapbox://styles/mapbox/streets-v11`;

  constructor(private socketService: SocketsService) {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  /**
   * Método encargado de construir el mapa a mostrar para el usuario, junto
   * a su posición actual.
   */
  public async buildMap(): Promise<void> {

    let marker: HTMLElement = this.createrMarker();

    //Se obtiene la posicion actual del usuario y se crea el mapa.    
    Geolocation.getCurrentPosition().then(position => {
      this.map = new mapboxgl.Map({
        container: 'mapa',
        style: this.style,
        zoom: this.zoom,
        center: [position.coords.longitude,position.coords.latitude]
      });

      // Se guardan las coordenadas para mandarlas al momento de compartir la ubicación.
      this.lastPosition.latitude = position.coords.latitude;
      this.lastPosition.longitude = position.coords.longitude;

      // Se añade un marcador con la posición actual del usuario.
      this.marker = new mapboxgl.Marker(marker).setLngLat([position.coords.longitude, position.coords.latitude]).addTo(this.map);
    
      this.map.addControl(new mapboxgl.NavigationControl());
    });

    /*
      Se utiliza un intervalo para refrescar el mapa y saber la ubicación actual del usuario. Se hace esto para evitar
      el uso del metodo watchPosition ya que gasta mucha bateria.
    */
    this.interval = setInterval(() => {

      //Se obtiene la posicion actual del usuario y se crea el mapa.    
      Geolocation.getCurrentPosition().then(position => {
        this.map = new mapboxgl.Map({
          container: 'mapa',
          style: this.style,
          zoom: this.zoom,
          center: [position.coords.longitude,position.coords.latitude]
        });
        
         // Se guardan las coordenadas para mandarlas al momento de compartir la ubicación.
        this.lastPosition.latitude = position.coords.latitude;
        this.lastPosition.longitude = position.coords.longitude;

        // Se añade un marcador con la posición actual del usuario.
        this.marker = new mapboxgl.Marker(marker)
        .setLngLat([position.coords.longitude, position.coords.latitude]).addTo(this.map);
      
        this.map.addControl(new mapboxgl.NavigationControl());
      });

    }, 30000);
    
  }
  
  /**
   * Captura las coordenadas del usuario cada cierto tiempo y las envia hacia la página de monitoreo
   * @param roomId - Parámetro que contiene la id de la sala de socket
   */
  public async startingToWatch(roomId: string): Promise<void> {
    clearInterval(this.interval);
    
    this.socketService.emitUserCoords(this.lastPosition,roomId);

    this.BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");
    this.watchId = this.BackgroundGeolocation.addWatcher({
      backgroundMessage: "Tus amigos te estan cuidando.",
      backgroundTitle: "Compartiendo tu ubicación.",
      requestPermissions: true,
      stale: false,
      distanceFilter: 10
    }, (position, error) => {
      if (error) {
        if (error.code === "NOT_AUTHORIZED") {
            if (window.confirm(
                "Esta aplicación necesita saber tu ubicación, " +
                "pero no se han concedido.\n\n" +
                "Configurar ahora?"
            )) {
                this.BackgroundGeolocation.openSettings();
            }
        }
        return console.error(error);
      }

      let userPosition: UserLocation = {
            latitude: position.latitude,
            longitude: position.longitude
      };

      this.socketService.emitUserCoords(userPosition, roomId);

      this.map.setCenter([position.longitude, position.latitude]);
      this.marker.setLngLat([position.longitude, position.latitude]).addTo(this.map);
    });

  }

  /**
   * Detiene el monitoreo constante de las coordenadas del usuario.
   */
  public async stopWatchPosition(): Promise<void> {
    const id: string = await this.watchId;

    this.BackgroundGeolocation.removeWatcher({id});
  }

  private createrMarker(): HTMLElement {
    let marker: HTMLElement = document.createElement('div');
    marker.className = 'marker',
    marker.style.width = '30px';
    marker.style.height = '30px';
    marker.style.backgroundRepeat = 'no-repeat';
    marker.style.backgroundImage = 'url("../../assets/img/walking-solid.svg")';

    return marker;
  }

}
