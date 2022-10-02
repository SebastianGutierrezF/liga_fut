import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  showNav = false;

  constructor() { }

  ngOnInit(): void {
  }


  toggleNav() {
    if (this.showNav) this.showNav = false;
    else this.showNav = true;
  }
}
