// import { MarketCard } from '@/app/interfaces/market-card.interface';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Card } from '@interfaces/card.interface';
import { ConverterPipe } from '../../shared/pipes/converter.pipe';
import { HighlightDirective } from '@directives/highlight.directive';
import { DashboardService } from '@services/dashboard.service';
import { ContentLoaderModule } from '@ngneat/content-loader';

@Component({
  selector: 'app-market-card',
  standalone: true,
  imports: [
    MatCardModule,
    ConverterPipe,
    HighlightDirective,
    ContentLoaderModule,
  ],
  templateUrl: './market-card.component.html',
  styleUrl: './market-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketCardComponent {
  private readonly dashboardService = inject(DashboardService);
  ticker = input.required<Card>();

  protected readonly isFavorite = computed(() =>
    this.dashboardService.isFavorite(this.ticker()?.symbol as string)
  );

  toggle() {
    this.dashboardService.toggleFavorite(this.ticker()?.symbol as string);
  }
}
