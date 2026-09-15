---
title: "Use WatermelonDB with Expo 56+"
teaser: "The outdated WatermelonDB and Expo docs won't tell you how to make it work in Expo 56. I will."
author: Nicholas C. Zakas
image: watermelon-expo.png
categories:
  - Programming
tags:
  - WatermelonDB
  - Expo
  - Mobile
---

[WatermelonDB](https://watermelondb.dev/docs) is a popular local-first database solution for building mobile apps with React Native and Expo. It allows you to sync your remote database with an on-device SQLite database without any additional infrastructure. Unfortunately, the documentation hasn't been updated in years and there's very little information on how to use it with Expo 56+. After spending a couple of days getting WatermelonDB to work in my Expo app, here's how you can too.

## Step 1: Configure syntax with Babel

The biggest challenge with WatermelonDB is that it uses the experimental [decorators](https://github.com/tc39/proposal-decorators) syntax and Expo doesn't configure Babel to support this syntax by default. To fix this, install the following Babel plugins:

```shell
npm install -D @babel/plugin-proposal-decorators \
  @babel/plugin-transform-class-properties \
  @babel/plugin-transform-private-methods \
  @babel/plugin-transform-private-property-in-object \
  @babel/plugin-transform-typescript
```

Then update your `babel.config.js` file like this:


```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          decorators: false,
        },
      ],
    ],
    plugins: [
      // 1. Strip TypeScript types & declarations first
      ['@babel/plugin-transform-typescript', { isTSX: true, allExtensions: true }],

      // 2. Handle WatermelonDB legacy decorators
      ['@babel/plugin-proposal-decorators', { legacy: true }],

      // 3. Transform modern class features using matching loose configurations
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ],
  };
};
```

Next, update your `tsconfig.json` file so that it allows decorators:


```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

At this point, the Expo app can use decorators the way WatermelonDB expects. The next step is to help Expo find WatermelonDB's resources.

## Step 2: Include custom C++ bindings

WatermelonDB relies on the `simdjson` C++ library rather than a React Native package, so by default Expo doesn't know anything about it so CocoaPods won't compile it into the application. Further, Gradle throws an error if it finds multiple versions of the same library. To address both issues, you need to set custom build properties on Expo. To do so, install the `expo-build-properties` package:

```shell
npx expo install expo-build-properties
```

Then update the `plugins` array in your `app.json` accordingly:

```json
{
  "expo": {
    "name": "YourAppName",
    "slug": "YourAppSlug",
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": {
            "extraPods": [
              {
                "name": "simdjson",
                "configurations": [
                  "Debug",
                  "Release"
                ],
                "path": "../node_modules/@nozbe/simdjson",
                "modular_headers": true
              }
            ]
          },
          "android": {
            "buildArchs": [
              "armeabi-v7a",
              "arm64-v8a"
            ],
            "packagingOptions": {
              "pickFirst": [
                "**/libc++_shared.so"
              ]
            }
          }
        }
      ]
    ]
  }
}
```

**Important:** The `path` in `extraPods` must be the actual path to the module. If you're running inside a monorepo or anywhere where npm packages are installed in a different directory, adjust the path accordingly.

## Step 3: Run a prebuild to get everything ready

The last step before running in an emulator is to rebuild everything from scratch:

```shell
npx expo prebuild --clean
```

After this, you can test the newly compiled application:

```shell
npx expo run:android
# or
npx expo run:ios
```
