import { COLORS } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import type { UserResponse } from "stream-chat";

type ExploreUserCardProps = {
  item: UserResponse;
  creating: string | null;
  onStartChat: (targetId: string) => void;
};

const ExploreUserCard = ({ item, creating, onStartChat }: ExploreUserCardProps) => {
  const isOnline = item.online ?? false;
  const displayName = item.name || item.id;

  return (
    <Pressable
      className="flex-row items-center bg-surface rounded-2xl p-4 mb-3 border border-border-light gap-4 shadow-sm shadow-slate-900/5 active:bg-surface-dark"
      onPress={() => onStartChat(item.id)}
      disabled={creating !== null}
    >
      {/* Avatar Container */}
      <View className="relative">
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
            contentFit="cover"
          />
        ) : (
          <View
            className="w-[50px] h-[50px] rounded-full items-center justify-center"
            style={{ backgroundColor: COLORS.primaryTransparent }}
          >
            <Text className="text-base font-bold" style={{ color: COLORS.primary }}>
              {displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        
        {isOnline && (
          <View className="w-3.5 h-3.5 rounded-full bg-accent-secondary absolute bottom-0 right-0 border-2 border-surface" />
        )}
      </View>

      {/* User Info */}
      <View className="flex-1">
        <Text className="text-base font-bold text-foreground" numberOfLines={1}>
          {displayName}
        </Text>
        <Text className="text-xs text-foreground-muted mt-0.5 font-medium">
          {isOnline ? "Active now" : "Offline"}
        </Text>
      </View>

      {/* Action button */}
      {creating === item.id ? (
        <View className="h-9 w-20 justify-center items-center">
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      ) : (
        <View className="flex-row items-center justify-center bg-primary/10 rounded-full px-4 py-2 border border-primary/10">
          <Ionicons name="chatbox-ellipses" size={14} color={COLORS.primary} />
          <Text className="text-xs font-bold text-primary ml-1.5">
            Chat
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default ExploreUserCard;