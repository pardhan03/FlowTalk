import { useAuth } from '@clerk/expo';
import { Redirect, Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/lib/theme';

function MyCustomTabBar({ state, descriptors, navigation }: any) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (keyboardVisible) {
    return null;
  }

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Determine icon name
        let iconName: any = 'chatbubble-ellipses-outline';
        let displayName = 'Chats';

        if (route.name === 'index') {
          iconName = isFocused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          displayName = 'Chats';
        } else if (route.name === 'explore') {
          iconName = isFocused ? 'compass' : 'compass-outline';
          displayName = 'Explore';
        } else if (route.name === 'profile') {
          iconName = isFocused ? 'person' : 'person-outline';
          displayName = 'Profile';
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <View style={[
              styles.pill,
              isFocused && styles.pillActive
            ]}>
              <Ionicons 
                name={iconName} 
                size={22} 
                color={isFocused ? COLORS.primary : COLORS.textSubtle} 
              />
              {isFocused && (
                <Text style={styles.labelText}>
                  {displayName}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabsLayout = () => {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <Redirect href={'/(auth)'} />
    }

    return (
        <Tabs 
          tabBar={(props) => <MyCustomTabBar {...props} />} 
          screenOptions={{ 
            headerShown: false,
          }}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="explore" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}

export default TabsLayout;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    height: 66,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    shadowColor: '#1C1929',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E2E7EE',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    gap: 8,
    justifyContent: 'center',
  },
  pillActive: {
    backgroundColor: 'rgba(108, 92, 231, 0.12)',
  },
  labelText: {
    color: '#6C5CE7',
    fontSize: 13,
    fontWeight: '700',
  }
});