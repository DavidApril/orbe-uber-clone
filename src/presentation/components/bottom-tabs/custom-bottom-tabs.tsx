import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Layout} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {globalColors, globalStyles} from '../../theme/styles';
import {CustomBottomTabItem} from './custom-bottom-tab-item';
import {useUIStore} from '../../../store';

export const CustomBottomTabs = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  const {isDarkMode} = useUIStore();
  const {height} = useWindowDimensions();
  return (
    <Layout
      style={[
        {
          height: height * 0.1,
          margin: 10,
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          borderRadius: 20,
          gap: 20,
          justifyContent: 'space-around',
          alignItems: 'center',
          borderWidth: 0.5,
          borderColor: !isDarkMode
            ? globalColors.neutralColors.border
            : globalColors.neutralColors.backgroundDark,
          paddingHorizontal: 20,
          backgroundColor: !isDarkMode
            ? globalColors.neutralColors.bottomTabContainerBackground
            : globalColors.neutralColors.bottomTabContainerBackgroundDark,
        },
        globalStyles.boxShadow,
      ]}>
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
