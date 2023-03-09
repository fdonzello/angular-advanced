import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="text-center">
      Angular Advanced
    </h1>

    <p class="text-center">This is app is built with Angular 16.0.0-next.0</p>

    <p class="text-center mt-5">If you want to clone this app locally, these are the steps to follow:</p>

    <div class="d-flex flex-column align-items-center  mt-5">
      <div class="text-left"><strong>Clone the repo</strong>: git clone https://github.com/fdonzello/angular-advanced</div>
      <div><strong>Install dependencies</strong>: npm run app:setup</div>
      <div><strong>Start the server</strong>: npm start</div>
    </div>

  `,
  styles: [
  ]
})
export class HomeComponent {

}
