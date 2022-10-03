import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pass = "";
  email = "";

  constructor(private router: Router, private cs: ConexionService) { }

  ngOnInit(): void {
  }

  login() {
    this.cs.post('usuario', 'login', {email: this.email, pass: this.pass}).subscribe((dato: any) => {
      localStorage.setItem('logged', dato);
      this.router.navigate(['/inicio']);
    });
  }
}
