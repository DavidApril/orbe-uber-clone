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
  const {width} = useWindowDimensions();
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: isDarkMode
          ? globalColors.neutralColors.backgroundDark
          : globalColors.neutralColors.background,
        alignItems: 'flex-start',
        width: width,
      }}>
      <OpenDrawerMenu />
      {restaurantFavorites.length || productFavorites.length > 0 ? (
        <ScrollView
          style={{gap: 250, backgroundColor: 'transparent', width: '100%'}}>
          {restaurantFavorites.length && (
            <Layout
              style={{
                backgroundColor: 'transparent',
                paddingHorizontal: 10,
                // minHeight: 200,
                width: '100%',
              }}>
              <TextHeaderScreen
                title="Restaurantes"
                description="restaurantes favoritos"
              />
              <RestaurantsList restaurant={restaurantFavorites} title={''} />
            </Layout>
          )}

          {productFavorites.length > 0 && (
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
          )}
        </ScrollView>
      ) : (
        <TextHeaderScreen title="No hay Productos o Restaurantes en favoritos" />
      )}
    </Layout>
  );
};
