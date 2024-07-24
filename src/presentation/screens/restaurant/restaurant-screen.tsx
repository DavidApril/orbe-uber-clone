import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {useRestaurantStore} from '../../../store/restaurant/restaurant';
import {LoadingScreen} from '../loading/loading-screen';

export const RestaurantScreen = () => {
  const {restaurantSelected} = useRestaurantStore();

  return restaurantSelected ? (
    <Layout>
      <Text>{JSON.stringify(restaurantSelected)}</Text>
    </Layout>
  ) : (
    <LoadingScreen />
  );
};
