import { Card } from '@interfaces/card.interface';

interface MainAssetsType {
  quantity: number;
  currentValue: number;
}

export interface Dashboard {
  state: {
    cards: Card[];
    watchList: Card['symbol'][];
    isLoad: boolean;
    error: string;
  };

  marketOverview: {
    topPairs: Card[];
    addFavorite: () => void;
  };
  watchList: {
    favoritePairs: Omit<Card, 'volume'>[];
    removePair: void;
  };
  portfolioSummary: {
    portfolioValue: number;
    briefTable: MainAssetsType[];
  };
}
