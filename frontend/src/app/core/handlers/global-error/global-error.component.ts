import { ChangeDetectionStrategy, Component, ErrorHandler, inject } from '@angular/core';
import { ApiService } from '@services/api.service';
import { KeysService } from '@services/keys.service';
import { MarketService } from '@services/market.service';

@Component({
  selector: 'app-global-error',
  imports: [],
  templateUrl: './global-error.component.html',
  styleUrl: './global-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalErrorComponent implements ErrorHandler {
  private readonly marketService = inject(MarketService);
  private readonly apiService = inject(ApiService);
  private readonly keyService = inject(KeysService);

  handleError(error: Error) {
    console.log(error);
  }
}
