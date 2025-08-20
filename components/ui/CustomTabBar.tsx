import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Octicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {
    Animated,
    ColorSchemeName,
    Dimensions,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface TabItemProps {
  route: any;
  index: number;
  navigation: any;
  descriptors: any;
  state: any;
  colorScheme: ColorSchemeName;
}

const TabItem: React.FC<TabItemProps> = ({
  route,
  index,
  navigation,
  descriptors,
  state,
  colorScheme,
}) => {
  const { options } = descriptors[route.key];
  const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
  const isFocused = state.index === index;

  const scaleAnim = React.useRef(new Animated.Value(isFocused ? 1.1 : 1)).current;
  const backgroundOpacityAnim = React.useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isFocused ? 1.1 : 1,
        useNativeDriver: true,
        tension: 150,
        friction: 8,
      }),
      Animated.timing(backgroundOpacityAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFocused, scaleAnim, backgroundOpacityAnim]);

  const onPress = () => {
    // Add haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      Haptics.selectionAsync();
    }

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  // Get icon name based on route name
  const getIconName = (routeName: string, focused: boolean) => {
    switch (routeName) {
      case 'index':
        return 'home';
      case 'timetable':
        return 'clock';
      case 'search':
        return 'search';
      case 'settings':
        return 'gear';
      default:
        return 'home';
    }
  };

  const activeColor = '#fe7b71';
  const inactiveColor = '#9CA3AF';
  const backgroundColor = colorScheme === 'dark' ? '#1F2937' : '#FFFFFF';
  const highlightColor = colorScheme === 'dark' ? 'rgba(254, 123, 113, 0.15)' : 'rgba(254, 123, 113, 0.1)';

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.tabItem}>
        <Animated.View
          style={[
            styles.tabBackground,
            {
              backgroundColor: highlightColor,
              opacity: backgroundOpacityAnim,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.tabContent,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Octicons
            name={getIconName(route.name, isFocused)}
            size={isFocused ? 24 : 20}
            color={isFocused ? activeColor : inactiveColor}
          />
          <ThemedText
            style={[
              styles.tabLabel,
              {
                color: isFocused ? activeColor : inactiveColor,
                fontWeight: isFocused ? '600' : '500',
              },
            ]}
          >
            {label}
          </ThemedText>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const backgroundColor = colorScheme === 'dark' ? '#1F2937' : '#FFFFFF';
  const borderColor = colorScheme === 'dark' ? '#374151' : '#E5E7EB';

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor,
          borderTopColor: borderColor,
          paddingBottom: insets.bottom + 10,
          height: Platform.OS === 'ios' ? 105 + insets.bottom : 95,
        },
      ]}
    >
      {state.routes.map((route, index) => (
        <TabItem
          key={route.key}
          route={route}
          index={index}
          navigation={navigation}
          descriptors={descriptors}
          state={state}
          colorScheme={colorScheme}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    ...Platform.select({
      ios: {
        position: 'absolute',
      },
      default: {},
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 8,
  },
  tabBackground: {
    position: 'absolute',
    width: 80,
    height: 60,
    borderRadius: 20,
    top: -5,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default CustomTabBar;
