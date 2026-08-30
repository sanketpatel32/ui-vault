import { Ticker, TickerIcon, TickerPrice, TickerPriceChange, TickerSymbol } from "./index";

// Demo adapted from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/ticker) — the logo service URL from
// the docs needs an API token, so the icon falls back to the symbol badge.

const tickers = [
  { symbol: "GOOG", price: 175.41, change: 2.13 },
  { symbol: "MSFT", price: 428.15, change: -1.05 },
  { symbol: "AMZN", price: 186.44, change: 0.62 },
  { symbol: "NVDA", price: 121.79, change: 4.31 },
];

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-5 p-6">
        {tickers.map((t) => (
          <Ticker key={t.symbol}>
            <TickerIcon symbol={t.symbol} />
            <TickerSymbol symbol={t.symbol} />
            <TickerPrice price={t.price} />
            <TickerPriceChange change={t.change} />
          </Ticker>
        ))}
        <p className="text-muted-fg text-xs">
          Inline usage:{" "}
          <Ticker className="rounded-full bg-muted p-1 pr-2 text-xs">
            <TickerIcon className="size-5" symbol="AAPL" />
            <TickerSymbol symbol="AAPL" />
            <TickerPrice price={222.5} />
            <TickerPriceChange change={0.87} />
          </Ticker>{" "}
          reported in today's session.
        </p>
      </div>
    </div>
  );
}
