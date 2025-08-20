import { useThemeColor } from '@/hooks/useThemeColor';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface ClassCardProps {
  classTime: string;
  subjectCode: string;
  subjectName: string;
  location: string;
  classType: 'lecture' | 'practical';
  section: string;
  group?: string;
  status?: 'ongoing' | 'upcoming' | 'completed';
  attendanceStatus?: 'present' | 'absent' | 'not marked';
  onPress?: () => void;
}

export function ClassCard({
  classTime,
  subjectCode,
  subjectName,
  location,
  classType,
  section,
  group,
  status = 'upcoming',
  attendanceStatus = 'not marked',
  onPress,
}: ClassCardProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleTextColor = useThemeColor({ light: '#666', dark: '#aaa' }, 'text');
  const cardBackground = useThemeColor({ light: '#ffffff', dark: '#1f1f1f' }, 'background');
  const borderColor = useThemeColor({ light: '#e5e5e5', dark: '#333' }, 'icon');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return '#10B981'; // Green
      case 'completed':
        return '#6B7280'; // Gray
      default:
        return '#3B82F6'; // Blue
    }
  };

  const getAttendanceColor = (attendance: string) => {
    switch (attendance) {
      case 'present':
        return '#10B981'; // Green
      case 'absent':
        return '#EF4444'; // Red
      default:
        return '#6B7280'; // Gray
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'ongoing';
      case 'completed':
        return 'Done';
      default:
        return 'Soon';
    }
  };

  const getAttendanceText = (attendance: string) => {
    switch (attendance) {
      case 'present':
        return 'Present';
      case 'absent':
        return 'Absent';
      default:
        return 'Not marked';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      {status === 'ongoing' ? (
        <LinearGradient
          colors={['#f78c30', '#fe7b71']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.card,
            { 
              borderColor: '#f78c30',
            }
          ]}
        >
          {/* Header: Time and Status */}
          <View style={styles.header}>
            <ThemedText style={[styles.timeText, { color: '#ffffff' }]}>
              {classTime}
            </ThemedText>
            <View style={[styles.statusChip, { backgroundColor: 'rgba(255, 255, 255, 0.3)' }]}>
              <ThemedText style={styles.chipText}>
                {getStatusText(status)}
              </ThemedText>
            </View>
          </View>

          {/* Subject */}
          <View style={styles.subjectContainer}>
            <ThemedText style={[styles.subjectName, { color: '#ffffff' }]} numberOfLines={1}>
              [{subjectCode}] {subjectName}
            </ThemedText>
            <ThemedText style={[styles.locationText, { color: 'rgba(255, 255, 255, 0.8)' }]}>
              📍 {location}
            </ThemedText>
          </View>

          {/* Footer: Details and Attendance */}
          <View style={styles.footer}>
            <View style={styles.detailsContainer}>
              <ThemedText style={[styles.detailText, { color: 'rgba(255, 255, 255, 0.8)' }]}>
                {classType.charAt(0).toUpperCase() + classType.slice(1)} • {section}
                {group && ` • ${group}`}
              </ThemedText>
            </View>
            <View style={[styles.attendanceChip, { backgroundColor: getAttendanceColor(attendanceStatus) }]}>
              <ThemedText style={styles.chipText}>
                {getAttendanceText(attendanceStatus)}
              </ThemedText>
            </View>
          </View>
        </LinearGradient>
      ) : (
        <ThemedView style={[
          styles.card,
          { 
            backgroundColor: cardBackground,
            borderColor: borderColor,
          }
        ]}>
          {/* Header: Time and Status */}
          <View style={styles.header}>
            <ThemedText style={[styles.timeText, { color: textColor }]}>
              {classTime}
            </ThemedText>
            <View style={[styles.statusChip, { backgroundColor: getStatusColor(status) }]}>
              <ThemedText style={styles.chipText}>
                {getStatusText(status)}
              </ThemedText>
            </View>
          </View>

          {/* Subject */}
          <View style={styles.subjectContainer}>
            <ThemedText style={[styles.subjectName, { color: textColor }]} numberOfLines={1}>
              [{subjectCode}] {subjectName}
            </ThemedText>
            <ThemedText style={[styles.locationText, { color: subtleTextColor }]}>
              📍 {location}
            </ThemedText>
          </View>

          {/* Footer: Details and Attendance */}
          <View style={styles.footer}>
            <View style={styles.detailsContainer}>
              <ThemedText style={[styles.detailText, { color: subtleTextColor }]}>
                {classType.charAt(0).toUpperCase() + classType.slice(1)} • {section}
                {group && ` • ${group}`}
              </ThemedText>
            </View>
            <View style={[styles.attendanceChip, { backgroundColor: getAttendanceColor(attendanceStatus) }]}>
              <ThemedText style={styles.chipText}>
                {getAttendanceText(attendanceStatus)}
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 16,
    marginRight: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    width: 280,
    minHeight: 140,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  chipText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subjectContainer: {
    marginBottom: 12,
    gap: 4,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
  },
  detailText: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  attendanceChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 8,
  },
});
