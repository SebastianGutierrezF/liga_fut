import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  showNav = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  toggleNav() {
    if (this.showNav) this.showNav = false;
    else this.showNav = true;
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/login']);
  }
}
