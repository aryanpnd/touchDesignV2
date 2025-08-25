import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';

type Props = PropsWithChildren<{
  headerComponent?: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
  minHeaderHeight?: number; // Minimum header height fallback
}>;

export default function ParallaxScrollView({
  children,
  headerComponent,
  headerBackgroundColor,
  minHeaderHeight = 150, // Default fallback height
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  
  const [headerHeight, setHeaderHeight] = useState(minHeaderHeight);
  const dynamicHeaderHeight = useSharedValue(minHeaderHeight);

  const handleHeaderLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    const newHeight = Math.max(height, minHeaderHeight);
    setHeaderHeight(newHeight);
    dynamicHeaderHeight.value = newHeight;
  };
  
  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (!headerComponent) return {};
    
    const currentHeaderHeight = dynamicHeaderHeight.value;
    
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-currentHeaderHeight, 0, currentHeaderHeight],
            [-currentHeaderHeight / 3, 0, currentHeaderHeight * 0.5]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value, 
            [-currentHeaderHeight, 0, currentHeaderHeight], 
            [1.1, 1, 0.95]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
        showsVerticalScrollIndicator={false}
        bounces={true}
        decelerationRate="normal">
        
        {/* Header Component with dynamic height */}
        {headerComponent && (
          <Animated.View
            style={[
              styles.header,
              { minHeight: minHeaderHeight },
              headerBackgroundColor && { backgroundColor: headerBackgroundColor[colorScheme] },
              headerAnimatedStyle,
            ]}
            onLayout={handleHeaderLayout}>
            <ThemedView style={styles.headerContent}>
              {headerComponent}
            </ThemedView>
          </Animated.View>
        )}
        
        {/* Main Content */}
        <ThemedView style={styles.content}>
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    overflow: 'hidden',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 0,
    overflow: 'hidden',
  },
});