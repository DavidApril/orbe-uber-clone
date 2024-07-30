import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { globalColors } from '../../theme/styles';
import { OpenDrawerMenu } from '../../components';
import { useUIStore } from '../../../store';
import { useRestaurantStore } from '../../../store/restaurant/restaurant.store';

export const FavoritesScreen = () => {
  const {isDarkMode} = useUIStore();
  const favorites = useRestaurantStore(state => state.favorites);
  const {width, height} = useWindowDimensions()
  console.log('this is favorites restaurants', favorites)
  return (
    <Layout style={{
      justifyContent: 'center', 
      backgroundColor: isDarkMode
        ? globalColors.neutralColors.backgroundDark
        : globalColors.neutralColors.background, 
      alignItems: 'center', 
      height: height
    }}>
      <OpenDrawerMenu />
      {
        favorites.length > 0 ? (
          favorites.map(() => (
            <Text>Hola</Text>
          ))
        ) : (
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: globalColors.primaryColors.primary }}>Aqui estaran tus favoritos</Text>
        )
      }
    </Layout>
  );
};
