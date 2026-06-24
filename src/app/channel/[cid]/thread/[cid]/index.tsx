import { EmptyState } from '@/components/EmptyState';
import { FullScreenLoader } from '@/components/FullScreenLoader';
import { useAppContext } from '@/contexts/AppProvider';
import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Channel, Thread, WithComponents } from 'stream-chat-expo';

const ThreadScreen = () => {

    const { channel, thread, setThread } = useAppContext();
    const headerHeight = useHeaderHeight();

    if (channel === null) return <FullScreenLoader message="Loading thread..." />;


    return (
        <SafeAreaView className="flex-1 bg-surface">
            <WithComponents overrides={{
                EmptyStateIndicator: () => (
                    <EmptyState
                        icon="book-outline"
                        title="No messages yet"
                        subtitle="Start a study conversation!"
                    />
                )
            }}>
                <Channel
                    channel={channel}
                    keyboardVerticalOffset={headerHeight}
                    thread={thread}
                    threadList
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