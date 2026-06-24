import useSocialAuth from "@/hooks/useSocialAuth";
import { COLORS } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const AuthScreen = () => {
    const { handleSocialAuth, loadingStrategy } = useSocialAuth();
    const isLoading = loadingStrategy !== null;
    return (
        <View className="flex-1 bg-background">
            <View className="absolute inset-0">
                <LinearGradient
                    colors={["#FFFFFF", "#F5F6FA", "#E9ECF5", "#F5F6FA", "#FFFFFF"]}
                    locations={[0, 0.25, 0.5, 0.75, 1]}
                    style={{ width: "100%", height: "100%" }}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                />
            </View>
            <SafeAreaView className="flex-1 justify-between">
                {/* TOP SECTION: logo + hero */}
                <View>
                    <View className="items-center pt-10 pb-2">
                        <View className="w-16 h-16 rounded-[20px] bg-primary/10 items-center justify-center border border-primary/20">
                            <Ionicons name="school" size={30} color={COLORS.primary} />
                        </View>
 
                        <Text className="text-3xl font-extrabold text-foreground tracking-tight mt-4 font-mono">
                            FlowTalk
                        </Text>
 
                        <Text className="text-foreground-muted text-[15px] mt-1.5 tracking-wide">
                            Learn together, grow together
                        </Text>
                    </View>
 
                    <View className="items-center px-6 mt-4">
                        <Image
                            source={require("@/assets/images/auth.png")}
                            style={{ width: 320, height: 350 }}
                        />
                    </View>
 
                    {/* feature chips */}
                    <View className="flex-row flex-wrap justify-center gap-3 px-6 mt-5">
                        {[
                            {
                                icon: "videocam" as const,
                                label: "Video Calls",
                                color: COLORS.primary,
                                bg: "bg-primary/8 border-primary/15",
                            },
                            {
                                icon: "chatbubbles" as const,
                                label: "Study Rooms",
                                color: COLORS.accent,
                                bg: "bg-accent/8 border-accent/15",
                            },
                            {
                                icon: "people" as const,
                                label: "Find Partners",
                                color: COLORS.accentSecondary,
                                bg: "bg-accent-secondary/8 border-accent-secondary/15",
                            },
                        ].map((chip) => (
                            <View
                                key={chip.label}
                                className={`flex-row items-center gap-1.5 px-3.5 py-2 rounded-full border ${chip.bg}`}
                            >
                                <Ionicons name={chip.icon} size={14} color={chip.color} />
                                <Text className="text-foreground-muted text-xs font-semibold tracking-wide">
                                    {chip.label}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
 
                <View className="px-8 pb-4">
                    <View className="flex-row items-center gap-3 mb-6">
                        <View className="flex-1 h-px bg-border" />
                        <Text className="text-foreground-subtle text-xs font-medium tracking-widest uppercase">
                            Continue with
                        </Text>
                        <View className="flex-1 h-px bg-border" />
                    </View>
 
                    <View className="flex-row justify-center items-center gap-4 mb-5">
                        {/* GOOGLE btn */}
                        <Pressable
                            className="size-20 rounded-2xl bg-white border border-border items-center justify-center active:scale-95 shadow-sm"
                            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
                            disabled={isLoading}
                            accessibilityRole="button"
                            accessibilityLabel="Continue with Google"
                            onPress={() => !isLoading && handleSocialAuth("oauth_google")}
                        >
                            {loadingStrategy === "oauth_google" ? (
                                <ActivityIndicator size={"small"} color={"#6C5CE7"} />
                            ) : (
                                <Image
                                    source={require("../../../assets/images/google.png")}
                                    style={{ width: 28, height: 28 }}
                                />
                            )}
                        </Pressable>
 
                        {/* APPLE btn */}
                        <Pressable
                            className="size-20 rounded-2xl bg-white border border-border items-center justify-center active:scale-95 shadow-sm"
                            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
                            disabled={isLoading}
                            accessibilityRole="button"
                            accessibilityLabel="Continue with Apple"
                            onPress={() => !isLoading && handleSocialAuth("oauth_apple")}
                        >
                            {loadingStrategy === "oauth_apple" ? (
                                <ActivityIndicator size="small" color="#6C5CE7" />
                            ) : (
                                <Ionicons name="logo-apple" size={30} color={COLORS.text} />
                            )}
                        </Pressable>
 
                        {/* GITHUB btn */}
                        <Pressable
                            className="size-20 rounded-2xl bg-white border border-border items-center justify-center active:scale-95 shadow-sm"
                            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
                            disabled={isLoading}
                            accessibilityRole="button"
                            accessibilityLabel="Continue with GitHub"
                            onPress={() => !isLoading && handleSocialAuth("oauth_github")}
                        >
                            {loadingStrategy === "oauth_github" ? (
                                <ActivityIndicator size="small" color="#6C5CE7" />
                            ) : (
                                <Ionicons name="logo-github" size={28} color={COLORS.text} />
                            )}
                        </Pressable>
                    </View>
 
                    <Text className="text-foreground-subtle text-[11px] text-center leading-4">
                        By continuing, you agree to our{" "}
                        <Text className="text-primary">Terms of Service</Text> and{" "}
                        <Text className="text-primary">Privacy Policy</Text>
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default AuthScreen

const styles = StyleSheet.create({})