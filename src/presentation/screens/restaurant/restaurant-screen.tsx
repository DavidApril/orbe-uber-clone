import {Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {useRestaurantStore} from '../../../store/restaurant/restaurant';
import {LoadingScreen} from '../loading/loading-screen';
import {Image, useWindowDimensions} from 'react-native';
import {View} from 'react-native';
import {StorageService} from '../../../services';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {ProductRestaurant, RootStackParams} from '../../../interfaces';
import {CustomIcon, FAB, OpenDrawerMenu, ProductCard} from '../../components';
import {RestaurantService} from '../../../services/restaurant/restaurant.service';
import {globalColors} from '../../theme/styles';
import {ScrollView} from 'react-native-gesture-handler';

export const RestaurantScreen = () => {
  const {height} = useWindowDimensions();
  const {restaurantSelected} = useRestaurantStore();

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    if (!restaurantSelected) {
      navigation.goBack();
    }
  }, [restaurantSelected]);

  const image_url = StorageService.getPhotoByFilename(
    restaurantSelected!.attachments[0].image_url,
  );

  const [products, setProducts] = useState<ProductRestaurant[]>([]);
  const [page, setPage] = useState<number>(0);

  const getProductsByIdRestaurant = async (page: number) => {
    const products = await RestaurantService.getProducts(
      restaurantSelected!.id,
    );

    console.log(products);

    setProducts(products);
  };

  useEffect(() => {
    getProductsByIdRestaurant(page);
  }, [page]);

  if (!restaurantSelected) {
    return <LoadingScreen />;
  }
  return (
    <Layout style={{flex: 1}}>
      <ScrollView>
        <OpenDrawerMenu left={20} />
        <FAB
          white
          style={{right: 20, top: 20, backgroundColor: globalColors.primary}}
          iconName="arrow-back"
          onPress={() => navigation.goBack()}
        />

        <View
          style={{
            backgroundColor: '#ccc',
            height: height * 0.3,
            marginBottom: height * 0.1,
          }}></View>
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

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomIcon fill="red" name="pin" />
              <Text style={{padding: 10}}>{restaurantSelected.address}</Text>
            </Text>

            <Text
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomIcon fill="yellow" name="star" />
              <Text style={{padding: 0}}>4.8</Text>
            </Text>
          </View>

          <View
            style={{
              height: 150,
              backgroundColor: '#bbb',
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

        <View style={{height: 20}}></View>
      </ScrollView>
    </Layout>
  );
};
