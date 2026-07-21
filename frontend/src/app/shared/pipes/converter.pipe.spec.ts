import { ConverterPipe } from './converter.pipe';

describe('ConverterPipe', () => {
  let pipe: ConverterPipe;
  beforeEach(() => {
    pipe = new ConverterPipe();
  });
  it(' should be 8 digits return if symbol is BTC end with', () => {
    const params = {
      value: 0.00000001,
      symbol: 'USDTBTC',
    };

    const result = pipe.transform(params.value, params.symbol);

    expect(result).toContain('0.00000001');
  });
  it(' should be 2 digits return if symbol is USDT end with', () => {
    const params = {
      value: 0.00000001,
      symbol: 'BTCUSDT',
    };

    const result = pipe.transform(params.value, params.symbol);

    expect(result).toContain('0.00');
  });
  it(' should be wrong symbol', () => {
    const params = {
      value: 100,
      symbol: 'UNKNOWN',
    };

    const result = pipe.transform(params.value, params.symbol);

    expect(result).toBe(100);
  });
});
