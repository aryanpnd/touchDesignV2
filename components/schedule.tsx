import { classSchedule } from "@/constants/classesTodayDummy";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ClassCard } from "./ClassCard";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function Schedule() {
  const textColor = useThemeColor({}, 'text');
  const subtleTextColor = useThemeColor({ light: '#666', dark: '#aaa' }, 'text');
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Sample data - replace with your actual data
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return days[today.getDay()];
  };

  // Auto-scroll to ongoing class
  useEffect(() => {
    const ongoingClassIndex = classSchedule.findIndex(classItem => classItem.status === 'ongoing');
    
    if (ongoingClassIndex !== -1 && scrollViewRef.current) {
      // Calculate scroll position: card width (280) + margin (16) = 296 per card
      const scrollPosition = ongoingClassIndex * 296;
      
      // Add a slight delay to ensure the component is fully rendered
      const timer = setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: scrollPosition,
          animated: true,
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

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
        ref={scrollViewRef}
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
    paddingBottom:0,
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
    paddingBottom: 16,
  },
});