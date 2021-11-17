import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { SocketsService } from './sockets.service';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  private zoom = 15;
  private marker: any;
  private map!: mapboxgl.Map;
  private mapbox = (mapboxgl as typeof mapboxgl);
  private style = 'mapbox://styles/mapbox/streets-v11';

  constructor(private socketService: SocketsService) {
    this.mapbox.accessToken = environment.mapboxUrl;
  }

  /**
   * Método encargado de construir el mapa a mostrar para el usuario, junto
   * a su posición actual.
   */
  public buildMap(): void {
    const marker: HTMLElement = this.createrMarker();

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [0,0],
      zoom: this.zoom
    });

    this.marker = new mapboxgl.Marker(marker);

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  /**
   * Comienza a recibir las coordenadas actuales del usuario geoen y actualiza el
   * mapa con la información reciente
   */
  public startToWatch(): void {
    this.socketService.receiveUserPosition().subscribe(position => {
      this.map.setCenter([position.longitude, position.latitude]);
      this.marker.setLngLat([position.longitude,position.latitude]).addTo(this.map);
    })
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
