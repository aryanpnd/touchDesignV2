import { StyleSheet, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useRef } from 'react';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  interpolate,
  runOnJS
} from 'react-native-reanimated';

interface Announcement {
  id: string;
  title: string;
  category: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

interface AnnouncementBannerProps {
  announcements: Announcement[];
  onViewAll?: () => void;
}

export function AnnouncementBanner({ announcements, onViewAll }: AnnouncementBannerProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleTextColor = useThemeColor({ light: '#666', dark: '#aaa' }, 'text');
  const tintColor = useThemeColor({}, 'tint');
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = Dimensions.get('window');
  const bannerWidth = screenWidth - 60; // Account for padding
  
  // Animation values
  const bannerHeight = useSharedValue(1);
  const bannerOpacity = useSharedValue(1);
  
  const getPriorityColors = (priority: 'high' | 'medium' | 'low', isDark: boolean) => {
    switch (priority) {
      case 'high':
        return isDark 
          ? ['rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.05)']
          : ['rgba(254, 226, 226, 0.8)', 'rgba(254, 242, 242, 0.4)'];
      case 'medium':
        return isDark
          ? ['rgba(245, 158, 11, 0.2)', 'rgba(245, 158, 11, 0.05)']
          : ['rgba(254, 243, 199, 0.8)', 'rgba(255, 251, 235, 0.4)'];
      default:
        return isDark
          ? ['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0.05)']
          : ['rgba(219, 234, 254, 0.8)', 'rgba(239, 246, 255, 0.4)'];
    }
  };

  const getPriorityBorder = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'rgba(239, 68, 68, 0.3)';
      case 'medium':
        return 'rgba(245, 158, 11, 0.3)';
      default:
        return 'rgba(59, 130, 246, 0.3)';
    }
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / bannerWidth);
    setActiveIndex(index);
  };

  const toggleVisibility = () => {
    const newHiddenState = !isHidden;
    
    if (newHiddenState) {
      // Hide with animation
      bannerOpacity.value = withTiming(0, { duration: 200 });
      bannerHeight.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(setIsHidden)(true);
      });
    } else {
      // Show with animation
      setIsHidden(false);
      bannerHeight.value = withTiming(1, { duration: 300 });
      bannerOpacity.value = withTiming(1, { duration: 400 });
    }
  };

  // Animated styles
  const animatedBannerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(bannerHeight.value, [0, 1], [0, 110]), // Reduced from 140 to 110
      opacity: bannerOpacity.value,
      transform: [
        {
          scaleY: bannerHeight.value,
        }
      ],
    };
  });

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      opacity: bannerOpacity.value,
      transform: [
        {
          translateY: interpolate(bannerHeight.value, [0, 1], [10, 0]),
        }
      ],
    };
  });

  const isDark = useThemeColor({}, 'background') === '#151718';

  return (
    <ThemedView style={styles.container}>
      {/* Header - Always visible */}
      <View style={styles.header}>
        <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
          Announcements
        </ThemedText>
        <ThemedView style={styles.bannerButtonContainer}>
          <TouchableOpacity onPress={toggleVisibility} activeOpacity={0.7}>
            <ThemedText style={[styles.hideButton, { color: subtleTextColor }]}>
              {isHidden ? 'Show' : 'Hide'}
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
            <ThemedText style={[styles.viewAllButton, { color: tintColor }]}>
              View All
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>

      {/* Animated Banner Content */}
      {!isHidden && (
        <Animated.View style={animatedBannerStyle}>
          {/* Horizontal ScrollView */}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.scrollContainer}
            decelerationRate="fast"
          >
            {announcements.map((announcement, index) => (
              <TouchableOpacity
                key={announcement.id}
                style={[styles.bannerContainer, { width: bannerWidth }]}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={getPriorityColors(announcement.priority, isDark)}
                  style={[
                    styles.banner,
                    { borderColor: getPriorityBorder(announcement.priority) }
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {/* Category and Date */}
                  <View style={styles.bannerHeader}>
                    <ThemedText style={[styles.category, { color: subtleTextColor }]}>
                      {announcement.category}
                    </ThemedText>
                    <ThemedText style={[styles.date, { color: subtleTextColor }]}>
                      {announcement.date}
                    </ThemedText>
                  </View>
                  
                  {/* Title */}
                  <ThemedText 
                    style={[styles.title, { color: textColor }]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {announcement.title}
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Animated Dot Indicators */}
          <Animated.View style={[styles.indicators, animatedIndicatorStyle]}>
            {announcements.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor: index === activeIndex ? tintColor : subtleTextColor,
                    opacity: index === activeIndex ? 1 : 0.3,
                  }
                ]}
              />
            ))}
          </Animated.View>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  bannerButtonContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  hideButton: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  viewAllButton: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.1,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0, // Removed padding bottom
  },
  bannerContainer: {
    paddingRight: 12,
  },
  banner: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minHeight: 80,
    justifyContent: 'space-between',
  },
  bannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    flex: 1,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8, // Reduced from 12 to 8
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});