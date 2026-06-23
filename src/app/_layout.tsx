import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Stack } from "expo-router";
import '../../global.css';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env file.'
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Stack screenOptions={{
        headerShown: false
      }}>
        {/* <Stack.Screen name="index" options={{ title: "Home" }} /> */}
        <Stack.Screen name="(auth)"/>
        <Stack.Screen name="(tabs)"/>
      </Stack>
    </ClerkProvider>
  );
}
