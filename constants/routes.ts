import { config } from "@/lib/config";

const routes = {
  app: {
    path: config.appUrl,
  },
  domains: {
    path: `${config.appUrl}/domain`,
  },
  register: {
    path: `${config.appUrl}/register`,
  },
};

export default routes;
