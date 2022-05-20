import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }

      .row {
        background-color: white;
        position: fixed;
        bottom: 50px;
        left: 5%;
        z-index: 10;
        padding: 10px 5px;
      }

      .zoom-range {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .btns-range {
        display: flex;
        justify-content: space-around;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  map!: mapboxgl.Map;
  zoomLevel: number = 15;
  centerCoordinates: [number, number] = [
    -75.62007391216662, 6.2817321653360665,
  ];

  @ViewChild('map') divMap!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.centerCoordinates,
      zoom: this.zoomLevel,
    });

    /* Listener que detecta el cuando el zoom cambia */
    this.map.on('zoom', () => {
      this.zoomLevel = this.map.getZoom();
    });

    /* Listener que detecta el cuando el zoom es mayor a 18 y lo cambia a 18 si eso ocurre */
    this.map.on('zoomend', () => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }
    });

    /* Listener que detecta cuando se mueve las coordenadas del mapa */
    this.map.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.centerCoordinates = [lng, lat];
    });
  }

  /* Destruyendo los listener cuando se destruye el componente */
  ngOnDestroy(): void {
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  }

  zoomOut() {
    this.map.zoomOut();
  }

  zoomIn() {
    this.map.zoomIn();
  }

  zoomChange(value: string) {
    this.map.zoomTo(Number(value));
  }
}
