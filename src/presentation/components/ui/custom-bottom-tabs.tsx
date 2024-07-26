import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Layout} from '@ui-kitten/components';
import React from 'react';
import {useColorScheme, useWindowDimensions} from 'react-native';
import {globalColors} from '../../theme/styles';
import {CustomIcon} from './custom-icon';

export const CustomBottomTabs = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const colorScheme = useColorScheme();
  const {height} = useWindowDimensions();
  return (
    <Layout
      style={{
        height: height * 0.1,
        margin: 10,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        borderRadius: 20,
        gap: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor:
          colorScheme === 'light'
            ? globalColors.neutralColors.bottomTabContainerBackground
            : globalColors.neutralColors.bottomTabContainerBackgroundDark,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const iconName = options.title !== undefined && options.title;

        console.log({iconName});

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
      })}
    </Layout>
  );
};
