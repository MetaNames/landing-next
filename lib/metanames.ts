import { ConfigProvider, Enviroment, MetaNamesSdk } from "@metanames/sdk";

export const environment = process.env.NEXT_PUBLIC_ENV ?? "test";

export const sdkEnvironment =
  environment === "test" ? Enviroment.testnet : Enviroment.mainnet;

export const MetaNamesConfig = new ConfigProvider(sdkEnvironment).resolve();

export const metaNamesSdk = new MetaNamesSdk(sdkEnvironment);
