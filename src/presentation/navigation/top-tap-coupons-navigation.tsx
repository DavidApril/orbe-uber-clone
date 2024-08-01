import {HomeClientDeliveryScreen} from '../screens';
import {RootStackParams} from '../../interfaces';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CustomTopBar} from '../components';
import {MyCouponsScreen} from '../screens/coupons/my-coupons-tab';

const {Screen, Navigator} = createMaterialTopTabNavigator<RootStackParams>();

export const CouponsScreen = (): React.ReactElement => {
  return (
    <Navigator tabBar={props => <CustomTopBar {...props} />}>
      <Screen
        options={{
          title: 'award',
        }}
        name="CouponsScreen"
        component={CouponsScreen}
      />
      <Screen
        options={{
          title: 'archive-outline',
        }}
        name="MyCouponsScreen"
        component={MyCouponsScreen}
      />
    </Navigator>
  );
};
