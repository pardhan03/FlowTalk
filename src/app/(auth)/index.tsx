import useSocialAuth from "@/hooks/useSocialAuth";
import { COLORS } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from "react-native-safe-area-context";

const AuthScreen = () => {
    const { handleSocialAuth, loadingStrategy } = useSocialAuth();
    const { width } = useWindowDimensions();
    const isLoading = loadingStrategy !== null;

    const isLargeScreen = width >= 768;

    return (
        <View className="flex-1 bg-background">
            {/* Soft gradient background */}
            <View className="absolute inset-0">
                <LinearGradient
                    colors={["#EEF2F6", "#FFFFFF", "#EEF2F6"]}
                    style={{ width: "100%", height: "100%" }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
            </View>

            <SafeAreaView className="flex-1 justify-center">
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 20 }}
                >
                    <View 
                        className="w-full px-8 self-center"
                        style={{
                            maxWidth: isLargeScreen ? 480 : undefined,
                        }}
                    >
                        {/* TOP SECTION: logo + hero */}
                        <View className="items-center pt-4 pb-2">
                            <View className="w-16 h-16 rounded-[22px] bg-primary/10 items-center justify-center border border-primary/10 shadow-sm shadow-indigo-500/10">
                                <Ionicons name="school" size={28} color={COLORS.primary} />
                            </View>
        
                            <Text className="text-3xl font-black text-foreground tracking-tight mt-4">
                                FlowTalk
                            </Text>
        
                            <Text className="text-foreground-muted text-sm mt-1.5 font-medium tracking-wide">
                                Learn together, grow together
                            </Text>
                        </View>
        
                        {/* Feature Chips */}
                        <View className="flex-row flex-wrap justify-center gap-2.5 my-6">
                            {[
                                {
                                    icon: "videocam" as const,
                                    label: "Video Calls",
                                    color: COLORS.primary,
                                    bg: "bg-primary/5 border-primary/5",
                                },
                                {
                                    icon: "chatbubbles" as const,
                                    label: "Study Rooms",
                                    color: "#FF6B6B",
                                    bg: "bg-accent/5 border-accent/5",
                                },
                                {
                                    icon: "people" as const,
                                    label: "Find Partners",
                                    color: "#10B981",
                                    bg: "bg-accent-secondary/5 border-accent-secondary/5",
                                },
                            ].map((chip) => (
                                <View
                                    key={chip.label}
                                    className={`flex-row items-center gap-1.5 px-3.5 py-2 rounded-full border ${chip.bg}`}
                                >
                                    <Ionicons name={chip.icon} size={13} color={chip.color} />
                                    <Text className="text-foreground-muted text-[11px] font-bold tracking-wide uppercase">
                                        {chip.label}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        {/* Image Illustration */}
                        {!isLargeScreen && (
                            <View className="items-center my-2">
                                <Image
                                    source={require("@/assets/images/auth.png")}
                                    style={{ width: 280, height: 260 }}
                                    contentFit="contain"
                                />
                            </View>
                        )}
        
                        {/* Separator line */}
                        <View className="flex-row items-center gap-3 mt-4 mb-6">
                            <View className="flex-1 h-px bg-border" />
                            <Text className="text-foreground-subtle text-[11px] font-bold tracking-widest uppercase">
                                Sign In or Register
                            </Text>
                            <View className="flex-1 h-px bg-border" />
                        </View>
        
                        {/* Login Providers List */}
                        <View className="gap-3 mb-8">
                            {/* GOOGLE Button */}
                            <Pressable
                                className="flex-row items-center justify-center bg-surface border border-border-light h-[56px] rounded-2xl active:bg-surface-dark shadow-sm shadow-slate-900/5 px-4"
                                disabled={isLoading}
                                onPress={() => !isLoading && handleSocialAuth("oauth_google")}
                            >
                                {loadingStrategy === "oauth_google" ? (
                                    <ActivityIndicator size="small" color={COLORS.primary} />
                                ) : (
                                    <>
                                        <Image
                                            source={require("../../../assets/images/google.png")}
                                            style={{ width: 20, height: 20 }}
                                        />
                                        <Text className="text-sm font-bold text-foreground ml-3">
                                            Continue with Google
                                        </Text>
                                    </>
                                )}
                            </Pressable>

                            {/* GITHUB Button */}
                            <Pressable
                                className="flex-row items-center justify-center bg-surface border border-border-light h-[56px] rounded-2xl active:bg-surface-dark shadow-sm shadow-slate-900/5 px-4"
                                disabled={isLoading}
                                onPress={() => !isLoading && handleSocialAuth("oauth_github")}
                            >
                                {loadingStrategy === "oauth_github" ? (
                                    <ActivityIndicator size="small" color={COLORS.primary} />
                                ) : (
                                    <>
                                        <Ionicons name="logo-github" size={20} color={COLORS.text} />
                                        <Text className="text-sm font-bold text-foreground ml-3">
                                            Continue with GitHub
                                        </Text>
                                    </>
                                )}
                            </Pressable>

                            {/* APPLE Button */}
                            <Pressable
                                className="flex-row items-center justify-center bg-surface border border-border-light h-[56px] rounded-2xl active:bg-surface-dark shadow-sm shadow-slate-900/5 px-4"
                                disabled={isLoading}
                                onPress={() => !isLoading && handleSocialAuth("oauth_apple")}
                            >
                                {loadingStrategy === "oauth_apple" ? (
                                    <ActivityIndicator size="small" color={COLORS.primary} />
                                ) : (
                                    <>
                                        <Ionicons name="logo-apple" size={20} color={COLORS.text} />
                                        <Text className="text-sm font-bold text-foreground ml-3">
                                            Continue with Apple
                                        </Text>
                                    </>
                                )}
                            </Pressable>
                        </View>
        
                        {/* Footer text */}
                        <Text className="text-foreground-subtle text-[11px] text-center leading-4 font-medium px-4">
                            By continuing, you agree to FlowTalk's{" "}
                            <Text className="text-primary font-bold">Terms of Service</Text> and{" "}
                            <Text className="text-primary font-bold">Privacy Policy</Text>
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default AuthScreen;

const styles = StyleSheet.create({});