import {Layout, List, Text} from '@ui-kitten/components';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {LoadingScreen} from '../loading/loading-screen';
import {Image, useWindowDimensions} from 'react-native';
import {View} from 'react-native';
import {StorageService} from '../../../services';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  CartProduct,
  ProductRestaurant,
  RootStackParams,
} from '../../../interfaces';
import {
  CustomIcon,
  FABGoBackButton,
  FABShoppingCart,
  OpenDrawerMenu,
  PaymentControllers,
  Stats,
} from '../../components';
import {RestaurantService} from '../../../services/restaurant/restaurant.service';
import {ScrollView} from 'react-native-gesture-handler';
import {ProductsList} from './products/products-list';
import {useCartStore} from '../../../store';
import BottomSheet from '@gorhom/bottom-sheet';

export const RestaurantScreen = () => {
  const {height, width} = useWindowDimensions();

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {cart, setCartNews, restaurantSelected} = useCartStore();

  useEffect(() => {
    console.log({restaurantSelected});
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
  const summaryBottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    setCartNews(true);
  }, [cart]);

  useEffect(() => {
    getProductsByIdRestaurant(page);
  }, [page]);

  const snapPoints = useMemo(() => ['20%', '50%', '80%'], []);

  return (
    <Layout style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={{
          backgroundColor: 'white',
        }}>
        <OpenDrawerMenu left={20} />
        <FABGoBackButton
          style={{right: 20, top: 20, backgroundColor: 'white'}}
        />

        <FABShoppingCart
          onPressFunction={() => {
            summaryBottomSheetRef.current?.expand();
            console.log({restaurantSelected});
          }}
        />

        <View
          style={{
            backgroundColor: '#ccc',
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
              <Text style={{padding: 10}}>4.8</Text>
            </View>
          </View>

          <View
            style={{
              height: 150,
              backgroundColor: 'black',
              marginVertical: 10,
              borderRadius: 20,
            }}></View>

          <Text style={{marginVertical: 10, fontWeight: 'bold', fontSize: 25}}>
            Productos
          </Text>

          <Layout style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
            {products?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Layout>
        </View>

        <ProductsList products={products} />

        <View style={{height: 20}}></View>
      </ScrollView>
    </Layout>
  );
};
