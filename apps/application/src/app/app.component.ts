import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [RouterModule, BaseComponent, HttpClientModule],
  selector: 'shared-store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}

/*

Add http interceptors and router guards for security precautions -> how do you configure authentication with this also?
Later figure out different cloud distributions 


*/
