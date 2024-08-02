import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {SingleRestaurantResponse} from '../../../interfaces';
import {RestaurantCard} from '..';
import {FlatList, View} from 'react-native';
import {globalColors} from '../../theme/styles';

interface Props {
  restaurant: SingleRestaurantResponse[];
  title: string;
}

export const RestaurantsList = ({restaurant, title}: Props) => {
  return (
    <View style={{paddingHorizontal: 20}}>
      <Text
        style={{
          marginVertical: 10,
          fontWeight: 'bold',
          fontSize: 25,
          color: globalColors.primaryColors.primary,
        }}>
        {title}
      </Text>

      <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
        <FlatList
          data={restaurant}
          horizontal
          style={{paddingBottom: 15}}
          renderItem={({item, index}) => (
            <RestaurantCard key={index} restaurant={item} />
          )}
        />
      </View>
    </View>
  );
};
