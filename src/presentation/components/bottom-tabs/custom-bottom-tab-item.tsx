import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useColorScheme} from 'react-native';
import {globalColors} from '../../theme/styles';
import {CustomIcon} from '../ui/custom-icon';
import {useUIStore} from '../../../store';

interface Props {
  route: any;
  index: number;
}

export const CustomBottomTabItem = ({
  descriptors,
  navigation,
  state,
  route,
  index,
}: Props & BottomTabBarProps) => {
  const {options} = descriptors[route.key];
  const isFocused = state.index === index;
  const colorScheme = useColorScheme();
  const iconName = options.title !== undefined && options.title;
  const {isDarkMode} = useUIStore();
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

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          isFocused && iconName === 'map-outline'
            ? 'white'
            : iconName === 'map-outline'
            ? globalColors.primaryColors.primary
            : isDarkMode
            ? globalColors.neutralColors.bottomTabBackground
            : globalColors.neutralColors.bottomTabBackgroundDark,
        height: 65,
        width: 65,
        borderRadius: 100,
      }}>
      <CustomIcon
        fill={
          isFocused
            ? globalColors.primaryColors.primary
            : isDarkMode
            ? globalColors.neutralColors.bottomTabFillIcon
            : globalColors.neutralColors.bottomTabFillIconDark
        }
        name={iconName ? iconName : 'person'}
      />
    </TouchableOpacity>
  );
};
