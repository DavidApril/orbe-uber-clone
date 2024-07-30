import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import {globalColors} from '../../theme/styles';
import {OpenDrawerMenu, TextHeaderScreen} from '../../components';
import {useCartStore, useUIStore} from '../../../store';
import {useRestaurantStore} from '../../../store/restaurant/restaurant.store';
import {ProductsList} from './products/products-list';
import {RestaurantsList} from './restaurants-list';

export const FavoritesScreen = () => {
  const {isDarkMode} = useUIStore();
  const restaurantFavorites = useRestaurantStore(state => state.favorites);
  const productFavorites = useCartStore(state => state.favorites);
  const {width, height} = useWindowDimensions();
  console.log('this is favorites restaurants', restaurantFavorites);
  console.log('this is favorites products', productFavorites);
  return (
    <Layout
      style={{
        justifyContent:
          restaurantFavorites.length || productFavorites.length > 0
            ? 'flex-start'
            : 'center',
        backgroundColor: isDarkMode
          ? globalColors.neutralColors.backgroundDark
          : globalColors.neutralColors.background,
        alignItems: 'flex-start',
        height: height * 0.85,
        width: width,
        paddingTop: 120,
      }}>
      <OpenDrawerMenu />
      {restaurantFavorites.length || productFavorites.length > 0 ? (
        <ScrollView style={{gap: 250, backgroundColor: 'transparent'}}>
          <Layout
            style={{
              backgroundColor: 'transparent',
              paddingHorizontal: 10,
              minHeight: 200,
              width: '100%',
            }}>
            <TextHeaderScreen
              title="Restaurantes"
              description="restaurantes favoritos"
            />
            <RestaurantsList restaurant={restaurantFavorites} title={''} />
          </Layout>
          <Layout
            style={{
              backgroundColor: 'transparent',
              paddingHorizontal: 10,
              minHeight: 200,
            }}>
            <TextHeaderScreen
              title="Productos"
              description="productos favoritos"
            />
            <ProductsList products={productFavorites} title="" />
          </Layout>
        </ScrollView>
      ) : (
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: globalColors.primaryColors.primary,
          }}>
          Aqui estaran tus favoritos
        </Text>
      )}
    </Layout>
  );
};
