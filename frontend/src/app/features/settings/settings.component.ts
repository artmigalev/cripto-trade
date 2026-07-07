import { AuthService } from '@/app/core/services/auth.service';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SettingComponent } from '@/app/interfaces/setting-component.interface';
import { KeysService } from '@services/keys.service';
import { RouterLinks } from '@enums/nav-link.enum';
import { form, required, FormRoot, FormField } from '@angular/forms/signals';

interface FormType {
  model: {
    apiKey: string;
    secretKey: string;
  };
  stateInput: 'hidden' | 'visible';
  typeInput: 'password' | 'text';
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, FormRoot, FormField],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SettingsComponent {
  private readonly authService = inject(AuthService);
  private readonly keyService = inject(KeysService);
  private router = inject(Router);
  private formModel = signal<FormType['model']>({
    apiKey: '',
    secretKey: '',
  });
  isConfig = computed(() => this.authService.isApiConfigured());
  protected readonly _notifyMessage = signal('');

  private readonly _secretFieldState = signal<SettingComponent['fieldState']>({
    state: 'hidden',
    typeInput: 'password',
  });

  notifyMessage = computed(() => this._notifyMessage());

  protected inputState = computed(() => this._secretFieldState().state);
  protected inputType = computed(() => this._secretFieldState().typeInput);

  toggleInputType() {
    this._secretFieldState.update(prev => ({
      state: prev.state === 'hidden' ? 'visible' : 'hidden',
      typeInput: prev.typeInput === 'password' ? 'text' : 'password',
    }));
  }
  settingForm = form(
    this.formModel,
    field => {
      required(field['apiKey'], { message: 'This field must be  required' });
      required(field['secretKey'], { message: 'This field must be  required' });
    },
    {
      submission: {
        action: async f => {
          try {
            const delay = (ms: number) =>
              new Promise(resolve => setTimeout(resolve, ms));
            const firstError = f().errorSummary()[0];
            console.log(firstError);

            if (firstError) {
              firstError.fieldTree().focusBoundControl();
            } else {
              const { apiKey, secretKey } = f().value();
              const result = await this.keyService.saveKeys({
                apiKey,
                secretKey,
              });
              this.authService.setKeysConfigured(result.configured);

              if (this.isConfig()) {
                await delay(2000);
                this.router.navigate([RouterLinks.Dashboard]);
                f().reset(this.formModel());
                return;
              }
            }
          } catch (error) {
            console.log(error);
            return { kind: 'keys', message: ' Keys' };
          }
          return;
        },
      },
    }
  );
}
