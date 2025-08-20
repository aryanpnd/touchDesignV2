import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS
} from 'react-native-reanimated';

interface Module {
    id: string;
    title: string;
    icon: any; // require() import
    value?: string | number;
    onPress?: () => void;
}

interface ModuleGridProps {
    modules: Module[];
    onEdit?: () => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function ModuleCard({ module }: { module: Module }) {
    const textColor = useThemeColor({}, 'text');
    const subtleTextColor = useThemeColor({ light: '#666', dark: '#aaa' }, 'text');
    const cardBackground = useThemeColor({ light: '#ffffff', dark: '#1f1f1f' }, 'background');
    const borderColor = useThemeColor({ light: '#e5e5e5', dark: '#333' }, 'icon');

    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.95, {
            damping: 15,
            stiffness: 300,
        });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 15,
            stiffness: 300,
        });
    };

    const handlePress = () => {
        if (module.onPress) {
            runOnJS(module.onPress)();
        }
    };

    return (
        <AnimatedTouchable
            style={[
                styles.card,
                {
                    backgroundColor: cardBackground,
                    borderColor: borderColor,
                },
                animatedStyle,
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            activeOpacity={1}
        >
            <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                    <Image source={module.icon} style={styles.icon} resizeMode="contain" />
                </View>

                <View style={styles.textContainer}>
                    <ThemedText style={[styles.moduleTitle, { color: textColor }]}>
                        {module.title}
                    </ThemedText>

                    {module.value && (
                        <ThemedText style={[styles.moduleValue, { color: subtleTextColor }]}>
                            {module.value}
                        </ThemedText>
                    )}
                </View>
            </View>
        </AnimatedTouchable>
    );
}

export function ModuleGrid({ modules, onEdit }: ModuleGridProps) {
    const textColor = useThemeColor({}, 'text');
    const subtleTextColor = useThemeColor({ light: '#666', dark: '#aaa' }, 'text');

    const { width: screenWidth } = Dimensions.get('window');
    const gridPadding = 40; // Total horizontal padding (20px each side)
    const cardGap = 12;
    const cardWidth = (screenWidth - gridPadding - cardGap) / 2; // 2 columns with gap

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
                    Quick Access
                </ThemedText>
                <TouchableOpacity onPress={onEdit} activeOpacity={0.7}>
                    <ThemedText style={[styles.editButton, { color: subtleTextColor }]}>
                        Edit
                    </ThemedText>
                </TouchableOpacity>
            </View>

            {/* Grid */}
            <View style={styles.grid}>
                {modules.map((module, index) => (
                    <View
                        key={module.id}
                        style={[styles.cardWrapper, { width: cardWidth }]}
                    >
                        <ModuleCard module={module} />
                    </View>
                ))}
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: -0.2,
    },
    editButton: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.1,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    cardWrapper: {
        marginBottom: 12,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        minHeight: 100,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    iconContainer: {
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    icon: {
        width: 28,
        height: 28,
        tintColor: undefined, // Allow original colors
    },
    textContainer: {
        gap: 4,
    },
    moduleTitle: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.1,
        textTransform: 'capitalize',
    },
    moduleValue: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.2,
    },
});
