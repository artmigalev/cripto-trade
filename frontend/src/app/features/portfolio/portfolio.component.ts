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
import { DistributionComponent } from '@components/distribution/distribution.component';
import { mapperBalanceToPieChartData } from '@/app/shared/mappers/pie-chart.mapper';

@Component({
  selector: 'app-portfolio',
  imports: [
    AssetTableComponent,
    ConverterPipe,
    WidgetComponent,
    DistributionComponent,
  ],
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
  distributionData = computed(() =>
    this.portfolioService
      .state()
      ?.assetTableData.map(asset => mapperBalanceToPieChartData(asset))
  );
}
