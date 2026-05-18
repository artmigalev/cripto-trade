import { AuthService } from '@/app/core/services/auth.service';
import { RouterLinks } from '@/enums/nav-link.enum';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SettingsComponent {
  private readonly authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    apiKey: ['', [Validators.required, Validators.minLength(5)]],
    secretKey: ['', [Validators.required, Validators.minLength(5)]],
  });
  apiKey = this.form.get('apiKey');
  secretKey = this.form.get('secretKey');

  handleResetForm() {
    this.form.reset();
  }
  handleSubmit() {
    if (this.form.invalid) return;

    const { apiKey, secretKey } = this.form.value;

    localStorage.setItem('binance_keys', JSON.stringify({ apiKey, secretKey }));
    this.authService.setKeysConfigured(true);
    this.form.reset();
    this.router.navigate([RouterLinks.DASHBOARD]);
  }
}
