import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MarketService } from '@/app/services/market.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private marketService = inject(MarketService);

  protected readonly title = signal('crypto-trade');

  ngOnInit(): void {
    void this.marketService.loadedData().catch(error => {
      console.log(error);
    });
  }
}
