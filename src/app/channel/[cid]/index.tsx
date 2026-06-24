import { EmptyState } from '@/components/EmptyState';
import { FullScreenLoader } from '@/components/FullScreenLoader';
import { useAppContext } from '@/contexts/AppProvider';
import { COLORS, myMessageTheme } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Channel, MessageComposer, MessageList, useChatContext, useMessageInputContext, WithComponents } from 'stream-chat-expo';

const ChannelScreen = () => {

    const { channel, setThread } = useAppContext();
    const { client } = useChatContext();

    const router = useRouter();
    const navigation = useNavigation();

    const headerHeight = useHeaderHeight();

    let displayName = "";
    let avatarUrl = "";

    if (channel) {
        const members = Object.values(channel.state.members);
        const otherMember = members.find((member) => member.user_id !== client.userID);
        displayName = otherMember?.user?.name!;
        avatarUrl = otherMember?.user?.image || "";
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: COLORS.surface,
            },
            headerTintColor: COLORS.text,
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()} className="ml-2 flex-row items-center">
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
            ),
            headerTitle: () => (
                <View className="flex-row items-center">
                    {avatarUrl ? (
                        <Image
                            source={{ uri: avatarUrl }}
                            style={{ width: 32, height: 32, borderRadius: 16, marginRight: 10 }}
                        />
                    ) : (
                        <View
                            className="mr-2.5 h-8 w-8 items-center justify-center rounded-full"
                            style={{ backgroundColor: COLORS.primary }}
                        >
                            <Text className="text-base font-semibold text-white">
                                {displayName.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    )}
                    <Text className="font-semibold text-foreground">{displayName}</Text>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        router.push({
                            pathname: "/call/[callId]",
                            params: { callId: channel?.id! },
                        });
                    }}
                >
                    <Ionicons name="videocam-outline" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, displayName, avatarUrl, channel?.cid, channel?.id, router]);

    if (!channel) return <FullScreenLoader message="Loading study room..." />;

    return (
        <View style={{ flex: 1, backgroundColor: '#F6F7FB' }}>
            <WithComponents overrides={{
                EmptyStateIndicator: () => (
                    <EmptyState
                        icon="book-outline"
                        title="No messages yet"
                        subtitle="Start a study conversation!"
                    />
                ),
                AttachButton: (props: any) => {
                    const { handleAttachButtonPress } = useMessageInputContext();
                    return (
                        <TouchableOpacity
                            onPress={handleAttachButtonPress}
                            disabled={props.disabled}
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                backgroundColor: '#F0F3F8',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 8,
                            }}
                        >
                            <Ionicons name="add" size={22} color={COLORS.primary} />
                        </TouchableOpacity>
                    );
                },
                SendButton: (props: any) => {
                    const { sendMessage } = useMessageInputContext();
                    return (
                        <TouchableOpacity
                            onPress={sendMessage}
                            disabled={props.disabled}
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                backgroundColor: props.disabled ? '#EFF2F6' : COLORS.primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Ionicons
                                name="send"
                                size={16}
                                color={props.disabled ? '#8B899A' : '#FFFFFF'}
                            />
                        </TouchableOpacity>
                    );
                }
            }}>
                <Channel
                    channel={channel}
                    keyboardVerticalOffset={headerHeight}
                    myMessageTheme={myMessageTheme}
                >
                    <MessageList
                        onThreadSelect={(thread) => {
                            setThread(thread);
                            router.push(`/channel/${channel.cid}/thread/${thread?.cid}`);
                        }}
                    />

                    <View style={{ backgroundColor: '#FFFFFF', paddingBottom: 20 }}>
                        <MessageComposer audioRecordingEnabled />
                    </View>
                </Channel>
            </WithComponents>
        </View>
    )
}

export default ChannelScreen

const styles = StyleSheet.create({})