import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { AssetTableComponent } from '@components/asset-table/asset-table.component';
import { Balance } from '@interfaces/api.interface';
import { ConverterPipe } from '@pipes/converter.pipe';
import { PortfolioService } from '@services/portfolio.service';
import { WidgetComponent } from '@components/widget/widget.component';

@Component({
  selector: 'app-portfolio',
  imports: [AssetTableComponent, ConverterPipe, WidgetComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PortfolioComponent {
  private readonly portfolioService = inject(PortfolioService);

  protected readonly assets = computed<Balance[] | null>(
    () => this.portfolioService.state()?.assetTableData || null
  );
  portfolioValue = computed(() => this.portfolioService.portfolioValueUSD());
}
