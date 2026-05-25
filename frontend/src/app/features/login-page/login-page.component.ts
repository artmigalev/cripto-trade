import { AuthService } from '@/app/core/services/auth.service';
import { AuthRotes, RouterLinks } from '@/enums/nav-link.enum';
import { HttpErrorResponse } from '@angular/common/http';
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
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected btn_text = AuthRotes.Login;
  protected register_link_text = AuthRotes.Register;
  protected register_link = RouterLinks.Register;

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  email = this.loginForm.controls.email;
  password = this.loginForm.controls.password;

  async handleSubmit() {
    if (this.loginForm.invalid) return;

    try {
      await this.authService.login(this.email.value!, this.password.value!);
      this.router.navigate([RouterLinks.Dashboard]);
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.loginForm.setErrors({
          invalidCredentials: true,
          error: error.error.message,
        });

        return;
      }
    }
  }
}
