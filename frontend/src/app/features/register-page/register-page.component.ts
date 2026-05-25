import { AuthService } from '@/app/core/services/auth.service';
import { AuthRotes, RouterLinks } from '@/enums/nav-link.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

const passwordMatchValidator = (group: AbstractControl) => {
  const pswd = group.get('password')?.value;
  const cpswd = group.get('passwordConfirm')?.value;
  return pswd === cpswd ? null : { notConfirm: true };
};

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPageComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected btn_text = AuthRotes.Register;
  protected login_link_text = AuthRotes.Login;
  protected login_link = RouterLinks.Login;

  isSuccess = signal(false);

  registerForm = this.fb.group(
    {
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      passwordConfirm: ['', [Validators.minLength(8), Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  email = this.registerForm.controls.email;
  pswd = this.registerForm.controls.password;
  pswdConfirm = this.registerForm.controls.passwordConfirm;

  async handleSubmit() {
    if (this.registerForm.invalid) return;
    try {
      await this.authService.register(this.email.value!, this.pswd.value!);

      this.isSuccess.set(true);
      this.registerForm.reset();
      setTimeout(() => {
        this.router.navigate([RouterLinks.Settings]);
      }, 2000);
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 400) {
        this.registerForm.setErrors({
          exists: true,
          error: error.error.message,
        });
      }
    }
  }
}
