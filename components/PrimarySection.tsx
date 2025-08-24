import { useThemeColor } from '@/hooks/useThemeColor';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export function PrimarySection() {
  const textColor = useThemeColor({}, 'text');
  const subtleTextColor = useThemeColor({ light: '#8E8E93', dark: '#8E8E8F' }, 'text');
  const glassBackground = useThemeColor({ light: 'rgba(255, 255, 255, 0.8)', dark: 'rgba(255, 255, 255, 0.1)' }, 'background');
  const glassBorder = useThemeColor({ light: 'rgba(255, 255, 255, 0.2)', dark: 'rgba(255, 255, 255, 0.15)' }, 'border');

  const attendancePercentage = 90;

  // Sample chip data - you can replace with actual data
  const chipData = [
    { id: 1, label: 'EduRev' },
    { id: 2, label: 'Pending Fees - 9000' },
    { id: 3, label: 'Hostel Booking' },
    { id: 4, label: 'Your Dost' },
    { id: 5, label: 'Library' },
    { id: 6, label: 'Transport' },
    { id: 7, label: 'Student Portal' },
    { id: 8, label: 'Exam Schedule' },
    { id: 9, label: 'Assignments' },
    { id: 10, label: 'Cafeteria' },
  ];

  // Split chips into two rows
  const getChipRows = (chips: typeof chipData) => {
    const midpoint = Math.ceil(chips.length / 2);
    return [
      chips.slice(0, midpoint),
      chips.slice(midpoint)
    ];
  };

  const chipRows = getChipRows(chipData);

  // Dynamic color based on attendance
  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 75) return '#10B981'; // Green
    if (percentage >= 50) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  return (
    <ThemedView style={styles.container}>
      {/* Left side container */}
      <View style={styles.leftContainer}>
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <ThemedText style={[styles.greetingText, { color: subtleTextColor }]}>
            Good Morning,
          </ThemedText>
          <ThemedText numberOfLines={1} style={[styles.nameText, { color: textColor }]}>
            Aryan
          </ThemedText>
        </View>

        {/* Scrollable Glass-like Info Chips Grid */}
        <View style={styles.chipsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scrollView}
          >
            <View style={styles.chipsGrid}>
              {chipRows.map((rowChips, rowIndex) => (
                <View key={rowIndex} style={styles.chipsRow}>
                  {rowChips.map((chip) => (
                    <View 
                      key={chip.id} 
                      style={[
                        styles.glassChip, 
                        { 
                          backgroundColor: glassBackground,
                          borderColor: glassBorder,
                        }
                      ]}
                    >
                      <ThemedText style={[styles.chipText, { color: textColor }]}>
                        {chip.label}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
          
          {/* Left blur overlay */}
          <LinearGradient
            colors={[
              useThemeColor({ light: 'rgba(248, 248, 248, 1)', dark: 'rgba(28, 28, 30, 1)' }, 'background'),
              useThemeColor({ light: 'rgba(248, 248, 248, 0)', dark: 'rgba(28, 28, 30, 0)' }, 'background')
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.leftBlurOverlay}
            pointerEvents="none"
          />
          
          {/* Right blur overlay */}
          <LinearGradient
            colors={[
              useThemeColor({ light: 'rgba(248, 248, 248, 0)', dark: 'rgba(28, 28, 30, 0)' }, 'background'),
              useThemeColor({ light: 'rgba(248, 248, 248, 1)', dark: 'rgba(28, 28, 30, 1)' }, 'background')
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.rightBlurOverlay}
            pointerEvents="none"
          />
        </View>
      </View>

      {/* Right side - Attendance */}
      <View style={styles.attendanceSection}>
        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            size={70}
            width={5}
            fill={attendancePercentage}
            rotation={0}
            tintColor={getAttendanceColor(attendancePercentage)}
            backgroundColor={useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'background')}
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
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flex: 1,
    marginRight: 20,
  },
  greetingSection: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  greetingText: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    marginBottom: 2,
    opacity: 0.8,
  },
  nameText: {
    fontSize: 24,
    maxWidth: '50%',
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  chipsContainer: {
    marginTop: 4,
    position: 'relative',
  },
  scrollView: {
    maxHeight: 85, // Height for both rows (32 * 2 + gap)
    paddingLeft: 10,
  },
  scrollContent: {
    paddingRight: 40, // Add padding to ensure last chip is visible
  },
  chipsGrid: {
    gap: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  leftBlurOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 20,
    zIndex: 1,
  },
  rightBlurOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    zIndex: 1,
  },
  glassChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    backdropFilter: 'blur(10px)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  attendanceSection: {
    alignItems: 'center',
    gap: 10,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  attendanceLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
});