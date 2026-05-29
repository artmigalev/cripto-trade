import { AuthService } from '@/app/core/services/auth.service';
import { RouterLinks } from '@/enums/nav-link.enum';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SettingComponent } from '@/app/interfaces/setting-component.interface';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SettingsComponent {
  private readonly authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  private readonly _secretFieldState = signal<SettingComponent['fieldState']>({
    state: 'hidden',
    typeInput: 'password',
  });

  protected inputState = computed(() => this._secretFieldState().state);
  protected inputType = computed(() => this._secretFieldState().typeInput);

  toggleInputType() {
    this._secretFieldState.update(prev => ({
      state: prev.state === 'hidden' ? 'visible' : 'hidden',
      typeInput: prev.typeInput === 'password' ? 'text' : 'password',
    }));
  }

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
    this.router.navigate([RouterLinks.Dashboard]);
  }
}
