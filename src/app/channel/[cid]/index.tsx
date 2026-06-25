import { EmptyState } from '@/components/EmptyState';
import { FullScreenLoader } from '@/components/FullScreenLoader';
import { useAppContext } from '@/contexts/AppProvider';
import { COLORS, myMessageTheme } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Channel, MessageComposer, MessageList, useChatContext, useMessageInputContext, WithComponents } from 'stream-chat-expo';

const ChannelScreen = () => {

    const { channel, setThread } = useAppContext();
    const { client } = useChatContext();

    const router = useRouter();
    const navigation = useNavigation();

    const insets = useSafeAreaInsets();
    const headerHeight = insets.top;

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
            headerShown: false,
        });
    }, [navigation]);

    if (!channel) return <FullScreenLoader message="Loading study room..." />;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F7FB' }} edges={['top', `bottom`]}>
            {/* Custom Header */}
            <View style={styles.header}>
                <View style={styles.headerLeftContainer}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                    </TouchableOpacity>

                    <View style={styles.headerTitleContainer}>
                        {avatarUrl ? (
                            <Image
                                source={{ uri: avatarUrl }}
                                style={{ width: 36, height: 36, borderRadius: 18, marginRight: 10 }}
                            />
                        ) : (
                            <View
                                className="mr-2.5 h-9 w-9 items-center justify-center rounded-full"
                                style={{ backgroundColor: COLORS.primary }}
                            >
                                <Text className="text-base font-semibold text-white">
                                    {displayName.charAt(0).toUpperCase()}
                                </Text>
                            </View>
                        )}
                        <Text style={styles.headerTitle} numberOfLines={1}>{displayName}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        router.push({
                            pathname: "/call/[callId]",
                            params: { callId: channel?.id! },
                        });
                    }}
                    style={styles.callButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="videocam-outline" size={22} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <WithComponents overrides={{
                EmptyStateIndicator: () => (
                    <EmptyState
                        icon="book-outline"
                        title="No messages yet"
                        subtitle="Start a study conversation!"
                    />
                ),
                AttachButton: (props: any) => {
                    const { openAttachmentPicker } = useMessageInputContext();
                    return (
                        <TouchableOpacity
                            onPress={openAttachmentPicker}
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                backgroundColor: COLORS.primaryTransparent,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 4,
                            }}
                        >
                            <Ionicons name="add" size={24} color={COLORS.primary} />
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
                                backgroundColor: props.disabled ? 'transparent' : COLORS.primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                ...(!props.disabled && {
                                    shadowColor: COLORS.primary,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 3,
                                }),
                            }}
                        >
                            <Ionicons
                                name="send"
                                size={16}
                                color={props.disabled ? COLORS.textSubtle : '#FFFFFF'}
                            />
                        </TouchableOpacity>
                    );
                }
            }}>
                <Channel
                    channel={channel}
                    keyboardVerticalOffset={0}
                    myMessageTheme={myMessageTheme}
                >
                    <MessageList
                        onThreadSelect={(thread) => {
                            setThread(thread);
                            router.push(`/channel/${channel.cid}/thread/${thread?.cid}`);
                        }}
                    />
                    <MessageComposer audioRecordingEnabled />
                </Channel>
            </WithComponents>
        </SafeAreaView>
    )
}

export default ChannelScreen

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EFF2F6',
        elevation: 2,
        shadowColor: '#1C1929',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 16,
    },
    backButton: {
        paddingRight: 12,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    callButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primaryTransparent,
        justifyContent: 'center',
        alignItems: 'center',
    }
})