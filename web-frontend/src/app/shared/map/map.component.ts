import { Component, Input, OnInit } from '@angular/core';
import { MapboxService } from '../../services/mapbox.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public userName: string = '';

  constructor(
              private mapboxService: MapboxService,
              private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userName = this.activedRoute.snapshot.params.user;
    this.mapboxService.buildMap();
    this.mapboxService.startToWatch();
  }

}
