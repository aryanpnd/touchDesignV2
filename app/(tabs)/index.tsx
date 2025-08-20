import {StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/Header';
import { PrimarySection } from '@/components/PrimarySection';
import Schedule from '@/components/Schedule';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';
import { ModuleGrid } from '@/components/ModuleGrid';
import { announcements } from '@/constants/announcementsDummy';
import { modules } from '@/constants/quickLinksModules';

export default function HomeScreen() {
  const handleProfilePress = () => {
    console.log('Profile pressed - navigate to profile');
  };

  const handleNotificationPress = () => {
    console.log('Notifications pressed - navigate to notifications');
  };


  return (
    <ThemedView style={styles.container}>
      <Header
        title="Touch"
        notificationCount={150}
        profileImageUri="https://ums.lpu.in/Placements/DisplayImageforprofileupdation.aspx?mId=5GJ0%20s4sFrrrKWwV7y8ywg=="
        userInitial="A"
        onProfilePress={handleProfilePress}
        onNotificationPress={handleNotificationPress}
      />

      <ParallaxScrollView
        headerComponent={<PrimarySection />}
        headerBackgroundColor={{ light: '#f8fafc', dark: '#1f2937' }}
      >
        <Schedule />
        
        <AnnouncementBanner
          announcements={announcements}
          onViewAll={() => console.log('View all announcements pressed')}
        />

        <ModuleGrid 
          modules={modules}
          onEdit={() => console.log('Edit modules pressed')}
        />
      </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});