---
title: "Proxying fetch requests in server-side JavaScript"
teaser: "Learn how to proxy fetch() requests in Node.js, Deno, Bun, and Cloudflare Workers to better monitor and control your server-side traffic."
author: Nicholas C. Zakas
image: /images/posts/2026/proxy-request.png
updated: 2026-03-04
categories:
  - Programming
tags:
  - Fetch
  - Node.js
  - Cloudflare
  - Proxy
---

If you retrieve content from the internet, you'll eventually need to proxy requests. Proxying is useful for logging traffic, modifying headers, altering content, improving performance through caching, or hiding an originating IP address. Most server-side JavaScript runtimes allow you to proxy requests using `fetch()`.

The Fetch standard[^1] doesn't specify request proxying because it's a browser-focused API. Consequently, server-side runtimes implement proxying differently.

## Node.js

Node.js natively supports proxying `fetch()` requests through environment variables as of Node.js v22.21.0 and v24.5.0[^2]. You can set the `HTTP_PROXY` and `HTTPS_PROXY` environment variables to specify the proxy server for HTTP and HTTPS requests, respectively:

```shell
# Enable Node.js to use environment variables for proxying
export NODE_USE_ENV_PROXY=1

export HTTP_PROXY=http://username:password@proxy-server.com:8080
export HTTPS_PROXY=https://username:password@proxy-server.com:8080
```

The `NODE_USE_ENV_PROXY` variable is required to enable this behavior, as it is disabled by default to avoid unintended proxying. You can also use the `--use-env-proxy` flag when running your Node.js application to enable this feature without setting the environment variable:

```shell
node --use-env-proxy your-app.js
```

You can also proxy specific requests programmatically. While the Node.js `fetch()` API doesn't natively support proxying, it's built on top of the `undici` package[^3], which does. Since Node.js doesn't expose the `ProxyAgent` class[^4] directly, you'll first need to install `undici`:

```shell
npm i undici
```

To use a proxy, create a `ProxyAgent` instance and pass it as the `dispatcher` option:

```js
import { ProxyAgent } from 'undici';

const agent = new ProxyAgent('http://username:password@proxy-server.com:8080');

const response = await fetch('https://api.example.com', {
    dispatcher: agent
});

const body = await response.json();
```

## Deno

Deno's `fetch()` uses the `client` property in the options object to specify a proxy client:

```js
const client = Deno.createHttpClient({
  proxy: { url: "http://username:password@proxy-server.com:8080" },
});

const response = await fetch("https://api.example.com", { client });
const data = await response.json();

client.close(); // Remember to close the client when done
```

Despite its name, `Deno.createHttpClient()` also supports HTTPS proxies:

```js
const client = Deno.createHttpClient({
  proxy: { url: "https://username:password@proxy-server.com:8080" },
});

const response = await fetch("https://api.example.com", { client });
const data = await response.json();

client.close(); // Remember to close the client when done
```

## Bun

Bun provides native support for `fetch()` proxying via the `proxy` property:

```js
const response = await fetch("https://api.example.com", {
  proxy: "http://username:password@proxy-server.com:8080"
});

const body = await response.json();
```

## Cloudflare Workers

The Cloudflare Workers runtime does not natively support proxying `fetch()` requests through environment variables or programmatic options. However, you can work around this by using a Node.js Docker container to handle the requests.

The `@humanwhocodes/proxy-fetch-server`[^5] package is a small utility I created to simplify this. Here’s how to run it in a container:

```dockerfile
FROM node:22-slim

WORKDIR /app
RUN npm install -g @humanwhocodes/proxy-fetch-server@2

EXPOSE 8080
ENV PORT=8080

CMD ["npx", "@humanwhocodes/proxy-fetch-server"]
```

Next, define a container class:

```js
import { Container } from "@cloudflare/containers";

export class ProxyFetchContainer extends Container {
    defaultPort = 8080;
}
```

Update your `wrangler.jsonc` file to include the binding:

```jsonc
{
    "name": "proxy-fetcher",

    "containers": [
        {
            "class_name": "ProxyFetchContainer",
            "image": "./Dockerfile"
        }
    ],
    "durable_objects": {
        "bindings": [
            {
                "name": "PROXY_FETCH_CONTAINER",
                "class_name": "ProxyFetchContainer"
            }
        ]
    },
    "migrations": [
        {
            "tag": "v1",
            "new_sqlite_classes": [
                "ProxyFetchContainer"
            ]
        }
    ],
}
```

Finally, access the proxy container in your code:

```js
// get and start container
const container = env.PROXY_FETCH_CONTAINER.getByName("proxy-fetch-server");

await container.startAndWaitForPorts({
    startOptions: {
        envVars: {
            FETCH_PROXY: "http://username:password@proxy-server.com:8080"
        }
    }
});

// Make request to the container
const containerResponse = await container.fetch(
    new Request("http://container/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    })
);
```

While this requires more setup than other runtimes, it's a reliable solution for this use case.

## Conclusion

Proxying `fetch()` requests is a common requirement in server-side development, whether for security, monitoring, or performance. While runtimes like Deno and Bun offer straightforward programmatic APIs, others like Node.js and Cloudflare Workers require a bit more legwork. Regardless of your choice, understanding these patterns ensures your applications can communicate reliably with the outside world. Give these methods a try in your next project; you'll find that handling proxies is just another essential tool in your server-side JavaScript toolkit.

**Update(2026-03-04):** Added information about Node.js support for proxy-related environment variables.

[^1]: [Fetch Standard](https://fetch.spec.whatwg.org/)
[^2]: [Node.js Enterprise Network Configuration](https://nodejs.org/en/learn/http/enterprise-network-configuration)
[^3]: [Undici](https://undici.nodejs.org)
[^4]: [Issue #43187: Expose Undici ProxyAgent](https://github.com/nodejs/node/issues/43187)
[^5]: [`@humanwhocodes/proxy-fetch-server`](https://npmjs.com/package/@humanwhocodes/proxy-fetch-server)
