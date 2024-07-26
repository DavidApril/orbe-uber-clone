import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {ProductRestaurant} from '../../../../interfaces';
import {ProductCard} from '../../../components';
import {FlatList, View} from 'react-native';

interface Props {
  products: ProductRestaurant[];
}

export const ProductsList = ({products}: Props) => {
  return (
    <View style={{paddingHorizontal: 20}}>
      <Text style={{marginVertical: 10, fontWeight: 'bold', fontSize: 25}}>
        Productos
      </Text>

      <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
        <FlatList
          data={products}
          horizontal
          style={{paddingBottom: 15}}
          renderItem={({item, index}) => (
            <ProductCard key={index} product={item} />
          )}
        />
      </View>
    </View>
  );
};
