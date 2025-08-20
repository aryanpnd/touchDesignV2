import { useThemeColor } from "@/hooks/useThemeColor";
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { IconSymbolV2 } from "./ui/IconSymbolV2";

interface HeaderProps {
  title?: string;
  onLogoPress?: () => void;
  onNotificationPress?: () => void;
  notificationCount?: number;
  logoSource?: ImageSourcePropType; // <-- local/static image
}

export function Header({ 
  title = "Dashboard", 
  onLogoPress, 
  onNotificationPress,
  notificationCount = 0,
  logoSource,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const shadowColor = useThemeColor({ light: '#000', dark: '#000' }, 'text');

  // Format notification count (show 99+ if > 99)
  const formatNotificationCount = (count: number): string => {
    if (count > 99) return '99+';
    return count.toString();
  };

  return (
    <ThemedView style={[styles.header, { 
      paddingTop: insets.top + 8,
      backgroundColor,
      shadowColor,
    }]}>
      {/* Left side - Logo */}
      <TouchableOpacity 
        style={styles.logoContainer}
        onPress={onLogoPress}
        activeOpacity={0.7}
      >
        {logoSource && (
          <Image 
            source={logoSource}
            style={styles.logo}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>

      {/* Center - Title */}
      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
      </View>

      {/* Right side - Notification */}
      <TouchableOpacity 
        style={styles.notificationButton}
        onPress={onNotificationPress}
        activeOpacity={0.7}
      >
        <View style={styles.notificationContainer}>
          <IconSymbolV2
            name="bell" 
            size={24} 
            color={iconColor}
          />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <ThemedText style={styles.notificationText}>
                {formatNotificationCount(notificationCount)}
              </ThemedText>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 13,
  },
});
