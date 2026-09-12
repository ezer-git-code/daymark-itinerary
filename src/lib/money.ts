export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

export const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "AED", name: "UAE Dirham", symbol: "AED" },
  { code: "SAR", name: "Saudi Riyal", symbol: "SAR" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪" },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£" },
];

/** Units of each currency per 1 USD. Used when live rates are unavailable. */
export const USD_FALLBACK: Record<string, number> = {
  USD: 1,
  EUR: 0.86,
  GBP: 0.74,
  JPY: 147,
  AUD: 1.52,
  CAD: 1.37,
  NZD: 1.68,
  CHF: 0.8,
  CNY: 7.12,
  HKD: 7.78,
  SGD: 1.28,
  KRW: 1390,
  THB: 32.4,
  TWD: 31.2,
  INR: 83.5,
  IDR: 16200,
  MYR: 4.22,
  PHP: 56.2,
  VND: 25400,
  MXN: 18.4,
  BRL: 5.45,
  ZAR: 17.8,
  AED: 3.67,
  SAR: 3.75,
  TRY: 41.2,
  SEK: 9.4,
  NOK: 10.1,
  DKK: 6.42,
  PLN: 3.68,
  CZK: 21.4,
  HUF: 345,
  ILS: 3.28,
  EGP: 49.5,
};

export function currencyByCode(code: string): Currency {
  return (
    CURRENCIES.find((c) => c.code === code) ?? {
      code,
      name: code,
      symbol: code,
    }
  );
}

export function formatMoney(
  amount: number,
  currency: string,
  opts?: { compact?: boolean },
): string {
  const zeroDecimal = ["JPY", "KRW", "VND", "HUF", "IDR", "CLP"].includes(
    currency,
  );
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      currencyDisplay: opts?.compact ? "narrowSymbol" : "symbol",
      maximumFractionDigits: zeroDecimal ? 0 : 2,
      minimumFractionDigits: zeroDecimal ? 0 : 2,
    }).format(amount);
  } catch {
    const symbol = currencyByCode(currency).symbol;
    const digits = zeroDecimal ? 0 : 2;
    return `${symbol}${amount.toFixed(digits)}`;
  }
}

export function formatRate(localPerHome: number, local: string, home: string) {
  const rounded =
    localPerHome >= 100
      ? localPerHome.toFixed(2)
      : localPerHome >= 1
        ? localPerHome.toFixed(4)
        : localPerHome.toFixed(6);
  return `1 ${home} = ${rounded} ${local}`;
}

/**
 * How many `quote` units per 1 `base` unit, using a table quoted as
 * units-per-`tableBase`.
 */
export function unitsPer(
  quote: string,
  base: string,
  table: Record<string, number>,
  tableBase: string,
): number | null {
  if (quote === base) return 1;
  const quotePerTable =
    quote === tableBase ? 1 : (table[quote] ?? null);
  const basePerTable = base === tableBase ? 1 : (table[base] ?? null);
  if (quotePerTable == null || basePerTable == null || basePerTable === 0) {
    return null;
  }
  return quotePerTable / basePerTable;
}

export function localToHome(
  amountLocal: number,
  localPerHome: number | null,
): number | null {
  if (localPerHome == null || localPerHome === 0) return null;
  return amountLocal / localPerHome;
}

export function parseMoney(raw: string): number | null {
  const trimmed = raw.trim().replace(/,/g, "");
  if (trimmed === "") return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

export async function fetchRatesFromHome(
  home: string,
): Promise<{ base: string; rates: Record<string, number> } | null> {
  return fallbackFromHome(home);
}

function fallbackFromHome(home: string): {
  base: string;
  rates: Record<string, number>;
} | null {
  const homePerUsd = USD_FALLBACK[home];
  if (homePerUsd == null) return { base: "USD", rates: { ...USD_FALLBACK } };
  const rates: Record<string, number> = {};
  for (const [code, perUsd] of Object.entries(USD_FALLBACK)) {
    rates[code] = perUsd / homePerUsd;
  }
  return { base: home, rates };
}
