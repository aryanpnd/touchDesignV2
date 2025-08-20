import { StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ClassCard } from "./ClassCard";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Schedule() {
  const textColor = useThemeColor({}, 'text');
  const subtleTextColor = useThemeColor({ light: '#666', dark: '#aaa' }, 'text');
  
  // Sample data - replace with your actual data
  const classSchedule = [
    {
      classTime: "09:00 - 10:00 AM",
      subjectCode: "CSE224",
      subjectName: "Android App Development",
      location: "28-506",
      classType: "lecture" as const,
      section: "K22UR",
      group: "Group 1",
      status: "completed" as const,
      attendanceStatus: "present" as const,
    },
    {
      classTime: "10:00 - 11:00 AM",
      subjectCode: "CSE412",
      subjectName: "Machine Learning",
      location: "28-402",
      classType: "practical" as const,
      section: "K22UR",
      group: "Group 2",
      status: "ongoing" as const,
      attendanceStatus: "not marked" as const,
    },
    {
      classTime: "11:30 - 12:30 PM",
      subjectCode: "CSE301",
      subjectName: "Database Management Systems",
      location: "28-305",
      classType: "lecture" as const,
      section: "K22UR",
      status: "upcoming" as const,
      attendanceStatus: "not marked" as const,
    },
    {
      classTime: "02:00 - 03:00 PM",
      subjectCode: "CSE401",
      subjectName: "Software Engineering",
      location: "28-201",
      classType: "lecture" as const,
      section: "K22UR",
      status: "upcoming" as const,
      attendanceStatus: "not marked" as const,
    },
  ];

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return days[today.getDay()];
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={[styles.title, { color: textColor }]}>
          Today's Schedule
        </ThemedText>
        <ThemedView style={styles.headerInfo}>
          <ThemedText style={[styles.dayText, { color: subtleTextColor }]}>
            {getCurrentDay()}
          </ThemedText>
          <ThemedView style={styles.countBadge}>
            <ThemedText style={[styles.countText, { color: textColor }]}>
              {classSchedule.length}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        decelerationRate="fast"
        snapToInterval={296} // card width + margin
        snapToAlignment="start"
      >
        {classSchedule.map((classItem, index) => (
          <ClassCard
            key={index}
            classTime={classItem.classTime}
            subjectCode={classItem.subjectCode}
            subjectName={classItem.subjectName}
            location={classItem.location}
            classType={classItem.classType}
            section={classItem.section}
            group={classItem.group}
            status={classItem.status}
            attendanceStatus={classItem.attendanceStatus}
            onPress={() => console.log(`Pressed class: ${classItem.subjectName}`)}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  countBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  scrollContainer: {
    paddingLeft: 20,
    paddingRight: 4,
  },
});