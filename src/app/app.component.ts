import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CryptoTracker';
  selectedCurrency: string = "thb";

  sendCurrency(event: string) {
    console.log(event);
  }
}
