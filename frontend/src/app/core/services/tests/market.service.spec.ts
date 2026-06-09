import { TestBed } from '@angular/core/testing';
import { MarketTabs } from '@enums/market.enum';
import { Market } from '@interfaces/market.interface';
import { ApiService } from '@services/api.service';
import { MarketService } from '@services/market.service';
import { WebsocketService } from '@services/websocket.service';
import { Mocked } from 'vitest';

const mockTickers = [
  {
    symbol: 'BNBUSDT',
    priceChange: '-7.54000000',
    priceChangePercent: '-1.253',
    weightedAvgPrice: '596.98679869',
    openPrice: '601.84000000',
    highPrice: '605.64000000',
    lowPrice: '584.06000000',
    lastPrice: '594.30000000',
    volume: '11066.62900000',
    quoteVolume: '6606631.41897000',
    openTime: 1780963200000,
    closeTime: 1781049599999,
    firstId: 54092,
    lastId: 64819,
    count: 10728,
  },
  {
    symbol: 'BTCUSDT',
    priceChange: '-1290.53000000',
    priceChangePercent: '-2.046',
    weightedAvgPrice: '62255.88339675',
    openPrice: '63080.54000000',
    highPrice: '64843.68000000',
    lowPrice: '51911.91000000',
    lastPrice: '61790.01000000',
    volume: '879.70837000',
    quoteVolume: '54767021.70586660',
    openTime: 1780963200000,
    closeTime: 1781049599999,
    firstId: 681090,
    lastId: 809156,
    count: 128067,
  },
];

const getTicker: Mocked<ApiService['getTicker24hr']> = vi.fn().mockReturnValue(mockTickers);

describe('Market Service', () => {
  const state: Market['state'] = {
    tickers: {
      [MarketTabs['USDT']]: [
        {
          symbol: 'USDT',
          lastPrice: '1',
          priceChangePercent: '2',
          volume: '1',
        },
      ],
      [MarketTabs['BTC']]: [],
      [MarketTabs['ETH']]: [],
      [MarketTabs['ALL']]: [],
    },
    searchValue: '',
  };

  let marketService: MarketService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useValue: {
            getTicker24hr: getTicker,
          },
        },
        {
          provide: WebsocketService,
          useValue: {
            subscribe: () => Promise.resolve(state.tickers['ALL']),
          },
        },
      ],
    });
    marketService = TestBed.inject(MarketService);
  });
  it('should load tickers', async () => {
    const tickersData = await marketService.loadedData();
    expect(tickersData.length).toBe(2);
  });
  it('should return Top tickers', () => {
    const topSymbol = 'USDT';

    const topTickers = marketService.getTopTickers(mockTickers, [topSymbol]);

    expect(topTickers.length).toBe(2);
  });
});
