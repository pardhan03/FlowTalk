import { EmptyState } from '@/components/EmptyState';
import { FullScreenLoader } from '@/components/FullScreenLoader';
import { useAppContext } from '@/contexts/AppProvider';
import { COLORS, myMessageTheme } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Channel, Thread, WithComponents, useMessageInputContext } from 'stream-chat-expo';

const ThreadScreen = () => {

    const { channel, thread, setThread } = useAppContext();
    const headerHeight = useHeaderHeight();

    if (channel === null) return <FullScreenLoader message="Loading thread..." />;


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F7FB' }}>
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
                    thread={thread}
                    threadList
                    myMessageTheme={myMessageTheme}
                >
                    <View className="flex-1 justify-start">
                        <Thread onThreadDismount={() => setThread(null)} />
                    </View>
                </Channel>
            </WithComponents>
        </SafeAreaView>
    )
}

export default ThreadScreen

const styles = StyleSheet.create({})