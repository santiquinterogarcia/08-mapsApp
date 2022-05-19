import { Component } from '@angular/core';

interface MenuItem {
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }

      ul {
        display: flex;
        width: 100%;
        justify-content: center;
      }
    `,
  ],
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      ruta: '/maps/fullscreen',
      nombre: 'FullScreen',
    },
    {
      ruta: '/maps/zoom-range',
      nombre: 'Zoom Range',
    },
    {
      ruta: '/maps/marcadores',
      nombre: 'Marcadores',
    },
    {
      ruta: '/maps/propiedades',
      nombre: 'Propiedades',
    },
  ];

  constructor() {}
}
