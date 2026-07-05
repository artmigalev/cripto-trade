import { AuthService } from '@/app/core/services/auth.service';
import { AuthRotes, RouterLinks } from '@/enums/nav-link.enum';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  applyWhen,
  email,
  form,
  FormField,
  required,
  validate,
  FormRoot,
} from '@angular/forms/signals';

interface AuthForm {
  email: string;
  password: string;
  confirm: string;
}

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink, FormField, FormRoot],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  route = this.router.url;
  isAuth = computed(() => this.authService.isAuthenticated());

  protected register_link_text = AuthRotes.Register;
  protected register_link = RouterLinks.Register;

  formModel = signal<AuthForm>({
    email: '',
    password: '',
    confirm: '',
  });
  links = [
    {
      label: AuthRotes.Login,
      link: `/${AuthRotes.Login.toLowerCase()}`,
    },
    {
      label: AuthRotes.Register,
      link: `/${AuthRotes.Register.toLowerCase()}`,
    },
  ];
  labelsForm = {
    email: 'Email',
    password: 'Password',
    confirm: 'Confirm',
  } satisfies AuthForm;
  protected readonly authForm = form(
    this.formModel,
    fieldPath => {
      required(fieldPath.email, {
        message: `${this.labelsForm.email} ${AuthFormMsg['Required']}`,
      });
      email(fieldPath.email, { message: AuthFormMsg.Email });
      required(fieldPath.password, {
        message: `${this.labelsForm.password} ${AuthFormMsg['Required']}`,
      });
      applyWhen(
        fieldPath,
        () => this.route === '/register',

        fieldPath => {
          required(fieldPath.confirm, {
            message: `${this.labelsForm.confirm} ${AuthFormMsg['Required']}`,
          });
          validate(fieldPath.confirm, ({ value, valueOf }) => {
            if (value() !== valueOf(fieldPath.password)) {
              return {
                kind: 'confirm',
                message: AuthFormMsg.Confirm,
              };
            }
            return null;
          });
        }
      );
    },
    {
      submission: {
        action: async f => {
          try {
            const delay = (ms: number) =>
              new Promise(resolve => setTimeout(resolve, ms));
            const firstError = this.authForm().errorSummary()[0];

            if (firstError?.fieldTree) {
              firstError.fieldTree().focusBoundControl();
            } else {
              const { password, email } = f().value();
              console.log('Logging in with:', f().value());

              if (this.route === '/register') {
                await this.authService.register(email, password);
              } else {
                await this.authService.login(email, password);
              }
              if (this.isAuth()) {
                await delay(2000);
                this.router.navigate([RouterLinks.Settings]);
                f().reset({
                  email: '',
                  password: '',
                  confirm: '',
                });
                return;
              }
            }
            throw new Error('do something');
          } catch (error: unknown) {
            console.log(error);

            return { kind: 'auth', message: 'Invalid Cridentials' };
          }
        },
      },
    }
  );
}

enum AuthFormMsg {
  Required = 'is required',
  Email = 'Enter a valid email address',
  Confirm = "The passwords don't match",
}
