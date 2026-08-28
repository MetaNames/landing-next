import routes from "@/constants/routes";
import { ConfigProvider, Enviroment, MetaNamesSdk } from "@metanames/sdk";

export interface DomainProjection {
  name: string;
  createdAt: string;
}

export interface DomainStats {
  domainCount: number;
  ownerCount: number;
  recentDomains: DomainProjection[];
}

export const environment = process.env.NEXT_PUBLIC_ENV ?? "test";

export const sdkEnvironment =
  environment === "test" ? Enviroment.testnet : Enviroment.mainnet;

export const MetaNamesConfig = new ConfigProvider(sdkEnvironment).resolve();

export const metaNamesSdk = new MetaNamesSdk(sdkEnvironment);

/**
 * BYOC symbols differ per environment, so the coin used to quote registration
 * fees comes from the SDK's own config. Stablecoins come first — a price in
 * USDC reads as a price, one in ETH reads as a puzzle.
 *
 * Both environments' coins are listed because NEXT_PUBLIC_ENV and
 * NEXT_PUBLIC_APP_URL are set independently: a landing pointed at the mainnet
 * app while still flagged as `test` would otherwise quote in TEST_COIN and get
 * "Unsupported coin symbol" back. The fee route walks this list until the app
 * accepts one.
 */
const COIN_PREFERENCE = ["POLYGON_USDC", "ETHEREUM_USDT", "TEST_COIN"];

const coinsFor = (env: Enviroment) =>
  (new ConfigProvider(env).resolve().byoc ?? []).map((coin) => coin.symbol);

const currentCoins = coinsFor(sdkEnvironment);
const otherCoins = coinsFor(
  sdkEnvironment === Enviroment.testnet
    ? Enviroment.mainnet
    : Enviroment.testnet,
);

const byPreference = (coins: string[]) =>
  [...coins].sort((a, b) => {
    const rank = (symbol: string) => {
      const index = COIN_PREFERENCE.indexOf(symbol);
      return index === -1 ? COIN_PREFERENCE.length : index;
    };
    return rank(a) - rank(b);
  });

export const feeCoinCandidates = [
  ...byPreference(currentCoins),
  ...byPreference(otherCoins),
];

export const preferredCoin = feeCoinCandidates[0];

export const getMetaNamesStats = async () => {
  return fetch(`${routes.app.path}/api/domains/stats`, {
    next: { revalidate: 60 },
  }).then((res) => res.json()) as Promise<DomainStats>;
};
