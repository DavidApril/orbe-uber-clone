import {Text} from '@ui-kitten/components';
import {useEffect, useState} from 'react';
import {LoadingScreen} from '../loading/loading-screen';
import {Image, Pressable, useWindowDimensions} from 'react-native';
import {View} from 'react-native';
import {StorageService} from '../../../services';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProductRestaurant, RootStackParams} from '../../../interfaces';
import {CustomIcon, FABGoBackButton, Stats} from '../../components';
import {RestaurantService} from '../../../services/restaurant/restaurant.service';
import {ScrollView} from 'react-native-gesture-handler';
import {ProductsList} from './products/products-list';
import {useCartStore, useUIStore} from '../../../store';
import {fontColor, globalColors, globalDimensions} from '../../theme/styles';

export const RestaurantScreen = () => {
  const {height, width} = useWindowDimensions();

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {cart, setCartNews, restaurantSelected} = useCartStore();

  useEffect(() => {
    if (!restaurantSelected) {
      navigation.goBack();
    }
  }, [restaurantSelected]);

  if (!restaurantSelected) {
    return <LoadingScreen />;
  }

  const image_url = StorageService.getPhotoByFilename(
    restaurantSelected!.attachments[0].image_url,
  );

  const [products, setProducts] = useState<ProductRestaurant[]>([]);
  const [page, setPage] = useState<number>(0);

  const getProductsByIdRestaurant = async (page: number) => {
    const products = await RestaurantService.getProducts(
      restaurantSelected!.id,
    );
    console.log(products.length)
    setProducts(products);
  };

  console.log(restaurantSelected.id)

  useEffect(() => {
    setCartNews(true);
  }, [cart]);

  useEffect(() => {
    getProductsByIdRestaurant(page);
  }, [page]);

  const {isDarkMode} = useUIStore();

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: !isDarkMode
          ? globalColors.neutralColors.background
          : globalColors.neutralColors.backgroundDark,
      }}>
      <View
        style={{
          marginVertical: 30,
          flexDirection: 'row',
          overflow: 'visible',
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            height: 45,
            zIndex: 999,
            width: 45,
            borderRadius: 500,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            top: 30,
            left: 30,
          }}>
          <CustomIcon fill="black" name="arrow-back" />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('ProductsCartScreen')}
          style={{
            height: 45,
            zIndex: 999,
            width: 45,
            borderRadius: 500,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            top: 30,
            right: 30,
          }}>
          <CustomIcon fill="black" name="shopping-cart" />
        </Pressable>
      </View>

      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 50,
          }}>
          <View
            style={{
              height: 180,
              width: 180,
              backgroundColor: 'white',
              borderRadius: 100,
              marginLeft: 20,
              borderColor: 'white',
              borderWidth: 6,
              overflow: 'hidden',
            }}>
            <Image
              style={{height: 180, width: 180, zIndex: -10}}
              source={{uri: image_url}}
            />
          </View>
        </View>

        <View style={{marginHorizontal: 60, marginVertical: 15}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 35,
              color: isDarkMode
                ? fontColor.textColorHeaderDark
                : fontColor.textColorDark,
            }}>
            {restaurantSelected.name}
          </Text>

          <Text
            style={{
              color: isDarkMode ? fontColor.textColorDark : fontColor.textColor,
            }}>
            {restaurantSelected.description}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomIcon fill="red" name="pin" />
              <Text
                style={{
                  padding: 10,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                {restaurantSelected.address}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomIcon fill="yellow" name="star" />
              <Text
                style={{
                  padding: 10,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                {'4.8'}
              </Text>
            </View>
          </View>

          <Stats />
        </View>

        <ProductsList products={products} />

        <View style={{height: 100}}></View>
      </ScrollView>
    </View>
  );
};
