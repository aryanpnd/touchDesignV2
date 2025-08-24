import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface SlideData {
  id: number;
  image: any;
  title: string;
  subtitle: string;
}

const slidesData: SlideData[] = [
  {
    id: 1,
    image: require('@/assets/images/banner1.jpg'),
    title: 'Welcome to Touch',
    subtitle: 'Your gateway to academic excellence and campus life',
  },
  {
    id: 2,
    image: require('@/assets/images/lpu-logo.png'),
    title: 'Stay Connected',
    subtitle: 'Access your timetable, assignments, and more',
  },
  {
    id: 3,
    image: require('@/assets/images/lpu-logo.png'),
    title: 'Academic Success',
    subtitle: 'Track your progress and achieve your goals',
  },
];

export default function LoginScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [regNumber, setRegNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const slideAnimation = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slidesData.length;
      setCurrentSlide(nextSlide);
      
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: nextSlide * screenWidth,
          animated: true,
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setCurrentSlide(index);
    slideAnimation.value = scrollPosition / screenWidth;
  };

  const handleLogin = () => {
    // Add login logic here
    console.log('Login pressed', { regNumber, password });
    router.replace('/(tabs)');
  };

  const handleGuestLogin = () => {
    // Add guest login logic here
    console.log('Guest login pressed');
    router.replace('/(tabs)');
  };

  const handleForgotPassword = () => {
    // Add forgot password logic here
    console.log('Forgot password pressed');
  };

  const animatedSlideStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(slideAnimation.value, [currentSlide - 1, currentSlide, currentSlide + 1], [0.7, 1, 0.7]),
      transform: [
        {
          scale: interpolate(slideAnimation.value, [currentSlide - 1, currentSlide, currentSlide + 1], [0.95, 1, 0.95])
        }
      ]
    };
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar hidden={true} />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#f78c30', '#fe7b71', '#fd8f64']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Slideshow Section */}
      <View style={styles.slideshowContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.slideshow}
        >
          {slidesData.map((slide, index) => (
            <Animated.View 
              key={slide.id} 
              style={[styles.slide, index === currentSlide && animatedSlideStyle]}
            >
              {/* <View style={styles.slideImageContainer}>
              </View> */}
                <Image source={slide.image} style={styles.slideImage} resizeMode="cover" />
              <View style={styles.slideTextContainer}>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
              </View>
            </Animated.View>
          ))}
        </ScrollView>

        {/* Slide Indicators */}
        <View style={styles.indicatorContainer}>
          {slidesData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor: index === currentSlide ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                  width: index === currentSlide ? 24 : 8,
                }
              ]}
            />
          ))}
        </View>
      </View>

      {/* Login Container with Curved Top */}
      <View style={styles.loginContainer}>
        <View style={styles.loginContent}>
          {/* Login Header */}
          <View style={styles.loginHeader}>
            <Text style={styles.loginTitle}>Welcome Back</Text>
            <Text style={styles.loginSubtitle}>Sign in to continue</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Registration Number</Text>
              <TextInput
                style={styles.input}
                value={regNumber}
                onChangeText={setRegNumber}
                placeholder="Enter your registration number"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="default"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <LinearGradient
              colors={['#f78c30', '#fe7b71']}
              style={styles.loginButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Guest Login */}
          <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f78c30',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  slideshowContainer: {
    flex: 1,
    paddingTop: 60,
  },
  slideshow: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  slideImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  slideImage: {
    width: 140,
    height: 140,
    borderRadius: 80,
  },
  slideTextContainer: {
    alignItems: 'center',
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  slideSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '400',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    gap: 8,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  loginContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    minHeight: screenHeight * 0.45,
    paddingTop: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  loginContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  inputContainer: {
    gap: 20,
    marginBottom: 16,
  },
  inputWrapper: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '400',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 20,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#f78c30',
    fontWeight: '600',
  },
  loginButton: {
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#f78c30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  guestButton: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
});
