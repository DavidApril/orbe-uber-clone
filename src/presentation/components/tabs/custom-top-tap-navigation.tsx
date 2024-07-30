import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {TouchableOpacity, View} from 'react-native';
import {CustomIcon} from '../ui/custom-icon';
import {neutralColors, primaryColors} from '../../theme/styles';
import {useUIStore} from '../../../store';

export const CustomTopBar = ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) => {

  const {isDarkMode} = useUIStore();
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const {isDarkMode} = useUIStore();
        const iconName = options.title !== undefined && options.title;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              padding: 15,
              backgroundColor: isDarkMode
                ? neutralColors.backgroundDark
                : neutralColors.background,
            }}>
            <View
              style={{
                backgroundColor: isDarkMode
                  ? neutralColors.backgroundDarkAlpha
                  : neutralColors.backgroundAlpha,
                padding: 10,
              }}>
              <CustomIcon fill={primaryColors.primary} name={iconName || 'award'} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
