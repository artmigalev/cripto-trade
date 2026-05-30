import { AuthService } from '@/app/core/services/auth.service';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SettingComponent } from '@/app/interfaces/setting-component.interface';
import { KeysService } from '@services/keys.service';
import { SettingFormError } from '@enums/custom-error-message.enum';
import { SettingForm } from '@enums/notify-messages.enum';
import { RouterLinks } from '@enums/nav-link.enum';

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
  private readonly keyService = inject(KeysService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  protected readonly _notifyMessage = signal('');

  notifyMessage = computed(() => this._notifyMessage());

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
  async handleSubmit() {
    if (this.form.invalid) return;

    try {
      const { apiKey, secretKey } = this.form.value;

      const { configured } = await this.keyService.saveKeys({
        apiKey: apiKey!,
        secretKey: secretKey!,
      });
      await this.authService.getAccount();

      this.authService.setKeysConfigured(true);
      if (!configured) {
        throw new Error(SettingFormError.InvalidKeys);
      }
      this.form.reset();
      this._notifyMessage.set(SettingForm.Connected);
      setTimeout(() => {
        this.router.navigate([RouterLinks.Dashboard]);
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.form.setErrors({ saveFailed: true });
        this._notifyMessage.set(error.message);
      }
    }
  }
}
