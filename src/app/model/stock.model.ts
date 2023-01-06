import { StockQuoteValue } from './stockValue.model';
import { StockQuoteBase } from './stockBase.model';
export interface StockQuote {
    base: StockQuoteBase;
    value: StockQuoteValue;
}
