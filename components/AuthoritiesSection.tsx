import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export interface Authority {
  id: string;
  profilePicture: any;
  roleToYou: string;
  name: string;
  designation: string;
  branch: string;
  email: string;
  phone: string;
}

interface AuthoritiesSectionProps {
  authorities: Authority[];
  onBookAppointment?: (authority: Authority) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;
const CARD_MARGIN = 16;

function AuthorityCard({ 
  authority, 
  onBookAppointment 
}: { 
  authority: Authority; 
  onBookAppointment?: (authority: Authority) => void;
}) {
  const textColor = useThemeColor({}, 'text');
  const subtleTextColor = useThemeColor({ light: '#8E8E93', dark: '#8E8E8F' }, 'text');
  const cardBackground = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');
  const borderColor = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'icon');
  const buttonBackground = useThemeColor({ light: '#fd8f64ff', dark: '#fe7b71' }, 'tint');
  const buttonTextColor = '#FFFFFF';
  const chipBackground = useThemeColor({ light: '#f0f0f0', dark: '#2C2C2E' }, 'background');
  const chipBorderColor = useThemeColor({ light: '#e0e0e0', dark: '#3C3C3E' }, 'icon');

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${authority.email}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${authority.phone}`);
  };

  const handleBookAppointment = () => {
    onBookAppointment?.(authority);
  };

  return (
    <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
      {/* Header with Profile Picture and Basic Info */}
      <View style={styles.cardHeader}>
        <Image source={authority.profilePicture} style={styles.profilePicture} />
        <View style={styles.headerInfo}>
          <View style={[styles.roleChip, { backgroundColor: chipBackground, borderColor: chipBorderColor }]}>
            <ThemedText type="subtitleSmall" style={[styles.roleText, { color: subtleTextColor }]}>
              {authority.roleToYou}
            </ThemedText>
          </View>
          <ThemedText type="titleSmall" style={[styles.name, { color: textColor }]}>
            {authority.name}
          </ThemedText>
        </View>
      </View>

      {/* Designation and Branch */}
      <View style={styles.cardBody}>
        <ThemedText type="defaultSemiBold" style={[styles.designation, { color: textColor }]}>
          {authority.designation}
        </ThemedText>
        <ThemedText type="subtitleSmall" style={[styles.branch, { color: subtleTextColor }]}>
          {authority.branch}
        </ThemedText>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
          <Ionicons name="mail-outline" size={16} color={subtleTextColor} />
          <ThemedText type="subtitleSmall" style={[styles.contactText, { color: subtleTextColor }]} numberOfLines={1}>
            {authority.email}
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
          <Ionicons name="call-outline" size={16} color={subtleTextColor} />
          <ThemedText type="subtitleSmall" style={[styles.contactText, { color: subtleTextColor }]}>
            {authority.phone}
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Book Appointment Button */}
      <TouchableOpacity 
        activeOpacity={0.7}
        style={[styles.appointmentButton, { backgroundColor: buttonBackground }]}
        onPress={handleBookAppointment}
      >
        <Ionicons name="calendar-outline" size={18} color={buttonTextColor} />
        <ThemedText type="defaultSemiBold" style={[styles.buttonText, { color: buttonTextColor }]}>
          Book Appointment
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

export function AuthoritiesSection({ authorities, onBookAppointment }: AuthoritiesSectionProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleTextColor = useThemeColor({ light: '#8E8E93', dark: '#8E8E8F' }, 'text');

  return (
    <ThemedView style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.headerLeft}>
          <ThemedText type="title" style={[styles.sectionTitle, { color: textColor }]}>
            Authorities
          </ThemedText>
          <ThemedText type="subtitleSmall" style={[styles.sectionSubtitle, { color: subtleTextColor }]}>
            Connect with your mentors and department heads
          </ThemedText>
        </View>
      </View>

      {/* Horizontal Scrolling Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        snapToInterval={CARD_WIDTH + CARD_MARGIN}
        decelerationRate="fast"
      >
        {authorities.map((authority, index) => (
          <View
            key={authority.id}
            style={[
              styles.cardContainer,
              { marginLeft: index === 0 ? CARD_MARGIN : 0 }
            ]}
          >
            <AuthorityCard
              authority={authority}
              onBookAppointment={onBookAppointment}
            />
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  scrollContainer: {
    paddingRight: CARD_MARGIN,
  },
  cardContainer: {
    marginRight: CARD_MARGIN,
    paddingBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    padding: 16, // Reduced from 20
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12, // Reduced from 16
  },
  profilePicture: {
    width: 50, // Reduced from 60
    height: 50, // Reduced from 60
    borderRadius: 25, // Reduced from 30
    marginRight: 12, // Reduced from 16
  },
  headerInfo: {
    flex: 1,
  },
  roleChip: {
    paddingHorizontal: 10, // Reduced from 12
    paddingVertical: 4, // Reduced from 6
    borderRadius: 14, // Reduced from 16
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 6, // Reduced from 8
  },
  roleText: {
    fontSize: 11, // Reduced from 12
    fontWeight: '600',
  },
  name: {
    fontSize: 16, // Reduced from 18
    fontWeight: '700',
  },
  cardBody: {
    marginBottom: 12, // Reduced from 16
  },
  designation: {
    fontSize: 15, // Reduced from 16
    fontWeight: '600',
    marginBottom: 2, // Reduced from 4
  },
  branch: {
    fontSize: 13, // Reduced from 14
    opacity: 0.8,
  },
  contactSection: {
    marginBottom: 16, // Reduced from 20
    gap: 6, // Reduced from 8
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6, // Reduced from 8
  },
  contactText: {
    fontSize: 13, // Reduced from 14
    flex: 1,
  },
  appointmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10, // Reduced from 12
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 6, // Reduced from 8
  },
  buttonText: {
    fontSize: 15, // Reduced from 16
    fontWeight: '600',
  },
});