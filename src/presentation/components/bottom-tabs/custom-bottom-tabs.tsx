import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Layout, Spinner} from '@ui-kitten/components';
import {Pressable, useWindowDimensions} from 'react-native';
import {globalColors, globalStyles} from '../../theme/styles';
import {CustomBottomTabItem} from './custom-bottom-tab-item';
import {useDriverStore, useUIStore} from '../../../store';
import {CustomIcon} from '../ui/custom-icon';
import {View} from 'react-native';

export const CustomBottomTabs = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  const {isDarkMode} = useUIStore();
  const {height, width} = useWindowDimensions();
  const {driverServiceIsActive, setDriverServiceIsActive} = useDriverStore();
  return (
    <Layout
      style={[
        {
          height: height * 0.1,
          width: width * 0.95,
          margin: 10,
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          borderRadius: 20,
          gap: 20,
          zIndex: 99999999,
          justifyContent: 'space-around',
          alignItems: 'center',

          borderWidth: 0.5,
          borderColor: !isDarkMode
            ? globalColors.neutralColors.border
            : globalColors.neutralColors.backgroundDark,
          paddingHorizontal: 20,
          backgroundColor: !isDarkMode
            ? globalColors.neutralColors.bottomTabContainerBackground
            : globalColors.neutralColors.bottomTabBackgroundDark,
        },
        globalStyles.boxShadow,
      ]}>
      {/* {!driverServiceIsActive ? (
        <Pressable
          onPress={() => setDriverServiceIsActive(!driverServiceIsActive)}
          style={{
            // position: 'absolute',
            transform: [{scale: 5}],
          }}>
          <CustomIcon white name="power" />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => setDriverServiceIsActive(!driverServiceIsActive)}
          style={{
            position: 'absolute',
            right: -40,

            transform: [{scale: 1.3}],
          }}>
          <Spinner status="basic" />
        </Pressable>
      )} */}
      {state.routes.map((route, index) => {
        return (
          <CustomBottomTabItem
            insets={insets}
            key={index}
            index={index}
            descriptors={descriptors}
            navigation={navigation}
            state={state}
            route={route}
          />
        );
      })}
    </Layout>
  );
};
