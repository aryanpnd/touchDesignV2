import { AnnouncementBanner } from '@/components/AnnouncementBanner';
import { Header } from '@/components/Header';
import { ModuleGrid } from '@/components/ModuleGrid';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { PrimarySection } from '@/components/PrimarySection';
import Schedule from '@/components/Schedule';
import { ThemedView } from '@/components/ThemedView';
import { announcements } from '@/constants/announcementsDummy';
import { modules } from '@/constants/quickLinksModules';
import { StyleSheet } from 'react-native';

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
        logoSource={require('@/assets/images/lpu-logo.png')}
        onNotificationPress={handleNotificationPress}
      />

      <ParallaxScrollView
        headerComponent={
          <PrimarySection />
        }
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