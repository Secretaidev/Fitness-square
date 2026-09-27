# Fitness Square

Fitness Square is an Android-ready fitness companion built with Expo, React Native, and TypeScript.

## MVP features

- Four-tab experience: Home, Workouts, Progress, and Profile
- Four guided bodyweight workout plans with exercise lists
- Start, pause, resume, and finish a workout timer
- Weekly workout goal and a seven-day minutes chart
- Workout history and profile saved on-device with AsyncStorage
- No account or internet connection is required for core tracking

## Run locally

```bash
pnpm install
pnpm dev
```

`pnpm dev` starts the local API and web preview. To open the native Android app in an emulator, use:

```bash
pnpm android
```

To start Expo directly and scan its QR code with Expo Go:

```bash
pnpm exec expo start
```

## Build an Android APK

A native Android build can be produced with Expo Application Services (EAS):

```bash
npx eas-cli login
npx eas-cli build:configure
npx eas-cli build --platform android --profile preview
```

The `preview` profile produces an installable APK. The `production` profile is configured for an Android App Bundle (AAB) for Play Store distribution. You will need an Expo account and Android signing credentials for EAS builds.

## Checks

```bash
pnpm test
pnpm check
pnpm lint
pnpm exec expo export --platform android
```

## Data and scope

Workout history and the display name/weekly goal stay local to the device. There is no cloud sync, health-platform integration, calorie estimation, or sign-in in this MVP. The workout suggestions are general fitness routines; adjust movements to your ability and stop if you feel pain or unwell.
