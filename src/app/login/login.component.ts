import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    console.log(this.form.value.email)
    if (this.form.invalid) return;

    this.auth.login(this.form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/tasks']);
      },
      () => alert('Invalid credentials')
    );
  }
}
