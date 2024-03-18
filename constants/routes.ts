const routes = {
  app: {
    path: process.env.NEXT_PUBLIC_APP_URL! ?? "",
  },
  domains: {
    path: `${process.env.NEXT_PUBLIC_APP_URL! ?? ""}/domain`,
  },
  register: {
    path: `${process.env.NEXT_PUBLIC_APP_URL! ?? ""}/register`,
  },
};

export default routes;
