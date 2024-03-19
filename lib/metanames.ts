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

export const getMetaNamesStats = async () => {
  return fetch(`${routes.app.path}/api/domains/stats`, { next: { revalidate: 60 } }).then((res) =>
    res.json()
  ) as Promise<DomainStats>;
};
