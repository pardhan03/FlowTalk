import { COLORS } from "@/lib/theme";
import { useAuth, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Alert, Pressable, StyleSheet, Text, View, useWindowDimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MENU_ITEMS = [
  { icon: "notifications", label: "Notifications", color: COLORS.primary },
  { icon: "bookmark", label: "Saved Resources", color: "#FF6B6B" },
  { icon: "time", label: "Study History", color: "#10B981" },
  { icon: "settings", label: "Settings", color: "#64748B" },
];

const ProfileScreen = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const { width } = useWindowDimensions();

  const isLargeScreen = width >= 768;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        {/* Content container for desktop/tablet constraint */}
        <View
          className="flex-1 w-full"
          style={{
            maxWidth: isLargeScreen ? 600 : undefined,
            alignSelf: isLargeScreen ? 'center' : undefined,
          }}
        >
          {/* HEADER */}
          <View className="px-5 pt-4 pb-2">
            <Text className="text-[28px] font-extrabold text-foreground tracking-tight">Profile</Text>
          </View>

          {/* PROFILE CARD */}
          <View className="items-center py-6 mx-5 my-2 rounded-3xl bg-surface border border-border-light shadow-sm shadow-slate-900/5 relative overflow-hidden">
            {/* Top gradient blur block for style */}
            <View className="absolute top-0 left-0 right-0 h-20 bg-primary/5 border-b border-primary/5" />
            
            <View className="mb-4 relative mt-4">
              <Image
                source={user?.imageUrl}
                style={{ width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: COLORS.surface }}
                contentFit="contain"
              />
              <View className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-accent-secondary border-[3px] border-surface" />
            </View>

            <Text className="text-xl font-bold text-foreground mt-1">
              {user?.fullName || user?.username || "Student"}
            </Text>

            <Text className="text-sm text-foreground-muted mt-1">
              {user?.primaryEmailAddress?.emailAddress}
            </Text>

            {/* Streak Chip */}
            <View className="mt-4 flex-row items-center gap-1.5 rounded-full bg-amber-500/10 px-4 py-2 border border-amber-500/10">
              <Ionicons name="flame" size={16} color="#F59E0B" />
              <Text className="text-xs font-bold text-amber-600">7 day study streak</Text>
            </View>
          </View>

          {/* Stats Section */}
          <View className="flex-row gap-3 px-5 mt-4 mb-5">
            <View className="flex-1 items-center rounded-2xl border border-border-light bg-surface px-4 py-4 shadow-sm shadow-slate-900/5">
              <Text className="text-2xl font-black text-primary">24</Text>
              <Text className="mt-1 text-[11px] font-bold text-foreground-muted uppercase tracking-wider">Sessions</Text>
            </View>
            <View className="flex-1 items-center rounded-2xl border border-border-light bg-surface px-4 py-4 shadow-sm shadow-slate-900/5">
              <Text className="text-2xl font-black text-primary">12</Text>
              <Text className="mt-1 text-[11px] font-bold text-foreground-muted uppercase tracking-wider">Partners</Text>
            </View>
            <View className="flex-1 items-center rounded-2xl border border-border-light bg-surface px-4 py-4 shadow-sm shadow-slate-900/5">
              <Text className="text-2xl font-black text-primary">48h</Text>
              <Text className="mt-1 text-[11px] font-bold text-foreground-muted uppercase tracking-wider">Hours</Text>
            </View>
          </View>

          {/* MENU ITEMS */}
          <View className="gap-2.5 px-5">
            {MENU_ITEMS.map((item, i) => (
              <Pressable
                key={i}
                className="flex-row items-center gap-4 rounded-2xl border border-border-light bg-surface px-4.5 py-4 shadow-sm shadow-slate-900/5 active:bg-surface-dark"
              >
                <View
                  className="h-10 w-10 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <Text className="flex-1 text-[15px] font-bold text-foreground">{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textSubtle} />
              </Pressable>
            ))}
          </View>

          {/* SIGN OUT BTN */}
          <Pressable
            className="mt-6 mx-5 flex-row items-center justify-center gap-2 rounded-2xl border border-danger/20 bg-danger/5 px-4.5 py-4 active:scale-95 transition-transform"
            onPress={async () => {
              try {
                await signOut();
              } catch (error) {
                Alert.alert("Error", "An error occurred while signing out. Please try again.");
              }
            }}
          >
            <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
            <Text className="text-[15px] font-bold text-danger">Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({});