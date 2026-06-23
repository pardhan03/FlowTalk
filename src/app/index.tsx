import { useAuth } from '@clerk/expo';
import { Redirect } from 'expo-router';
import { Text, View } from "react-native";

export default function Index() {
  const { isSignedIn } = useAuth()

  if(!isSignedIn) {
    return <Redirect href={"/(auth)"}/>
  }
  return (
    <View className="flex-1 items-center justify-center bg-slate-100">
      <Text className="text-2xl font-bold text-blue-600">
        Edit src/app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}

