import { Colors } from '@/constants/Colors';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const slideContent = [
  {
    image: require('../assets/images/banner1.jpg'),
  },
  {
    image: require('../assets/images/logo.png'),
  },
  {
    image: require('../assets/images/lpu-logo.png'),
  },
];

const LoginScreen = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSecureText, setIsSecureText] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const slideScrollRef = useRef<ScrollView>(null);
  const containerHeight = useRef(new Animated.Value(height * 0.6)).current;
  const autoScrollInterval = useRef<any>(null);

  // Calculate safe heights to prevent going off-screen
  const minFormHeight = height * 0.4; // Minimum 40% of screen
  const maxFormHeight = height * 0.9; // Maximum 90% of screen to keep some slideshow visible
  const defaultFormHeight = height * 0.6;
  const focusedFormHeight = Math.min(height * 0.75, maxFormHeight); // 75% or max, whichever is smaller

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setIsKeyboardVisible(true);
      // Calculate height based on keyboard height, but don't exceed maxFormHeight
      const keyboardHeight = event.endCoordinates.height;
      const targetHeight = Math.min(height - keyboardHeight + 50, maxFormHeight);
      animateContainerHeight(Math.max(targetHeight, minFormHeight));
    });
    
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
      if (!isFocused) {
        animateContainerHeight(defaultFormHeight);
      }
    });

    // Auto scroll slideshow
    startAutoScroll();

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [isFocused]);

  const startAutoScroll = () => {
    autoScrollInterval.current = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const nextSlide = (prevSlide + 1) % slideContent.length;
        slideScrollRef.current?.scrollTo({
          x: nextSlide * width,
          animated: true,
        });
        return nextSlide;
      });
    }, 3000);
  };

  const animateContainerHeight = (toValue: number) => {
    Animated.timing(containerHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (!isKeyboardVisible) {
      animateContainerHeight(focusedFormHeight);
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    if (!isKeyboardVisible) {
      animateContainerHeight(defaultFormHeight);
    }
  };

  const handleLogin = () => {
    if (!registrationNumber.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    router.replace('/(tabs)');
  };

  const handleGuestLogin = () => {
    router.replace('/(tabs)');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset link will be sent to your registered email');
  };

  const onSlideChange = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Slideshow - Only visible portion */}
      <View style={[styles.backgroundContainer, { height: height }]}>
        <ScrollView
          ref={slideScrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onSlideChange}
          style={styles.backgroundSlideshow}
        >
          {slideContent.map((slide, index) => (
            <LinearGradient
              key={index}
              colors={['#f78c30', '#fe7b71', '#fd8f64']}
              style={styles.backgroundSlide}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image source={slide.image} style={styles.backgroundImage} resizeMode="contain" />
            </LinearGradient>
          ))}
        </ScrollView>
        
        {/* Slide Indicators */}
        <View style={styles.indicatorContainer}>
          {slideContent.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlide === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Login Form Container */}
      <Animated.View style={[styles.formContainer, { height: containerHeight }]}>
        <BlurView intensity={20} tint="light" style={styles.blurContainer}>
          <ScrollView 
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.formContent}>
              {/* Login Title */}
              <Text style={styles.loginTitle}>Login</Text>
              
              {/* Registration Number Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Registration Number</Text>
                <TextInput
                  style={styles.textInput}
                  value={registrationNumber}
                  onChangeText={setRegistrationNumber}
                  placeholder="Enter your registration number"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.textInput, styles.passwordInput]}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    secureTextEntry={isSecureText}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                  <TouchableOpacity
                    onPress={() => setIsSecureText(!isSecureText)}
                    style={styles.eyeButton}
                  >
                    <Text style={styles.eyeText}>{isSecureText ? '👁️' : '👁️‍🗨️'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password and Guest Login Row */}
              <View style={styles.bottomLinksContainer}>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleGuestLogin}>
                  <Text style={styles.guestLinkText}>Guest Login</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                <LinearGradient
                  colors={[Colors.primary, Colors.secondary]}
                  style={styles.loginButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </BlurView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // Removed bottom: 0 to prevent overflow
  },
  backgroundSlideshow: {
    flex: 1,
  },
  backgroundSlide: {
    width,
    height: '100%', // Use percentage instead of fixed height
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: width * 0.6,
    height: height * 0.25, // Reduced from 0.3 to fit better
    opacity: 0.3,
  },
  indicatorContainer: {
    position: 'absolute',
    top: height * 0.12, // Adjusted position
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 24,
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    // Add minimum height to prevent issues
    minHeight: height * 0.4,
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContent: {
    padding: 24,
    paddingTop: 32,
    minHeight: height * 0.35, // Ensure minimum content height
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
  },
  eyeText: {
    fontSize: 18,
  },
  bottomLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  guestLinkText: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonGradient: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;