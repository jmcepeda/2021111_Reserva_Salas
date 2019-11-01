import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema de Reservas';
  public openedSideBar = false;

  onToggle(shouldOpen: boolean) {
    this.openedSideBar = shouldOpen;
  }
}
