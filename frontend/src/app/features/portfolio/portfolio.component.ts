import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { AssetTableComponent } from '@components/asset-table/asset-table.component';
import { Balance } from '@interfaces/api.interface';
import { PortfolioService } from '@services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  imports: [AssetTableComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PortfolioComponent {
  private readonly portfolioService = inject(PortfolioService);

  protected readonly assets = computed<Balance[] | null>(
    () => this.portfolioService.state()?.assetTableData || null
  );
}
