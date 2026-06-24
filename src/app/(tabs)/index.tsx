import { useAppContext } from "@/contexts/AppProvider";
import { COLORS } from "@/lib/theme";
import { getGreetingForHour } from "@/lib/utils";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Channel } from "stream-chat";
import { ChannelList, useChatContext, WithComponents } from "stream-chat-expo";

const ChatScreen = () => {
  const router = useRouter();
  const { channel: activeChannel, setChannel } = useAppContext();
  const { user } = useUser();
  const [search, setSearch] = useState("");

  const filters = { members: { $in: [user?.id!] }, type: "messaging" };
  const firstName = user?.firstName || "there";

  const channelRenderFilterFn = (channels: Channel[]) => {
    if (!search.trim()) return channels;

    const q = search.toLowerCase();

    return channels.filter((channel) => {
      const name = (channel.data?.name as string | undefined)?.toLowerCase() ?? "";
      const cid = channel.cid.toLowerCase();
      return name.includes(q) || cid.includes(q);
    });
  };

  // Custom Channel Preview component
  const CustomChannelPreview = ({ channel }: { channel: Channel }) => {
    const { client } = useChatContext();
    const members = Object.values(channel.state.members);
    const otherMember: any = members.find((member: any) => member.user_id !== client.userID);
    const displayName = channel.data?.name || otherMember?.user?.name || "Study Room";
    const avatarUrl = channel.data?.image || otherMember?.user?.image;
    const isOnline = otherMember?.user?.online || false;
    const memberCount = members.length;

    // Get last message text & time
    const lastMessage = channel.state.messages[channel.state.messages.length - 1];
    const lastMessageText = lastMessage
      ? lastMessage.text || (lastMessage.attachments && lastMessage.attachments.length > 0 ? "📎 Attachment" : "")
      : "No messages yet";

    const lastMessageDate = lastMessage ? new Date(lastMessage.created_at) : (channel.data?.created_at ? new Date(channel.data.created_at) : new Date());

    // Format date nicely
    const today = new Date();
    let formattedTime = "";
    if (lastMessageDate.toDateString() === today.toDateString()) {
      formattedTime = lastMessageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      formattedTime = lastMessageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }

    const unreadCount = channel.countUnread ? channel.countUnread() : (channel.state.unreadCount || 0);
    const isActive = activeChannel?.id === channel.id;

    return (
      <TouchableOpacity
        onPress={() => {
          setChannel(channel);
          router.push(`/channel/${channel.id}`);
        }}
        className={`flex-row items-center p-4 mx-4 my-1.5 rounded-2xl border transition-colors ${isActive
          ? "bg-primary/5 border-primary/20"
          : "bg-surface border-border-light active:bg-surface-dark"
          }`}
        style={{
          shadowColor: "#0F172A",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.03,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        {/* Avatar */}
        <View className="relative">
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={{ width: 48, height: 48, borderRadius: 24 }}
            />
          ) : (
            <View
              className="h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: isActive ? COLORS.primaryTransparent : COLORS.surfaceDark }}
            >
              <Text className="text-base font-bold text-foreground">
                {displayName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          {isOnline && (
            <View className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-accent-secondary border-2 border-surface" />
          )}
        </View>

        {/* Content Info */}
        <View className="flex-1 ml-3.5 mr-2">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-[15px] font-bold text-foreground flex-1 mr-2" numberOfLines={1}>
              {displayName}
            </Text>
            <Text className="text-xs text-foreground-subtle" numberOfLines={1}>
              {formattedTime}
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text
              className={`text-sm flex-1 mr-2 ${unreadCount > 0 ? "font-semibold text-foreground" : "text-foreground-muted"
                }`}
              numberOfLines={1}
            >
              {lastMessageText}
            </Text>

            {unreadCount > 0 && (
              <View
                className="rounded-full bg-primary justify-center items-center px-1.5 min-w-[20px] h-[20px]"
              >
                <Text className="text-[10px] font-bold text-white text-center">
                  {unreadCount}
                </Text>
              </View>
            )}
          </View>

          {/* Lower meta tag */}
          <View className="flex-row mt-2 items-center">
            {memberCount > 2 ? (
              <View className="flex-row items-center bg-slate-100 px-2 py-0.5 rounded-full">
                <Ionicons name="people-outline" size={10} color={COLORS.textMuted} />
                <Text className="text-[10px] text-foreground-muted ml-1">{memberCount} partners</Text>
              </View>
            ) : (
              <View className="flex-row items-center bg-indigo-50 px-2 py-0.5 rounded-full">
                <Ionicons name="person-outline" size={10} color={COLORS.primary} />
                <Text className="text-[10px] text-primary ml-1 font-medium">1:1 Session</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-5 pt-3 pb-2">
        <Text className="text-sm text-foreground-muted mb-0.5">
          {getGreetingForHour()}, {firstName}
        </Text>
      </View>
      <View className="flex-row items-center bg-surface mx-5 mb-3 px-3.5 py-3 rounded-[14px] gap-2.5 border border-border">
        <Ionicons name="search" size={18} color={COLORS.textMuted} />
        <TextInput
          className="flex-1 text-[15px] text-foreground"
          placeholder="Search study rooms..."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View className="flex-row items-center px-5 my-1.5 gap-2">
        <Ionicons name="chatbubbles" size={16} color={COLORS.primaryLight} />
        <Text className="text-[15px] font-semibold text-primary-light">Your Study Sessions</Text>
      </View>
      <WithComponents overrides={{ ChannelPreview: CustomChannelPreview }}>
        <ChannelList
          filters={filters}
          options={{ state: true, watch: true }}
          sort={{ last_updated: -1 }}
          channelRenderFilterFn={channelRenderFilterFn}
          onSelect={(channel) => {
            setChannel(channel);
            router.push(`/channel/${channel.id}`);
          }}
          additionalFlatListProps={{
            contentContainerStyle: { flexGrow: 1, paddingVertical: 8 },
            ItemSeparatorComponent: () => null,
          }}
        />
      </WithComponents>
    </SafeAreaView>
  );
};

export default ChatScreen;