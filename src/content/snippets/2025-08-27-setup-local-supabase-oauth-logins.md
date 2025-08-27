---
title: "Set up local Supabase OAuth logins"
teaser: "While it's easy to set up Supabase OAuth logins in the cloud product, setting it up for a local development environment is a bit tricky."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - JavaScript
  - Supabase
  - OAuth
  - Login
---

One of the benefits of [Supabase](https://supabase.com) is its integrated login system that supports many OAuth providers, including Google and GitHub. While there is plenty of documentation explaining how to set up OAuth providers in hosted Supabase, the [instructions for local Supabase](https://supabase.com/docs/guides/local-development/overview#use-auth-locally) are fairly terse and are missing several steps. 

First, create a callback endpoint in your application, for example, `/auth/callback`. This is the callback that will receive the OAuth information from Supabase. Specifically, you should receive either a `code` query string parameter that will allow the user to login or an `error` parameter indicating there was an error logging in. Here's an example written using [Astro](https://astro.build):

```ts
// Astro example
import { createServerClient, parseCookieHeader } from "@supabase/ssr";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

export const GET: APIRoute = async ({ url, request, cookies, redirect }) => {

    // if there's no code then redirect to login
    const code = url.searchParams.get("code");
    if (!code) {
        redirect("/login?error=no-code");
    }
    
    // there is a code, try to log in
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return parseCookieHeader(request.headers.get("cookie") || "");
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) =>
                    cookies.set(name, value, options)
                );
            },
        },
    });
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error || !data?.session) {
        return redirect("/login?error=unauthorized");
    }

    // get and store tokens
    const { access_token, refresh_token } = data.session;

    // store tokens as necessary
}
```

With the callback set up, you now need to let Supabase know how to call it. In general, there are three steps to the OAuth login process for Supabase:

1. Your application links off to the OAuth provider's authentication service.
2. The OAuth provider redirects to the Supabase auth service.
3. Supabase redirects to your application callback.

To ensure that happens locally, you need to edit the `config.toml` file. First, locate the `[auth]` section at the top and make sure the value for `site_url` is your local application URL and `additional_redirect_urls` contains the full URL for the callback endpoint. Here's an example:

```toml
[auth]
enabled = true
# The base URL of your website. Used as an allow-list for redirects and for constructing URLs used
# in emails.
site_url = "http://localhost:4321"
# A list of *exact* URLs that auth providers are permitted to redirect to post authentication.
additional_redirect_urls = ["http://localhost:4321/auth/callback"]
```

(Without specifying `additional_redirect_urls`, you'll always have to redirect back to the application homepage.)

Next, create an entry for your OAuth provider including the client ID, client secret, and redirect URI. For GitHub, it would look like this:

```toml
[auth.external.github]
enabled = true
client_id = "env(GITHUB_CLIENT_ID)"
secret = "env(GITHUB_CLIENT_SECRET)"
redirect_uri = "http://localhost:54321/auth/v1/callback"
```

The `redirect_uri` here needs to be the local Supabase URL for OAuth callbacks. The default port is 54321, so double-check the port.

After editing `config.toml`, you need to restart Supabase to reload the configuration:

```shell
npx supabase stop
npx supabase start
```

Next, you need to generate the OAuth URL to use in your application. Here's an example generating a URL to login with GitHub:

```ts
import { createServerClient, parseCookieHeader } from "@supabase/ssr";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

export const GET: APIRoute = async ({ url, request, cookies, redirect }) => {

    // if there's no code then redirect to login
    const code = url.searchParams.get("code");
    if (!code) {
        redirect("/login?error=no-code");
    }
    
    // there is a code, try to log in
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return parseCookieHeader(request.headers.get("cookie") || "");
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) =>
                    cookies.set(name, value, options)
                );
            },
        },
    });
        
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            // must be listed as additional_redirect_urls
            redirectTo: `http://localhost:4321/auth/callback`
        }
    });

    if (error || !data?.url) {
        // handle error
    }

    redirect(data.url);
}
```

Everything is now wired up for the correct end-to-end flow.
