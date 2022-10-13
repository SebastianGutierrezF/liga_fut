import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.email]],
    pass: [, Validators.required]
  })

  constructor(private router: Router, private cs: ConexionService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login() {
    this.cs.post('usuario', 'login', this.form.value).subscribe((dato: any) => {
      localStorage.setItem('logged', dato);
      this.router.navigate(['/inicio']);
    });
  }

  notValid(campo: string) {
    return this.form.touched && this.form.controls[campo].invalid;
  } 
}
