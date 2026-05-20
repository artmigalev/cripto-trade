import { NavLink, RouterLinks } from '@/enums/nav-link.enum';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected btn_text = NavLink.REGISTER;
  protected login_link_text = NavLink.LOGIN;
  protected login_link = RouterLinks.LOGIN;

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

  handleSubmit() {
    if (this.registerForm.invalid) return;

    this.router.navigate([RouterLinks.DASHBOARD]);
  }
}
