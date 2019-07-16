import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountListComponent } from '../account-list/account-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  isHomeComponentLoaded: boolean = false;

  constructor() { }

  ngOnInit() {
    this.isHomeComponentLoaded = true;
    console.log("isHomeComponentLoaded home " + this.isHomeComponentLoaded);
  }

  ngOnDestroy() {
    this.isHomeComponentLoaded = false;
    console.log("isHomeComponentLoaded home " + this.isHomeComponentLoaded);
  }

}
