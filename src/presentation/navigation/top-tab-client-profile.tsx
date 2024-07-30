import {CouponsScreen, MyCardsScreen, ProfileClientScreen} from '../screens';
import {RootStackParams} from '../../interfaces';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CustomTopBar} from '../components';
import {MyCouponsScreen} from '../screens/coupons/my-coupons-tab';

const {Screen, Navigator} = createMaterialTopTabNavigator<RootStackParams>();

export const TopTabClientProfileNavigation = (): React.ReactElement => {
  return (
    <Navigator
    // tabBar={props => <CustomTopBar {...props} />}
    >
      <Screen
        options={{
          title: 'award',
        }}
        name="ProfileClientScreen"
        component={ProfileClientScreen}
      />
      <Screen
        options={{
          title: 'archive-outline',
        }}
        name="MyCardsScreen"
        component={MyCardsScreen}
      />
    </Navigator>
  );
};
