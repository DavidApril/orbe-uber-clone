import {Text} from '@ui-kitten/components';
import {useEffect, useRef, useState} from 'react';
import {LoadingScreen} from '../loading/loading-screen';
import {Image, useColorScheme, useWindowDimensions} from 'react-native';
import {View} from 'react-native';
import {StorageService} from '../../../services';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {ProductRestaurant, RootStackParams} from '../../../interfaces';
import {
  CustomIcon,
  FABGoBackButton,
  FABShoppingCart,
  OpenDrawerMenu,
  Stats,
} from '../../components';
import {RestaurantService} from '../../../services/restaurant/restaurant.service';
import {ScrollView} from 'react-native-gesture-handler';
import {ProductsList} from './products/products-list';
import {useCartStore, useUIStore} from '../../../store';
import BottomSheet, {TouchableOpacity} from '@gorhom/bottom-sheet';
import {globalColors} from '../../theme/styles';

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
    setProducts(products);
  };

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
        backgroundColor: isDarkMode
          ? globalColors.neutralColors.background
          : globalColors.neutralColors.backgroundDark,
      }}>
      <TouchableOpacity
        style={[
          {
            zIndex: 99999999999999,
            position: 'absolute',
            borderRadius: 100,
            height: 45,
            width: 45,
            top: 30,
            left: 30,
            justifyContent: 'center',
            backgroundColor: isDarkMode
              ? globalColors.primaryColors.primary
              : '',
            alignItems: 'center',
            shadowOpacity: 0.3,
            shadowOffset: {
              height: 0.27,
              width: 4.5,
            },
            elevation: 5,
          },
        ]}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
        <CustomIcon white={isDarkMode ? true : false} name="menu-2-outline" />
      </TouchableOpacity>

      <ScrollView>
        <View
          style={{
            height: height * 0.3,
            marginBottom: height * 0.1,
          }}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{uri: image_url ?? ''}}
          />
        </View>
        <View
          style={{
            height: 100,
            width: 100,
            backgroundColor: 'white',
            position: 'absolute',
            borderRadius: 100,
            transform: [{translateY: height * 0.25}],
            marginLeft: 20,
            borderColor: 'white',
            borderWidth: 6,
            overflow: 'hidden',
          }}>
          <Image style={{height: 100, width: 100}} source={{uri: image_url}} />
        </View>

        <View style={{marginHorizontal: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 35}}>
            {restaurantSelected.name}
          </Text>

          <Text>{restaurantSelected.description}</Text>

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

        <View style={{height: 20}}></View>
      </ScrollView>
    </View>
  );
};
