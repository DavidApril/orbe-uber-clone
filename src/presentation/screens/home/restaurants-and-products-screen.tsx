import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import {RestaurantService} from '../../../services';
import {SingleRestaurantResponse} from '../../../interfaces';
import {OpenDrawerMenu, RestaurantCard} from '../../components';
import {globalColors, globalDimensions} from '../../theme/styles';
import {useUIStore} from '../../../store';
import {parseError} from '../../../utils';
import {I18nextProvider, useTranslation} from 'react-i18next';
import i18n from '../../../config/i18n/i18n';

export const RestaurantsAndProductsScreen = ({navigation}: any) => {
  const {isDarkMode} = useUIStore();
  const {height, width} = useWindowDimensions();
  const [restaurants, setRestaurants] = useState<
    SingleRestaurantResponse[] | null
  >(null);

  const {t} = useTranslation();

  useEffect(() => {
    RestaurantService.getRestaurants()
      .then(restaurants => setRestaurants(restaurants))
      .catch(error =>
        parseError(
          'Error at try get restaurants and products in restaurant and products screen',
          error,
        ),
      );
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: !isDarkMode
            ? globalColors.neutralColors.background
            : globalColors.neutralColors.backgroundDark,
          gap: 28,
        }}>
        <Text
          style={{
            top: 80,
            paddingHorizontal: 20,
            fontSize: 40,
            position: 'absolute',
            color: !isDarkMode
              ? globalColors.fontColor.textColor
              : globalColors.fontColor.textColorDark,
            fontWeight: '300',
            zIndex: 999,
          }}>
          {t('quick-and')}{' '}
          <Text
            style={{
              fontWeight: 'bold',
              color: globalColors.primaryColors.primary,
            }}>
            {t('delicious')}
          </Text>{' '}
          {t('fast-food')}
        </Text>
        <View
          style={{
            backgroundColor: 'transparent',
            flexDirection: 'row',
            position: 'absolute',
            gap: 10,
            top: 200,
          }}>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <TextInput
              placeholderTextColor={
                !isDarkMode
                  ? globalColors.neutralColors.placeholderColor
                  : globalColors.neutralColors.placeholderColorDark
              }
              style={{
                paddingHorizontal: 20,
                backgroundColor: !isDarkMode
                  ? globalColors.neutralColors.textInputBackground
                  : globalColors.neutralColors.bottomTabBackgroundDark,
                borderRadius: globalDimensions.borderRadiusButtom,
              }}
              placeholder={t("search")}
            />
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            flex: 1,
            paddingVertical: 10,
            top: 250,
            width,
            height: height * 0.5,
          }}>
          <FlatList
            data={restaurants}
            renderItem={({item: restaurant}) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{gap: 5, flex: 1, paddingHorizontal: 20}}
          />
        </View>

        <OpenDrawerMenu />
      </View>
    </I18nextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  container_top: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 35,
  },
  container_search: {
    flexDirection: 'row',
    width: '80%',
  },
  search: {
    fontSize: 14,
    color: '#444',
    paddingVertical: 15,
    paddingRight: 55,
    paddingLeft: 15,
    borderRadius: 25,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: '#777',
    width: '100%',
  },
  container_sections: {
    marginBottom: 40,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 20,
  },
  horizontalList: {
    gap: 20,
  },
  verticalList: {
    marginTop: 10,
    height: 200,
  },
  product: {
    backgroundColor: '#f9f9f9',
    width: 300,
    height: 300,
    marginTop: 25,
    marginRight: 10,
    borderRadius: 25,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  restaurant: {
    backgroundColor: '#f9f9f9',
    width: 300,
    height: 'auto',
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 25,
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    marginBottom: 8,
  },
  imageRestaurant: {
    width: '100%',
    height: 200,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  deliveryInfo: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: '#555',
    marginHorizontal: 10,
  },
  price: {
    fontSize: 16,
  },
  catalog: {
    padding: 5,
    marginTop: 10,
    width: 100,
    // height: 100,
    alignItems: 'center',
    gap: 10,
  },
  image_container: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  catalog_image: {
    width: 50,
    height: 50,
  },
  catalogName: {
    fontSize: 14,
  },
  featured: {
    backgroundColor: '#fff',
    width: 350,
    height: 250,
    justifyContent: 'space-around',
    paddingBottom: 25,
    marginRight: 10,
    marginVertical: 30,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuredImage: {
    width: 350,
    height: 150,
    borderRadius: 25,
    marginBottom: 8,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  offer: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  offerImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  offerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  offerDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
});
