import ExploreUserCard from "@/components/ExploreUserCard";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { useAppContext } from "@/contexts/AppProvider";
import useStartChat from "@/hooks/useStartChat";
import useStreamUsers from "@/hooks/useStreamUsers";
import { COLORS } from "@/lib/theme";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import type { UserResponse } from "stream-chat";
import { useChatContext } from "stream-chat-expo";

const ExporeScreen = () => {
  const { setChannel } = useAppContext();
  const { user } = useUser();
  const { client } = useChatContext();
  const userId = user?.id ?? "";
  const { width } = useWindowDimensions();

  const [creating, setCreating] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { loading, users } = useStreamUsers(client, userId);
  const { handleStartChat } = useStartChat({ client, userId, setChannel, setCreating });

  const isLargeScreen = width >= 768;

  const filteredUsers = !search.trim()
    ? users
    : users.filter(
      (u) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.id.toLowerCase().includes(search.toLowerCase()),
    );

  const renderUserItem = ({ item }: { item: UserResponse }) => (
    <ExploreUserCard item={item} creating={creating} onStartChat={handleStartChat} />
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      {/* Content wrapper with max-width for responsive tablet/desktop layouts */}
      <View 
        className="flex-1 w-full"
        style={{
          maxWidth: isLargeScreen ? 600 : undefined,
          alignSelf: isLargeScreen ? 'center' : undefined,
        }}
      >
        {/* Title & Subtitle */}
        <View className="px-5 pt-4 pb-2">
          <Text className="text-[28px] font-extrabold text-foreground tracking-tight">Explore</Text>
          <Text className="text-sm text-foreground-muted mt-1 leading-5">
            Discover other students and start chatting instantly!
          </Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-surface mx-5 my-4 px-3.5 py-3 rounded-2xl border border-border-light shadow-sm shadow-slate-900/5">
          <Ionicons name="search" size={18} color={COLORS.textSubtle} />
          <TextInput
            className="flex-1 text-[15px] text-foreground ml-2.5"
            placeholder="Search students..."
            placeholderTextColor={COLORS.textSubtle}
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color={COLORS.textSubtle} />
            </Pressable>
          )}
        </View>

        {/* Loading / Users list */}
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={renderUserItem}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<ListEmptyComponent />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default ExporeScreen;

const styles = StyleSheet.create({});