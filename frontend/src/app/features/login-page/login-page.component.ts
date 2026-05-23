import { NavLink, RouterLinks } from '@/enums/nav-link.enum';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected btn_text = NavLink.Login;
  protected register_link_text = NavLink.Login;
  protected register_link = RouterLinks.Register;

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  email = this.loginForm.controls.email;
  password = this.loginForm.controls.password;

  handleSubmit() {
    if (this.loginForm.invalid) return;

    this.router.navigate([RouterLinks.Dashboard]);
  }
}
