---
title: "Run multiple Cloudflare workers locally"
teaser: "Wrangler is made primarily to run one worker at a time. You can also use it to run all of your workers at the same time."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - JavaScript
  - Cloudflare
  - Edge Workers
updated: 2025-09-08
---

When you're testing an application locally, you ideally want an environment that
mimics production as much as possible. Especially when you're using multiple
[Cloudflare workers](https://workers.cloudflare.com/), you'll want to make sure
you can run them together for end-to-end testing during development. Without
this ability, you either need to run everything in the cloud (problematic when
your internet connection is down or slow) and test each worker individually.

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) is capable of
running multiple workers at the same time, like this:

```shell
npx wrangler dev -c worker1/wrangler.jsonc -c worker2/wrangler.jsonc
```

This is important because workers run together in one dev session share
resources, including queues, and can communicate with one another. That's key
for creating a production-like environment locally.

However, Wrangler only starts _one server_ for all workers and there's no way to
route between them. After some digging, I found this note in the
[docs](https://developers.cloudflare.com/workers/wrangler/commands/#dev):

> You can provide multiple configuration files to run multiple Workers in one
> dev session like this:
> `wrangler dev -c ./wrangler.toml -c ../other-worker/wrangler.toml`. The first
> config will be treated as the _primary Worker_, which will be exposed over
> HTTP. The remaining config files will only be accessible via a service binding
> from the primary Worker.

That means we need the first worker listed to both list other workers as service
bindings and route requests to the correct worker.

## The `http` worker

You can create a simple worker, that I name `http`, to handle this for you. The
first step is to list your other services in the `wrangler.jsonc` file:

```jsonc
{
    "$schema": "node_modules/wrangler/config-schema.json",
    "name": "http",
    "main": "src/index.ts",
    "compatibility_date": "2025-08-22",
    "services": [
        {
            "binding": "worker1",
            "service": "worker1"
        },
        {
            "binding": "worker2",
            "service": "worker2"
        }
    ]
}
```

Next, you'll use [Hono](https://hono.dev) to route requests based on the request
path. To make things easy, the path will be the worker binding name, which means
you'll only need to update the `wrangler.jsonc` file when you want to add or
remove workers. Here's the code:

```typescript
import { Hono } from "hono";

interface Bindings {
    [binding: string]: Fetcher;
}

const app = new Hono<{ Bindings: Bindings }>();

app.all("/:worker/*", (c) => {
    const worker = c.req.param("worker");
    const binding = c.env[worker];

    if (!binding || typeof binding.fetch !== "function") {
        return c.text(`Worker binding '${worker}' not found`, 404);
    }

    // Rewrite the URL to remove the worker prefix
    const url = URL.parse(c.req.url) as URL;
    url.pathname = url.pathname.slice(`/${worker}`.length) || "/";

    // create a new request object to avoid issues with reused requests
    const request = new Request(url, c.req.raw.clone());

    return binding.fetch(request);
});

export default app;
```

Note that you need to pass `c.req.raw` to the worker rather than `c.req`, which
is a Hono-specific object. In this way, all of the request information is passed
directly to the worker. (You can, optionally, modify it as necessary.)

Now, make sure that the `http` worker is the first one passed to Wrangler:

```shell
npx wrangler dev -c http/wrangler.jsonc -c worker1/wrangler.jsonc -c worker2/wrangler.jsonc
```

Then you can test out your workers locally:

```shell
# call worker1
curl -i -X POST http://localhost:8787/worker1 \
    -H "Content-Type: application/json" \
    -d '{"message":"Hello worker1!"}'

# call worker2
curl -i -X POST http://localhost:8787/worker2 \
    -H "Content-Type: application/json" \
    -d '{"message":"Hello worker2!"}'
```

Enjoy your local multi-worker development environment!

**Updated (2025-08-25):** Cleaned up TypeScript code to match best practices for
Hono.

**Updated (2025-09-08):** Enhanced the Hono app so that it handles URL rewriting
and all HTTP verbs.
