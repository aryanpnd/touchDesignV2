import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Category, getRecommendedModules, Module, searchInModules, searchModules } from '@/constants/searchModules';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface ModuleItemProps {
  module: Module;
  category?: Category;
  onPress: (module: Module) => void;
  isHorizontal?: boolean;
}

interface CategorySectionProps {
  category: Category;
  onModulePress: (module: Module) => void;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ module, category, onPress, isHorizontal = false }) => {
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1F2937' }, 'background');
  const borderColor = useThemeColor({ light: '#E5E7EB', dark: '#374151' }, 'icon');
  const textColor = useThemeColor({}, 'text');
  const subtleTextColor = useThemeColor({ light: '#6B7280', dark: '#9CA3AF' }, 'text');
  const iconColor = useThemeColor({ light: '#f78c30', dark: '#f78c30' }, 'icon');
  
  return (
    <TouchableOpacity
      style={[
        isHorizontal ? styles.horizontalModuleItem : styles.moduleItem, 
        { backgroundColor, borderColor }
      ]}
      onPress={() => onPress(module)}
      activeOpacity={0.7}
    >
      {/* Module Icon */}
      {module.icon && (
        // <View style={[styles.moduleIconContainer, category && { backgroundColor: category.color + '10' }]}>
        <View style={[styles.moduleIconContainer, category && { backgroundColor: "#f78c30" + '10' }]}>
          <Ionicons 
            name={module.icon as any} 
            size={isHorizontal ? 20 : 24} 
            color={category ? category.color : iconColor} 
          />
        </View>
      )}
      
      <View style={[styles.moduleHeader, isHorizontal && styles.horizontalModuleHeader]}>
        <View style={[styles.moduleInfo, isHorizontal && styles.horizontalModuleInfo]}>
          <ThemedText 
            style={[
              isHorizontal ? styles.horizontalModuleName : styles.moduleName, 
              { color: textColor }
            ]}
            numberOfLines={isHorizontal ? 2 : undefined}
          >
            {module.name}
          </ThemedText>
          {module.description && !isHorizontal && (
            <ThemedText style={[styles.moduleDescription, { color: subtleTextColor }]}>
              {module.description}
            </ThemedText>
          )}
        </View>
        {category && !isHorizontal && (
          <View style={[styles.categoryTag, { backgroundColor: category.color + '20' }]}>
            <Text style={[styles.categoryEmoji]}>{category.icon}</Text>
          </View>
        )}
      </View>
      {/* {module.priority === 'high' && !isHorizontal && (
        <View style={styles.priorityBadge}>
          <Text style={styles.priorityText}>High Priority</Text>
        </View>
      )} */}
    </TouchableOpacity>
  );
};

const CategorySection: React.FC<CategorySectionProps> = ({ category, onModulePress }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const backgroundColor = useThemeColor({ light: '#F9FAFB', dark: '#111827' }, 'background');
  const borderColor = useThemeColor({ light: '#E5E7EB', dark: '#374151' }, 'icon');
  const textColor = useThemeColor({}, 'text');
  const subtleTextColor = useThemeColor({ light: '#6B7280', dark: '#9CA3AF' }, 'text');
  
  return (
    <View style={[styles.categorySection, { backgroundColor, borderColor }]}>
      <TouchableOpacity 
        style={styles.categoryHeader}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        {/* <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}> */}
        <View style={[styles.categoryIcon, { backgroundColor: "#f78c30" + '40' }]}>
          <Text style={styles.categoryEmoji}>{category.icon}</Text>
        </View>
        <ThemedText style={[styles.categoryName, { color: textColor }]}>
          {category.name}
        </ThemedText>
        {/* <View style={[styles.moduleCount, { backgroundColor: category.color + '20' }]}> */}
        <View style={[styles.moduleCount, { backgroundColor: "#f78c30" + '20' }]}>
          {/* <Text style={[styles.moduleCountText, { color: category.color }]}> */}
          <Text style={[styles.moduleCountText, { color: "#f78c30" }]}>
            {category.modules.length}
          </Text>
        </View>
        <Ionicons 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={20} 
          color={subtleTextColor}
          style={styles.expandIcon}
        />
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.modulesGrid}>
          {category.modules.map((module) => (
            <ModuleItem
              key={module.id}
              module={module}
              onPress={onModulePress}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({ light: '#9CA3AF', dark: '#6B7280' }, 'text');
  const searchBackgroundColor = useThemeColor({ light: '#F3F4F6', dark: '#374151' }, 'background');
  const borderColor = useThemeColor({ light: '#E5E7EB', dark: '#4B5563' }, 'icon');

  const searchResults = useMemo(() => {
    return searchInModules(searchQuery);
  }, [searchQuery]);

  const recommendedModules = useMemo(() => {
    return getRecommendedModules();
  }, []);

  const handleModulePress = (module: Module) => {
    console.log('Module pressed:', module.name);
    // TODO: Navigate to module or perform action
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <ThemedText style={[styles.screenTitle, { color: textColor }]}>
          Search
        </ThemedText>
        <View style={[styles.searchContainer, { backgroundColor: searchBackgroundColor, borderColor }]}>
          <Ionicons 
            name="search" 
            size={20} 
            color={placeholderColor} 
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Search modules, categories..."
            placeholderTextColor={placeholderColor}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color={placeholderColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {searchQuery.length > 0 ? (
          // Search Results
          <View style={styles.searchResults}>
            <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
              Search Results ({searchResults.length})
            </ThemedText>
            {searchResults.length > 0 ? (
              <View style={styles.resultsContainer}>
                {searchResults.map((result, index) => (
                  <ModuleItem
                    key={`${result.category.id}-${result.module.id}-${index}`}
                    module={result.module}
                    category={result.category}
                    onPress={handleModulePress}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.noResults}>
                <Ionicons name="search" size={48} color={placeholderColor} />
                <ThemedText style={[styles.noResultsText, { color: placeholderColor }]}>
                  No modules found for "{searchQuery}"
                </ThemedText>
                <ThemedText style={[styles.noResultsSubtext, { color: placeholderColor }]}>
                  Try searching with different keywords
                </ThemedText>
              </View>
            )}
          </View>
        ) : (
          // Default Content
          <>
            {/* Recommended Section - Horizontal Scrollable */}
            <View style={styles.recommendedSection}>
              <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
                Recommended
              </ThemedText>
              <ThemedText style={[styles.sectionSubtitle, { color: placeholderColor }]}>
                Most important and frequently used modules
              </ThemedText>
              
              {/* Two-row horizontal scroll */}
              <View style={styles.recommendedGrid}>
                {/* First row */}
                <FlatList
                  data={recommendedModules.slice(0, Math.ceil(recommendedModules.length / 2))}
                  renderItem={({ item }) => (
                    <ModuleItem
                      module={item}
                      onPress={handleModulePress}
                      isHorizontal={true}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                  ItemSeparatorComponent={() => <View style={styles.horizontalSeparator} />}
                />
                
                {/* Second row */}
                <FlatList
                  data={recommendedModules.slice(Math.ceil(recommendedModules.length / 2))}
                  renderItem={({ item }) => (
                    <ModuleItem
                      module={item}
                      onPress={handleModulePress}
                      isHorizontal={true}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                  ItemSeparatorComponent={() => <View style={styles.horizontalSeparator} />}
                />
              </View>
            </View>

            {/* All Categories */}
            <View style={styles.categoriesSection}>
              <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
                All Modules
              </ThemedText>
              <ThemedText style={[styles.sectionSubtitle, { color: placeholderColor }]}>
                Browse all available modules by category
              </ThemedText>
              {searchModules.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  onModulePress={handleModulePress}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
  },
  clearButton: {
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 16,
  },
  recommendedSection: {
    marginBottom: 32,
  },
  categoriesSection: {
    marginBottom: 20,
  },
  categorySection: {
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryEmoji: {
    fontSize: 18,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  moduleCount: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  moduleCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  expandIcon: {
    marginLeft: 4,
  },
  modulesGrid: {
    gap: 8,
    marginTop: 16,
  },
  // Recommended Grid Styles
  recommendedGrid: {
    gap: 12,
  },
  horizontalList: {
    paddingLeft: 0,
    gap: 12,
  },
  horizontalSeparator: {
    width: 12,
  },
  // Module Item Styles
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  horizontalModuleItem: {
    width: screenWidth * 0.5,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1,
  },
  horizontalModuleHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  moduleInfo: {
    flex: 1,
    marginRight: 12,
  },
  horizontalModuleInfo: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 0,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  horizontalModuleName: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  moduleDescription: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
  },
  categoryTag: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityBadge: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#EF4444',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  searchResults: {
    marginBottom: 20,
  },
  resultsContainer: {
    gap: 8,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 4,
  },
  noResultsSubtext: {
    fontSize: 14,
    fontWeight: '400',
  },
});
