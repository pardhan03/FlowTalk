import { StyleSheet, Text, View } from "react-native";
import '../../global.css';

export default function Index() {
  return (
    <View className="text-xl font-bold text-blue-500">
      <Text>Edit src/app/index.tsx to edit this screenm.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
