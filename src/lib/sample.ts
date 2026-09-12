import type { Location, Trip, TripItem } from "@/lib/types";

const TRIP_ID = "trip-kyoto-spring";

export function sampleTrip(): {
  trip: Trip;
  locations: Location[];
  items: TripItem[];
} {
  const trip: Trip = {
    id: TRIP_ID,
    name: "Kyoto in April",
    country: "Japan",
    currency: "JPY",
    startDate: "2026-04-12",
    endDate: "2026-04-20",
    budgetHome: 800,
    customRate: null,
  };

  const locations: Location[] = [
    { id: "loc-gion", tripId: TRIP_ID, name: "Gion", date: "2026-04-12", sortOrder: 0 },
    {
      id: "loc-fushimi",
      tripId: TRIP_ID,
      name: "Fushimi Inari",
      date: "2026-04-13",
      sortOrder: 1,
    },
    {
      id: "loc-arashiyama",
      tripId: TRIP_ID,
      name: "Arashiyama",
      date: "2026-04-14",
      sortOrder: 2,
    },
    {
      id: "loc-nishiki",
      tripId: TRIP_ID,
      name: "Nishiki Market",
      date: "2026-04-15",
      sortOrder: 3,
    },
    {
      id: "loc-path",
      tripId: TRIP_ID,
      name: "Philosopher's Path",
      date: "2026-04-16",
      sortOrder: 4,
    },
    {
      id: "loc-gion-night",
      tripId: TRIP_ID,
      name: "Gion evening",
      date: "2026-04-17",
      sortOrder: 5,
    },
  ];

  const items: TripItem[] = [
    item("g1", "loc-gion", "experience", "Evening walk, Gion Shirakawa", "2026-04-12", 0, null),
    item("g2", "loc-gion", "experience", "Minamiza theatre tour", "2026-04-12", 2500, null),
    item("g3", "loc-gion", "experience", "Tea ceremony at a townhouse", "2026-04-12", 4000, null),
    item("g4", "loc-gion", "food", "Matcha parfait, Saryo Tsujiri", "2026-04-12", 1200, 1180),
    item("g5", "loc-gion", "food", "Kaiseki dinner", "2026-04-12", 18000, null),
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
    item("e3", "loc-gion-night", "buy", "Kyo-komono hairpin", "2026-04-17", 2200, null),
  ];

  return { trip, locations, items };
}

function item(
  id: string,
  locationId: string,
  kind: TripItem["kind"],
  title: string,
  date: string,
  estimatedLocal: number | null,
  actualLocal: number | null,
): TripItem {
  return {
    id: `item-${id}`,
    tripId: TRIP_ID,
    locationId,
    kind,
    title,
    date,
    estimatedLocal,
    actualLocal,
  };
}
