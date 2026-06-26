---
title: "Testing Android apps with Expo on physical devices"
teaser: "Learn how to connect your Android device via USB to your local Expo development server for reliable, production-like testing of your React Native apps."
author: Nicholas C. Zakas
image: /images/posts/2026/android-expo-device.png
categories:
  - Programming
tags:
  - Android
  - Expo
  - React Native

---

If you're a web developer and you want to create mobile apps for iOS and Android, then you'll probably use Expo[^1]. Expo allows you to write React Native[^2] code and has a full development environment for both iOS and Android, as well as generating a web preview of the same application. Your development build integrates directly with iOS and Android emulators running on your local machine, making it easy to debug and rapidly make changes. However, there's no replacement for testing on a physical device. For iOS, this is fairly straightforward so long as you're on a Mac; for Android, it can be a bit trickier.

After trying out several approaches, I finally landed on attaching an Android device via USB to the same Windows machine running my Expo development server. This approach gives the device access to `localhost`, so I can run the API backend locally and have everything work. As a bonus, it even works when the dev server is running in WSL.

## Step 1: Download and install Android Studio

To get started, follow the instructions to set up Android Studio[^3]. Regardless of whether you'll use Expo's cloud service or local builds, you'll still need this installed to get access to `adb`, the Android debug bridge.

## Step 2: Set up your device for USB debugging

You'll need to enable debugging via the USB connection for the rest of the steps to work:

1. Open your Android device and go to **Settings > About phone > Software information**.
2. Tap **Build number** seven times.
3. Go to **Settings > Developer options**.
4. Enable **USB Debugging**.

Connect your Android device to your computer with a USB cable. If everything is set up correctly, you should see your device when you run `adb devices`. It looks something like this:

```shell
$ adb devices
List of devices attached
RAB34TMQA     device
```

## Step 3: Generate and load the build

Next, you'll need the `expo-dev-client` package to connect to Expo-generated developer builds:

```shell
npx expo install expo-dev-client
```

If you're building locally, you can run:

```shell
npx expo run:android
```

If you're building using Expo Application Services, you can run:

```shell
eas build --platform android --profile development
```

In either case, scan the QR code to download the APK and install it on your device.

## Step 4: Start your dev server

For active development, start your dev server locally with the `--localhost` flag:

```shell
npx expo start --localhost
```

The `--localhost` flag tells the dev server to bind directly to `localhost` and forego any IP address binding.

Open the development build on your device and you should see your dev server listed under "Development servers". If not, continue on.

## Step 5: Set up reverse proxies

If you're still not seeing your dev server in the app, set up a reverse proxy using `adb`:

```shell
adb reverse tcp:8081 tcp:8081
```

You should see your dev server now. If not, try manually entering `exp://localhost:8081`.

**Note:** If your dev server needs access to other services running on `localhost`, be sure to add reverse proxies for those, too. For example, if you're running your API server on port 8080, run the following:

```shell
adb reverse tcp:8080 tcp:8080
```

## Conclusion

Testing your Expo app on a physical Android device doesn't have to be complicated. By connecting your device via USB and using `adb` reverse proxies, you gain a fast, reliable development workflow that mirrors production conditions. This approach is especially powerful when combined with a local API backend, letting you develop and test end-to-end features without any external dependencies. Whether you're using local builds or Expo Application Services, this setup gives you the confidence to catch bugs and refine your app's behavior before it reaches users. As a bonus, it also works in complex development setups such as working in WSL on Windows.

[^1]: [Expo](https://expo.dev)
[^2]: [React Native](https://reactnative.dev/)
[^3]: [Android Studio Setup Guide](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local#set-up-android-studio)
