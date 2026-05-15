import { AuthService } from '@/app/services/auth.service';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-status-icon',
  imports: [],
  templateUrl: './status-icon.component.html',
  styleUrl: './status-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusIconComponent {
  authService = inject(AuthService);

  status = computed(() => this.authService.isApiConfigured());
}
