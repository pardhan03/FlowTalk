import { COLORS } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';
import {
    Call,
    CallContent,
    CallingState,
    IncomingCall,
    OutgoingCall,
    StreamCall,
    useCall,
    useCallStateHooks,
    useStreamVideoClient
} from '@stream-io/video-react-native-sdk';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChatContext } from 'stream-chat-expo';

const CallScreen = () => {
    const { callId } = useLocalSearchParams<{ callId: string }>();
    const videoClient = useStreamVideoClient();
    const { client: chatClient } = useChatContext();

    const [call, setCall] = useState<Call | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!videoClient || !callId) return;

        const startCall = async () => {
            try {
                // find channel by ID to find its members
                const channel = chatClient.channel("messaging", callId);
                await channel.watch();

                const _call = videoClient.call("default", callId);

                const members = Object.values(channel.state.members).map((member) => ({
                    user_id: member?.user?.id as string,
                }));

                await _call.getOrCreate({
                    ring: true,
                    data: {
                        members,
                        custom: {
                            triggeredBy: chatClient.user?.id,
                        },
                    },
                });

                setCall(_call);
            } catch (error) {
                console.error("Failed to start call:", error);
                setError("Failed to start the call. Try again");
            }
        };
        startCall();
        // eslint-disable-next-line
    }, []);

    if (error) return <ErrorCallUI error={error} />;

    if (!call) {
        return (
            <SafeAreaView className="flex-1 bg-slate-950">
                <View className="flex-1 items-center justify-center gap-4">
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text className="mt-4 text-base font-medium text-slate-300">Initiating video call...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <StreamCall call={call}>
            <CallUI />
        </StreamCall>
    )
}

function CallUI() {
    const call = useCall();
    const router = useRouter();
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    const isCallCreatedByMe = call?.isCreatedByMe ?? false;

    useEffect(() => {
        if (callingState === CallingState.LEFT) router.back();
    }, [callingState, router, call]);

    // show ringing UI for RINGING, JOINING, and IDLE states
    if ([CallingState.RINGING, CallingState.JOINING, CallingState.IDLE].includes(callingState)) {
        return (
            <SafeAreaView className="flex-1 bg-slate-950">
                {isCallCreatedByMe ? (
                    <View className="flex-1 justify-center items-center">
                        <OutgoingCall />
                    </View>
                ) : (
                    <View className="flex-1 justify-center items-center">
                        <IncomingCall />
                    </View>
                )}
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-950" edges={["bottom"]}>
            <CallContent
                onHangupCallHandler={async () => {
                    await call?.endCall();
                }}
                layout="spotlight"
            />
        </SafeAreaView>
    );
}

export default CallScreen

function ErrorCallUI({ error }: { error: string }) {
    const router = useRouter();
    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-1 items-center justify-center gap-4 px-6">
                <View className="w-16 h-16 rounded-full bg-danger/10 items-center justify-center mb-2">
                    <Ionicons name="alert-circle" size={32} color={COLORS.danger} />
                </View>
                <Text className="text-lg font-bold text-foreground">Call Connection Failed</Text>
                <Text className="text-sm text-foreground-muted text-center max-w-xs">{error}</Text>
                <Pressable className="mt-6 rounded-2xl bg-primary px-8 py-3.5 active:scale-95 shadow-lg shadow-primary/20" onPress={() => router.back()}>
                    <Text className="text-[15px] font-bold text-white">Go Back</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}