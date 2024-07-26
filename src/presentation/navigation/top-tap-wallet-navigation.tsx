import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {Layout, Tab, TabView, Text} from '@ui-kitten/components';
import {MyBalanceTab} from '../screens/payment/my-balance-tab';
import {MyCardsTab} from '../screens';

export const TopTapNavigationClientDelivery = (): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const {height} = useWindowDimensions();
  return (
    <TabView
      style={{flex: 1}}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title="Mi balance">
        <Layout>
          <MyBalanceTab />
        </Layout>
      </Tab>
      <Tab title="Mis tarjetas">
        <MyCardsTab />
      </Tab>
    </TabView>
  );
};
