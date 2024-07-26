import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useColorScheme} from 'react-native';
import {globalColors} from '../../theme/styles';
import {CustomIcon} from '../ui/custom-icon';

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
          colorScheme === 'light'
            ? isFocused
              ? globalColors.neutralColors.bottomTabFocusBackground
              : globalColors.neutralColors.bottomTabFocusBackgroundDark
              ? globalColors.neutralColors.bottomTabBackground
              : globalColors.neutralColors.bottomTabBackgroundDark
            : '',
        height: 65,
        width: 65,
        borderRadius: 100,
      }}>
      <CustomIcon
        fill={isFocused ? globalColors.primaryColors.primary : '#222'}
        name={iconName ? iconName : 'person'}
      />
      {/* <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{'tab'}</Text> */}
    </TouchableOpacity>
  );
};
