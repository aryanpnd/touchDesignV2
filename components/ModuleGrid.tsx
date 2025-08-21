import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Layout,
    runOnJS,
    SlideInLeft,
    SlideInUp,
    SlideOutDown,
    SlideOutRight,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

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
    onReorder?: (newOrder: Module[]) => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function ModuleCard({ 
    module, 
    isListView, 
    index, 
    isDragging, 
    onDragStart, 
    onDragEnd 
}: { 
    module: Module; 
    isListView: boolean; 
    index: number;
    isDragging?: boolean;
    onDragStart?: () => void;
    onDragEnd?: () => void;
}) {
    const textColor = useThemeColor({}, 'text');
    const subtleTextColor = useThemeColor({ light: '#8E8E93', dark: '#8E8E8F' }, 'text');
    const cardBackground = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');
    const borderColor = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'icon');
    const chipBackground = useThemeColor({ light: '#f78c30', dark: '#f78c30' }, 'tint');
    const chipTextColor = useThemeColor({ light: '#FFFFFF', dark: '#FFFFFF' }, 'background');

    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const zIndex = useSharedValue(0);
    const hasValue = module.value !== undefined && module.value !== null && module.value !== '';

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value },
                { translateX: translateX.value },
                { translateY: translateY.value }
            ],
            opacity: opacity.value,
            zIndex: zIndex.value,
        };
    });

    // Long press gesture for drag initiation
    const longPressGesture = Gesture.LongPress()
        .minDuration(300)
        .onStart(() => {
            // Add haptic feedback for drag start
            if (Platform.OS === 'ios') {
                runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
            } else {
                runOnJS(Haptics.selectionAsync)();
            }
            
            if (onDragStart) {
                runOnJS(onDragStart)();
            }
            scale.value = withSpring(1.05);
            opacity.value = withTiming(0.9);
            zIndex.value = 1000;
        });

    // Pan gesture for dragging
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            if (isDragging) {
                translateX.value = event.translationX;
                translateY.value = event.translationY;
            }
        })
        .onEnd(() => {
            if (isDragging && onDragEnd) {
                runOnJS(onDragEnd)();
            }
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
            scale.value = withSpring(1);
            zIndex.value = 0;
        });

    const composedGesture = Gesture.Simultaneous(longPressGesture, panGesture);

    const handlePressIn = () => {
        scale.value = withSpring(0.98, {
            damping: 25,
            stiffness: 200,
        });
        opacity.value = withTiming(0.9, { duration: 150 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 25,
            stiffness: 200,
        });
        opacity.value = withTiming(1, { duration: 150 });
    };

    const handlePress = () => {        
        if (module.onPress) {
            runOnJS(module.onPress)();
        }
    };

    return (
        <GestureDetector gesture={composedGesture}>
            <AnimatedTouchable
                entering={isListView 
                    ? SlideInLeft.delay(index * 80).duration(500)
                    : SlideInUp.delay(index * 100).duration(600)
                }
                exiting={isListView 
                    ? SlideOutRight.duration(400)
                    : SlideOutDown.duration(400)
                }
                layout={Layout.springify().damping(20).stiffness(150).duration(600)}
                style={[
                    isListView ? styles.listCard : styles.gridCard,
                    {
                        backgroundColor: cardBackground,
                        borderColor: borderColor,
                    },
                    animatedStyle,
                    isDragging && styles.draggingCard,
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

            {/* Drag Indicator */}
            {isDragging && (
                <View style={styles.dragIndicator}>
                    <Ionicons
                        name="move"
                        size={16}
                        color="#ffffff"
                    />
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
        </GestureDetector>
    );
}

export function ModuleGrid({ modules, onEdit, onReorder }: ModuleGridProps) {
    const [isListView, setIsListView] = useState(false);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [moduleOrder, setModuleOrder] = useState(modules);
    const textColor = useThemeColor({}, 'text');
    const subtleTextColor = useThemeColor({ light: '#8E8E93', dark: '#8E8E8F' }, 'text');
    const buttonBackground = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'icon');

    const { width: screenWidth } = Dimensions.get('window');
    const gridPadding = 32; // Total horizontal padding
    const cardGap = 16;
    const cardWidth = (screenWidth - gridPadding - cardGap) / 2; // 2 columns with gap

    const layoutTransition = useSharedValue(0);

    useEffect(() => {
        setModuleOrder(modules);
    }, [modules]);

    const toggleLayout = () => {
        layoutTransition.value = withTiming(isListView ? 0 : 1, { duration: 600 });
        setIsListView(!isListView);
    };

    const handleDragStart = (index: number) => {
        setDraggingIndex(index);
    };

    const handleDragEnd = () => {
        setDraggingIndex(null);
        if (onReorder) {
            onReorder(moduleOrder);
        }
    };

    const moveModule = (fromIndex: number, toIndex: number) => {
        const newOrder = [...moduleOrder];
        const [movedItem] = newOrder.splice(fromIndex, 1);
        newOrder.splice(toIndex, 0, movedItem);
        setModuleOrder(newOrder);
    };

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
                <View style={styles.header}>
                    <View>
                        <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
                            Quick Access
                        </ThemedText>
                        <ThemedText style={[styles.sectionSubtitle, { color: subtleTextColor }]}>
                            Long press to rearrange
                        </ThemedText>
                    </View>                <View style={styles.headerActions}>
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
            <View>
                {isListView ? (
                    <View style={styles.listContainer}>
                        {moduleOrder.map((module, index) => (
                            <View key={`list-${module.id}`} style={styles.listItemWrapper}>
                                <ModuleCard 
                                    module={module} 
                                    isListView={true} 
                                    index={index}
                                    isDragging={draggingIndex === index}
                                    onDragStart={() => handleDragStart(index)}
                                    onDragEnd={handleDragEnd}
                                />
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.gridContainer}>
                        {moduleOrder.map((module, index) => (
                            <View
                                key={`grid-${module.id}`}
                                style={[styles.gridItemWrapper, { width: cardWidth }]}
                            >
                                <ModuleCard 
                                    module={module} 
                                    isListView={false} 
                                    index={index}
                                    isDragging={draggingIndex === index}
                                    onDragStart={() => handleDragStart(index)}
                                    onDragEnd={handleDragEnd}
                                />
                            </View>
                        ))}
                    </View>
                )}
            </View>
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
    sectionSubtitle: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: 2,
        opacity: 0.7,
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
    draggingCard: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
    dragIndicator: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 15,
    },
});