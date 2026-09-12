import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BbOUFaVl.js
var CURRENCIES = [
	{
		code: "USD",
		name: "US Dollar",
		symbol: "$"
	},
	{
		code: "EUR",
		name: "Euro",
		symbol: "€"
	},
	{
		code: "GBP",
		name: "British Pound",
		symbol: "£"
	},
	{
		code: "JPY",
		name: "Japanese Yen",
		symbol: "¥"
	},
	{
		code: "AUD",
		name: "Australian Dollar",
		symbol: "A$"
	},
	{
		code: "CAD",
		name: "Canadian Dollar",
		symbol: "C$"
	},
	{
		code: "NZD",
		name: "New Zealand Dollar",
		symbol: "NZ$"
	},
	{
		code: "CHF",
		name: "Swiss Franc",
		symbol: "CHF"
	},
	{
		code: "CNY",
		name: "Chinese Yuan",
		symbol: "¥"
	},
	{
		code: "HKD",
		name: "Hong Kong Dollar",
		symbol: "HK$"
	},
	{
		code: "SGD",
		name: "Singapore Dollar",
		symbol: "S$"
	},
	{
		code: "KRW",
		name: "South Korean Won",
		symbol: "₩"
	},
	{
		code: "THB",
		name: "Thai Baht",
		symbol: "฿"
	},
	{
		code: "TWD",
		name: "New Taiwan Dollar",
		symbol: "NT$"
	},
	{
		code: "INR",
		name: "Indian Rupee",
		symbol: "₹"
	},
	{
		code: "IDR",
		name: "Indonesian Rupiah",
		symbol: "Rp"
	},
	{
		code: "MYR",
		name: "Malaysian Ringgit",
		symbol: "RM"
	},
	{
		code: "PHP",
		name: "Philippine Peso",
		symbol: "₱"
	},
	{
		code: "VND",
		name: "Vietnamese Dong",
		symbol: "₫"
	},
	{
		code: "MXN",
		name: "Mexican Peso",
		symbol: "MX$"
	},
	{
		code: "BRL",
		name: "Brazilian Real",
		symbol: "R$"
	},
	{
		code: "ZAR",
		name: "South African Rand",
		symbol: "R"
	},
	{
		code: "AED",
		name: "UAE Dirham",
		symbol: "AED"
	},
	{
		code: "SAR",
		name: "Saudi Riyal",
		symbol: "SAR"
	},
	{
		code: "TRY",
		name: "Turkish Lira",
		symbol: "₺"
	},
	{
		code: "SEK",
		name: "Swedish Krona",
		symbol: "kr"
	},
	{
		code: "NOK",
		name: "Norwegian Krone",
		symbol: "kr"
	},
	{
		code: "DKK",
		name: "Danish Krone",
		symbol: "kr"
	},
	{
		code: "PLN",
		name: "Polish Zloty",
		symbol: "zł"
	},
	{
		code: "CZK",
		name: "Czech Koruna",
		symbol: "Kč"
	},
	{
		code: "HUF",
		name: "Hungarian Forint",
		symbol: "Ft"
	},
	{
		code: "ILS",
		name: "Israeli Shekel",
		symbol: "₪"
	},
	{
		code: "EGP",
		name: "Egyptian Pound",
		symbol: "E£"
	}
];
/** Units of each currency per 1 USD. Used when live rates are unavailable. */
var USD_FALLBACK = {
	USD: 1,
	EUR: .86,
	GBP: .74,
	JPY: 147,
	AUD: 1.52,
	CAD: 1.37,
	NZD: 1.68,
	CHF: .8,
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
	EGP: 49.5
};
function currencyByCode(code) {
	return CURRENCIES.find((c) => c.code === code) ?? {
		code,
		name: code,
		symbol: code
	};
}
function formatMoney(amount, currency, opts) {
	const zeroDecimal = [
		"JPY",
		"KRW",
		"VND",
		"HUF",
		"IDR",
		"CLP"
	].includes(currency);
	try {
		return new Intl.NumberFormat(void 0, {
			style: "currency",
			currency,
			currencyDisplay: opts?.compact ? "narrowSymbol" : "symbol",
			maximumFractionDigits: zeroDecimal ? 0 : 2,
			minimumFractionDigits: zeroDecimal ? 0 : 2
		}).format(amount);
	} catch {
		const symbol = currencyByCode(currency).symbol;
		const digits = zeroDecimal ? 0 : 2;
		return `${symbol}${amount.toFixed(digits)}`;
	}
}
function formatRate(localPerHome, local, home) {
	return `1 ${home} = ${localPerHome >= 100 ? localPerHome.toFixed(2) : localPerHome >= 1 ? localPerHome.toFixed(4) : localPerHome.toFixed(6)} ${local}`;
}
/**
* How many `quote` units per 1 `base` unit, using a table quoted as
* units-per-`tableBase`.
*/
function unitsPer(quote, base, table, tableBase) {
	if (quote === base) return 1;
	const quotePerTable = quote === tableBase ? 1 : table[quote] ?? null;
	const basePerTable = base === tableBase ? 1 : table[base] ?? null;
	if (quotePerTable == null || basePerTable == null || basePerTable === 0) return null;
	return quotePerTable / basePerTable;
}
function localToHome(amountLocal, localPerHome) {
	if (localPerHome == null || localPerHome === 0) return null;
	return amountLocal / localPerHome;
}
function parseMoney(raw) {
	const trimmed = raw.trim().replace(/,/g, "");
	if (trimmed === "") return null;
	const n = Number(trimmed);
	if (!Number.isFinite(n) || n < 0) return null;
	return n;
}
async function fetchRatesFromHome(home) {
	try {
		const url = `https://api.frankfurter.app/latest?from=${encodeURIComponent(home)}`;
		const res = await fetch(url);
		if (!res.ok) return fallbackFromHome(home);
		const data = await res.json();
		if (!data.rates) return fallbackFromHome(home);
		return {
			base: data.base ?? home,
			rates: {
				...data.rates,
				[home]: 1
			}
		};
	} catch {
		return fallbackFromHome(home);
	}
}
function fallbackFromHome(home) {
	const homePerUsd = USD_FALLBACK[home];
	if (homePerUsd == null) return {
		base: "USD",
		rates: { ...USD_FALLBACK }
	};
	const rates = {};
	for (const [code, perUsd] of Object.entries(USD_FALLBACK)) rates[code] = perUsd / homePerUsd;
	return {
		base: home,
		rates
	};
}
var TRIP_ID = "trip-kyoto-spring";
function sampleTrip() {
	return {
		trip: {
			id: TRIP_ID,
			name: "Kyoto in April",
			country: "Japan",
			currency: "JPY",
			startDate: "2026-04-12",
			endDate: "2026-04-20",
			budgetHome: 800,
			customRate: null
		},
		locations: [
			{
				id: "loc-gion",
				tripId: TRIP_ID,
				name: "Gion",
				date: "2026-04-12",
				sortOrder: 0
			},
			{
				id: "loc-fushimi",
				tripId: TRIP_ID,
				name: "Fushimi Inari",
				date: "2026-04-13",
				sortOrder: 1
			},
			{
				id: "loc-arashiyama",
				tripId: TRIP_ID,
				name: "Arashiyama",
				date: "2026-04-14",
				sortOrder: 2
			},
			{
				id: "loc-nishiki",
				tripId: TRIP_ID,
				name: "Nishiki Market",
				date: "2026-04-15",
				sortOrder: 3
			},
			{
				id: "loc-path",
				tripId: TRIP_ID,
				name: "Philosopher's Path",
				date: "2026-04-16",
				sortOrder: 4
			},
			{
				id: "loc-gion-night",
				tripId: TRIP_ID,
				name: "Gion evening",
				date: "2026-04-17",
				sortOrder: 5
			}
		],
		items: [
			item("g1", "loc-gion", "experience", "Evening walk, Gion Shirakawa", "2026-04-12", 0, null),
			item("g2", "loc-gion", "experience", "Minamiza theatre tour", "2026-04-12", 2500, null),
			item("g3", "loc-gion", "experience", "Tea ceremony at a townhouse", "2026-04-12", 4e3, null),
			item("g4", "loc-gion", "food", "Matcha parfait, Saryo Tsujiri", "2026-04-12", 1200, 1180),
			item("g5", "loc-gion", "food", "Kaiseki dinner", "2026-04-12", 18e3, null),
			item("g6", "loc-gion", "buy", "Kyo-yuzen handkerchief", "2026-04-12", 1800, null),
			item("f1", "loc-fushimi", "experience", "Sunrise hike at Fushimi Inari", "2026-04-13", 0, 0),
			item("f2", "loc-fushimi", "food", "Inari sushi on the mountain", "2026-04-13", 800, 750),
			item("f3", "loc-fushimi", "buy", "Fox omamori charm", "2026-04-13", 800, 800),
			item("a1", "loc-arashiyama", "experience", "Bamboo grove at dawn", "2026-04-14", 0, null),
			item("a2", "loc-arashiyama", "experience", "Sagano romantic train", "2026-04-14", 640, null),
			item("a3", "loc-arashiyama", "experience", "Tenryu-ji garden", "2026-04-14", 500, null),
			item("a4", "loc-arashiyama", "food", "Yudofu lunch", "2026-04-14", 2500, null),
			item("a5", "loc-arashiyama", "buy", "Tenugui cloth", "2026-04-14", 1200, null),
			item("n1", "loc-nishiki", "food", "Grilled scallop skewer", "2026-04-15", 600, 600),
			item("n2", "loc-nishiki", "food", "Tsukemono tasting", "2026-04-15", 400, null),
			item("n3", "loc-nishiki", "food", "Wagyu skewer", "2026-04-15", 1500, null),
			item("n4", "loc-nishiki", "buy", "Ceramic tea cup", "2026-04-15", 3500, null),
			item("n5", "loc-nishiki", "buy", "Arita soy sauce bottle", "2026-04-15", 980, null),
			item("p1", "loc-path", "experience", "Walk the canal path", "2026-04-16", 0, null),
			item("p2", "loc-path", "experience", "Honen-in temple", "2026-04-16", 500, null),
			item("p3", "loc-path", "food", "Dango from a path stall", "2026-04-16", 400, null),
			item("p4", "loc-path", "buy", "Handwritten postcard set", "2026-04-16", 650, null),
			item("e1", "loc-gion-night", "experience", "Gion Corner performance", "2026-04-17", 5500, null),
			item("e2", "loc-gion-night", "food", "Warabimochi", "2026-04-17", 700, null),
			item("e3", "loc-gion-night", "buy", "Kyo-komono hairpin", "2026-04-17", 2200, null)
		]
	};
}
function item(id, locationId, kind, title, date, estimatedLocal, actualLocal) {
	return {
		id: `item-${id}`,
		tripId: TRIP_ID,
		locationId,
		kind,
		title,
		date,
		estimatedLocal,
		actualLocal
	};
}
function nid() {
	return crypto.randomUUID();
}
var useAppStore = create()(persist((set, get) => ({
	hasOnboarded: false,
	homeCurrency: "USD",
	ratesBase: "USD",
	rates: { ...USD_FALLBACK },
	ratesFetchedAt: null,
	trips: [],
	locations: [],
	items: [],
	activeTripId: null,
	setHomeCurrency: (code) => {
		set({ homeCurrency: code });
		get().fetchRates();
	},
	fetchRates: async () => {
		const home = get().homeCurrency;
		const result = await fetchRatesFromHome(home);
		if (!result) return;
		set({
			ratesBase: result.base,
			rates: result.rates,
			ratesFetchedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	},
	setActiveTrip: (id) => set({ activeTripId: id }),
	loadSample: () => {
		const { trip, locations, items } = sampleTrip();
		set((s) => ({
			hasOnboarded: true,
			trips: [...s.trips.filter((t) => t.id !== trip.id), trip],
			locations: [...s.locations.filter((l) => l.tripId !== trip.id), ...locations],
			items: [...s.items.filter((i) => i.tripId !== trip.id), ...items],
			activeTripId: trip.id
		}));
	},
	addTrip: (trip) => {
		const id = nid();
		set((s) => ({
			hasOnboarded: true,
			trips: [...s.trips, {
				...trip,
				id
			}],
			activeTripId: id
		}));
		return id;
	},
	updateTrip: (id, patch) => set((s) => ({ trips: s.trips.map((t) => t.id === id ? {
		...t,
		...patch
	} : t) })),
	deleteTrip: (id) => set((s) => {
		const trips = s.trips.filter((t) => t.id !== id);
		return {
			trips,
			locations: s.locations.filter((l) => l.tripId !== id),
			items: s.items.filter((i) => i.tripId !== id),
			activeTripId: s.activeTripId === id ? trips[0]?.id ?? null : s.activeTripId
		};
	}),
	addLocation: (loc) => {
		const id = nid();
		set((s) => {
			const max = s.locations.filter((l) => l.tripId === loc.tripId).reduce((m, l) => Math.max(m, l.sortOrder), -1);
			return { locations: [...s.locations, {
				...loc,
				id,
				sortOrder: max + 1
			}] };
		});
		return id;
	},
	updateLocation: (id, patch) => set((s) => ({
		locations: s.locations.map((l) => l.id === id ? {
			...l,
			...patch
		} : l),
		items: patch.date != null ? s.items.map((i) => i.locationId === id && i.date === s.locations.find((l) => l.id === id)?.date ? {
			...i,
			date: patch.date
		} : i) : s.items
	})),
	deleteLocation: (id) => set((s) => ({
		locations: s.locations.filter((l) => l.id !== id),
		items: s.items.filter((i) => i.locationId !== id)
	})),
	addItem: (item) => {
		const id = nid();
		set((s) => ({ items: [...s.items, {
			...item,
			id
		}] }));
		return id;
	},
	updateItem: (id, patch) => set((s) => ({ items: s.items.map((i) => i.id === id ? {
		...i,
		...patch
	} : i) })),
	deleteItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
	moveItem: (id, locationId, date) => set((s) => ({ items: s.items.map((i) => i.id === id ? {
		...i,
		locationId,
		date: date ?? s.locations.find((l) => l.id === locationId)?.date ?? i.date
	} : i) }))
}), {
	name: "daymark-v1",
	skipHydration: true,
	partialize: (s) => ({
		hasOnboarded: s.hasOnboarded,
		homeCurrency: s.homeCurrency,
		ratesBase: s.ratesBase,
		rates: s.rates,
		ratesFetchedAt: s.ratesFetchedAt,
		trips: s.trips,
		locations: s.locations,
		items: s.items,
		activeTripId: s.activeTripId
	})
}));
function useActiveTrip() {
	return useAppStore((s) => {
		if (!s.activeTripId) return s.trips[0] ?? null;
		return s.trips.find((t) => t.id === s.activeTripId) ?? s.trips[0] ?? null;
	});
}
function useTripItems(tripId) {
	return useAppStore((s) => {
		if (!tripId) return [];
		return s.items.filter((i) => i.tripId === tripId).slice().sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
	});
}
function localPerHomeForTrip(trip, state) {
	if (!trip) return null;
	if (trip.customRate != null && trip.customRate > 0) return trip.customRate;
	return unitsPer(trip.currency, state.homeCurrency, state.rates, state.ratesBase);
}
function sumHome(items, field, localPerHome) {
	return items.reduce((acc, i) => {
		const v = i[field];
		if (v == null) return acc;
		return acc + (localToHome(v, localPerHome) ?? 0);
	}, 0);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { localPerHomeForTrip as a, sumHome as c, useTripItems as d, formatRate as i, useActiveTrip as l, cn as n, localToHome as o, formatMoney as r, parseMoney as s, CURRENCIES as t, useAppStore as u };
