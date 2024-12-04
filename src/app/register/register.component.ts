import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
    
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  register() {
    if (this.form.invalid) return;

    this.auth.register(this.form.value).subscribe(
      () => {
        alert('Registration successful. Please login.');
        this.router.navigate(['/login']);
      },
      (err) => alert(err.error.message || 'Registration failed')
    );
  }
}

