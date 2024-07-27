import {useWindowDimensions} from 'react-native';
import {Tab, TabView} from '@ui-kitten/components';
import {CouponsScreen} from '../screens';
import {MyCouponsTab} from '../screens/coupons/my-coupons-tab';
import { useState } from 'react';

export const TopTapCouponsNavigation = (): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {height} = useWindowDimensions();
  return (
    <TabView
      style={{flex: 1}}
      tabBarStyle={{
        padding: 20,
        height: 50,
      }}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title="cupones">
        <CouponsScreen />
      </Tab>
      <Tab title="Mis cupones">
        <MyCouponsTab />
      </Tab>
    </TabView>
  );
};
