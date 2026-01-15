import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }

  interface Future {
    unstable_middleware: false
  }
}

type Params = {
  "/": {};
  "/blogs/:blogHandle/:articleHandle": {
    "blogHandle": string;
    "articleHandle": string;
  };
  "/api/:version/graphql.json": {
    "version": string;
  };
  "/sitemap/:type/:page.xml": {
    "type": string;
    "page": string;
  };
  "/blogs/:blogHandle": {
    "blogHandle": string;
  };
  "/collections/:handle": {
    "handle": string;
  };
  "/account/authorize": {};
  "/collections": {};
  "/policies/:handle": {
    "handle": string;
  };
  "/products/:handle": {
    "handle": string;
  };
  "/account/logout": {};
  "/collections/all": {};
  "/policies": {};
  "/account/login": {};
  "/discount/:code": {
    "code": string;
  };
  "/sitemap.xml": {};
  "/pages/:handle": {
    "handle": string;
  };
  "/robots.txt": {};
  "/blogs": {};
  "/account": {};
  "/account/orders": {};
  "/account/orders/:id": {
    "id": string;
  };
  "/account/addresses": {};
  "/account/profile": {};
  "/account/*": {
    "*": string;
  };
  "/search": {};
  "/cart": {};
  "/cart/:lines": {
    "lines": string;
  };
  "/*": {
    "*": string;
  };
};