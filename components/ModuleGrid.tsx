import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS,
    withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

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

function ModuleCard({ module, isListView }: { module: Module; isListView: boolean }) {
    const textColor = useThemeColor({}, 'text');
    const subtleTextColor = useThemeColor({ light: '#8E8E93', dark: '#8E8E8F' }, 'text');
    const cardBackground = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');
    const borderColor = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'icon');
    const chipBackground = useThemeColor({ light: '#007AFF', dark: '#0A84FF' }, 'tint');
    const chipTextColor = useThemeColor({ light: '#FFFFFF', dark: '#FFFFFF' }, 'background');

    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    const hasValue = module.value !== undefined && module.value !== null && module.value !== '';

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.96, {
            damping: 20,
            stiffness: 300,
        });
        opacity.value = withTiming(0.8, { duration: 100 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 20,
            stiffness: 300,
        });
        opacity.value = withTiming(1, { duration: 100 });
    };

    const handlePress = () => {
        if (module.onPress) {
            runOnJS(module.onPress)();
        }
    };

    return (
        <AnimatedTouchable
            style={[
                isListView ? styles.listCard : styles.gridCard,
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
            {/* Value Chip - Top Right */}
            {hasValue && (
                <View style={[styles.valueChip, { backgroundColor: chipBackground }]}>
                    <ThemedText style={[styles.chipText, { color: chipTextColor }]}>
                        {module.value}
                    </ThemedText>
                </View>
            )}

            <View style={[
                isListView ? styles.listCardContent : styles.gridCardContent,
                // Center content when no value chip in grid view
                !isListView && !hasValue && styles.gridCardContentCentered
            ]}>
                {/* Icon Container */}
                <View style={[
                    isListView ? styles.listIconContainer : styles.gridIconContainer,
                    // Center icon when no value chip in grid view
                    !isListView && !hasValue && styles.gridIconContainerCentered
                ]}>
                    <Image
                        source={module.icon}
                        style={isListView ? styles.listIcon : styles.gridIcon}
                        resizeMode="contain"
                    />
                </View>

                {/* Text Container */}
                <View style={[
                    styles.textContainer,
                    // Center text when no value chip in grid view
                    !isListView && !hasValue && styles.textContainerCentered
                ]}>
                    <ThemedText style={[
                        isListView ? styles.listModuleTitle : styles.gridModuleTitle,
                        { color: textColor },
                        // Center text when no value chip in grid view
                        !isListView && !hasValue && styles.gridModuleTitleCentered
                    ]}>
                        {module.title}
                    </ThemedText>
                </View>

                {/* Arrow for list view */}
                {isListView && (
                    <View style={styles.arrowContainer}>
                        <Ionicons
                            name="chevron-forward"
                            size={16}
                            color={subtleTextColor}
                        />
                    </View>
                )}
            </View>
        </AnimatedTouchable>
    );
}

export function ModuleGrid({ modules, onEdit }: ModuleGridProps) {
    const [isListView, setIsListView] = useState(false);
    const textColor = useThemeColor({}, 'text');
    const subtleTextColor = useThemeColor({ light: '#8E8E93', dark: '#8E8E8F' }, 'text');
    const buttonBackground = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'icon');

    const { width: screenWidth } = Dimensions.get('window');
    const gridPadding = 32; // Total horizontal padding
    const cardGap = 16;
    const cardWidth = (screenWidth - gridPadding - cardGap) / 2; // 2 columns with gap

    const layoutTransition = useSharedValue(0);

    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(1, { duration: 300 }),
        };
    });

    const toggleLayout = () => {
        layoutTransition.value = withTiming(isListView ? 0 : 1, { duration: 300 });
        setIsListView(!isListView);
    };

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
                    Quick Access
                </ThemedText>

                <View style={styles.headerActions}>
                    {/* Layout Toggle Button */}
                    <TouchableOpacity
                        onPress={toggleLayout}
                        style={[styles.actionButton, { backgroundColor: buttonBackground }]}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={isListView ? "grid" : "list"}
                            size={16}
                            color={subtleTextColor}
                        />
                    </TouchableOpacity>

                    {/* Edit Button */}
                    <TouchableOpacity
                        onPress={onEdit}
                        style={[styles.actionButton, { backgroundColor: buttonBackground }]}
                        activeOpacity={0.7}
                    >
                        <ThemedText style={[styles.editButtonText, { color: subtleTextColor }]}>
                            Edit
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Content */}
            <Animated.View style={[animatedContainerStyle]}>
                {isListView ? (
                    <View style={styles.listContainer}>
                        {modules.map((module) => (
                            <View key={module.id} style={styles.listItemWrapper}>
                                <ModuleCard module={module} isListView={true} />
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.gridContainer}>
                        {modules.map((module) => (
                            <View
                                key={module.id}
                                style={[styles.gridItemWrapper, { width: cardWidth }]}
                            >
                                <ModuleCard module={module} isListView={false} />
                            </View>
                        ))}
                    </View>
                )}
            </Animated.View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: -0.4,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButtonText: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.1,
    },

    // Grid Layout
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    gridItemWrapper: {
        marginBottom: 16,
    },
    gridCard: {
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 4,
        minHeight: 120,
        position: 'relative',
    },
    gridCardContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    gridCardContentCentered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridIconContainer: {
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    gridIconContainerCentered: {
        alignItems: 'center',
        marginBottom: 12,
    },
    gridIcon: {
        width: 32,
        height: 32,
    },
    gridModuleTitle: {
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: -0.1,
        lineHeight: 20,
    },
    gridModuleTitleCentered: {
        textAlign: 'center',
    },

    // List Layout
    listContainer: {
        paddingHorizontal: 20,
        gap: 12,
    },
    listItemWrapper: {
        // No additional styling needed
    },
    listCard: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
        position: 'relative',
    },
    listCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    listIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    listIcon: {
        width: 28,
        height: 28,
    },
    listModuleTitle: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: -0.1,
        flex: 1,
    },
    arrowContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Shared Styles
    textContainer: {
        flex: 1,
    },
    textContainerCentered: {
        flex: 0,
        alignItems: 'center',
    },
    valueChip: {
        position: 'absolute',
        top: 12,
        right: 12,
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    chipText: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
});