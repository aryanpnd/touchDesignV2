import { StyleSheet, View } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useThemeColor } from '@/hooks/useThemeColor';

export function PrimarySection() {
  const textColor = useThemeColor({}, 'text');
  const subtleTextColor = useThemeColor({ light: '#666', dark: '#aaa' }, 'text');
  
  const attendancePercentage = 90;
  
  // Dynamic color based on attendance
  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 75) return '#10B981'; // Green
    if (percentage >= 50) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  return (
    <ThemedView style={styles.container}>
      {/* Left side - Greeting */}
      <View style={styles.greetingSection}>
        <ThemedText style={[styles.greetingText, { color: subtleTextColor }]}>
          Good Morning
        </ThemedText>
        <ThemedText style={[styles.nameText, { color: textColor }]}>
          Aryan
        </ThemedText>
      </View>

      {/* Right side - Attendance */}
      <View style={styles.attendanceSection}>
        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            size={60}
            width={4}
            fill={attendancePercentage}
            rotation={0}
            tintColor={getAttendanceColor(attendancePercentage)}
            backgroundColor="#E5E7EB"
            lineCap="round">
            {() => (
              <ThemedText style={[styles.percentageText, { color: textColor }]}>
                {attendancePercentage}%
              </ThemedText>
            )}
          </AnimatedCircularProgress>
        </View>
        <ThemedText style={[styles.attendanceLabel, { color: subtleTextColor }]}>
          Attendance
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingSection: {
    flex: 1,
    gap: 6,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 32,
    includeFontPadding: false,
  },
  attendanceSection: {
    alignItems: 'center',
    gap: 8,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  attendanceLabel: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
});