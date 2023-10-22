import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseComponent } from './base/base.component';

@Component({
  standalone: true,
  imports: [RouterModule, BaseComponent],
  selector: 'shared-store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}

/*




  - Learn how to subclass the control value accessors, (this may be useful later if we want to propagate the values on change and add our own validations 
    (or send that information to the backend or the formGroup at specific times))
  - Angular's form builder does pretty much everything you'd need for handling display and validations out of the box, after this is complete let's learn how to add functionality to it with ease




nx Libraries
  - Store (Infrastructure, factories, redux store, api access effects, and other logic that links the apis to the store)
  - Individual components -> Access the data from the backend using subclassed factory objects (I like this logic, but I suck right now and want to learn how to build this (not necessary for getting information from the backend though, it's just fun))

Let's make some dummy components for interacting with a backend api (the business logic doesn't have to be real, but it needs to be seamless easy on the system)
Subclass the factories to use observables that interact with the data in response from information coming back from the api 
We're just using an example css library, but we'd probably use storybook or whatever the company would want to use, but this part isn't complicated (making it safe and learning how to initially build these things might be sometimes but that's all good)
Add http interceptors and router guards for security precautions -> how do you configure authentication with this also?
I just want to get better at this before I take on other things


Later figure out different cloud distributions 


Search for a job (now that you get the idea it shouldn't be so complicated to figure the rest out)


*/
