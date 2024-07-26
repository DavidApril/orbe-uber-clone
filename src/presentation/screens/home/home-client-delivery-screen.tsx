import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  useWindowDimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {LoadingScreen} from '../loading/loading-screen';
import {RestaurantService} from '../../../services/restaurant/restaurant.service';
import {SingleRestaurantResponse} from '../../../interfaces';
import {CustomIcon, OpenDrawerMenu, RestaurantCard} from '../../components';
import {Input, Layout} from '@ui-kitten/components';
import {globalColors} from '../../theme/styles';

export const HomeClientDeliveryScreen = ({navigation}: any) => {
  const [loadingInfo, setLoadingInfo] = useState(false);

  const [restaurants, setRestaurants] = useState<
    SingleRestaurantResponse[] | null
  >(null);

  const getRestaurants = async () => {
    const restaurants = await RestaurantService.getRestaurants();
    if (restaurants) {
      setLoadingInfo(true);
      setRestaurants(restaurants);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const colorList = [
    {offset: '0%', color: globalColors.primary, opacity: '1'},
    {offset: '20%', color: globalColors.primary, opacity: '0.8'},
    {offset: '40%', color: globalColors.primary, opacity: '0.6'},
    {offset: '60%', color: globalColors.primary, opacity: '0.4'},
    {offset: '100%', color: globalColors.primary, opacity: '0'},
  ];

  const {height, width} = useWindowDimensions();
  return (
    <>
      {loadingInfo ? (
        <Layout
          style={{
            // padding: 20,
            // backgroundColor:'black',
            flex: 1,
            // paddingTop: 80,
            flexDirection: 'column',
            gap: 28,
          }}>
          <ImageBackground>
            <Image
              source={require('../../../assets/gradient-background.webp')}
              style={{width: '100%', height: '100%', zIndex: -10}}
            />
          </ImageBackground>

          <Text
            style={{
              top: 80,
              paddingHorizontal: 20,
              fontSize: 40,
              position: 'absolute',
              color: globalColors.primary,
              fontWeight: '300',
              zIndex: 999,
            }}>
            Rápidas & <Text style={{fontWeight: 'bold'}}>deliciosas</Text>{' '}
            comidas
          </Text>
          <Layout
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              position: 'absolute',
              gap: 10,
              top: 200,
            }}>
            <Input
              accessoryLeft={<CustomIcon fill="gray" name="search" />}
              style={{
                flex: 1,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.17,
                shadowRadius: 2.54,
                elevation: 3,
                paddingHorizontal: 20,
                borderRadius: 10,

                backgroundColor: 'white',
              }}
              placeholder="Buscar..."
            />
          </Layout>

          <Layout
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
            {/* {restaurants?.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))} */}
          </Layout>

          {/* <View
            style={{
              position: 'absolute',
              flex: 1,
              height: height * 0.4,
              width,
              zIndex: -10,
            }}>
            <RadialGradient
              x="100%"
              y="0%"
              rx="40%"
              ry="50%"
              colorList={colorList}
            />
          </View>

          <View
            style={{
              position: 'absolute',
              flex: 1,
              height: height * 0.6,
              width,
              zIndex: -10,
              bottom: 0,
            }}>
            <RadialGradient
              x="0%"
              y="100%"
              rx="100%"
              ry="100%"
              colorList={colorList}
            />
          </View> */}

          <OpenDrawerMenu left={20} />

          {/* <Layout
            style={{
              backgroundColor: 'white',
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.17,
              shadowRadius: 2.54,
              elevation: 3,
              height: 160,
              borderRadius: 20,
            }}></Layout> */}
        </Layout>
      ) : (
        // <Animated.View style={styles.container}>
        //   <View style={styles.container_top}>
        //     <View style={styles.container_search}>
        //       <TextInput placeholder={'Buscar'} style={styles.search} />

        //       {/* <Ionicons size={24} style={{ position: 'absolute', top: '25%', right: 25 }} color={'#777'} name='search' /> */}
        //     </View>

        //     <TouchableOpacity
        //       style={{
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         height: 52,
        //         width: 52,
        //         borderRadius: 50,
        //         borderWidth: 2,
        //         borderColor: '#3fc1f2',
        //         backgroundColor: '#3fc1f2',
        //       }}
        //       onPress={() => {
        //         navigation.toggleDrawer();
        //       }}>
        //       {/* <Ionicons name="menu" size={36} color={'#fff'} /> */}
        //     </TouchableOpacity>
        //   </View>

        //   <ScrollView showsVerticalScrollIndicator={false}>
        //     {/* <View style={styles.container_sections}>
        //       <FlatList
        //         data={catalogs}
        //         renderItem={renderCatalog}
        //         horizontal
        //         showsHorizontalScrollIndicator={false}
        //         style={{gap: 5}}
        //       />
        //     </View> */}

        //     {/* <View style={styles.container_sections}>
        //       <View
        //         style={{
        //           flexDirection: 'row',
        //           alignItems: 'center',
        //           justifyContent: 'space-between',
        //         }}>
        //         <Text style={[styles.sectionTitle, {paddingVertical: 0}]}>
        //           Productos Destacados
        //         </Text>

        //         <TouchableOpacity
        //           onPress={() => {
        //             // navigation.navigate('ProductList', ProductList);
        //           }}>
        //           <Text
        //             style={{
        //               fontWeight: 'bold',
        //               color: '#3fc1f2',
        //               fontSize: 17,
        //             }}>
        //             Ver productos
        //           </Text>
        //         </TouchableOpacity>
        //       </View>
        //       <FlatList
        //         data={featured}
        //         renderItem={renderProduct}
        //         horizontal
        //         showsHorizontalScrollIndicator={false}
        //         style={styles.horizontalList}
        //       />
        //     </View> */}

        //     <View style={styles.container_sections}>
        //       <View
        //         style={{
        //           flexDirection: 'row',
        //           alignItems: 'center',
        //           justifyContent: 'space-between',
        //         }}>
        //         <Text style={[styles.sectionTitle, {paddingVertical: 0}]}>
        //           Restaurantes recomendados
        //         </Text>

        //         <TouchableOpacity
        //           onPress={() => {
        //             navigation.navigate('RestaurantList');
        //           }}>
        //           <Text
        //             style={{
        //               fontWeight: 'bold',
        //               color: '#3fc1f2',
        //               fontSize: 17,
        //             }}>
        //             Ver mas
        //           </Text>
        //         </TouchableOpacity>
        //       </View>
        //       <FlatList
        //         data={restaurants}
        //         renderItem={({item: restaurant}) => (
        //           <RestaurantCard restaurant={restaurant} />
        //         )}
        //         horizontal
        //         showsHorizontalScrollIndicator={false}
        //         style={styles.horizontalList}
        //       />
        //     </View>

        //     {/* <View style={styles.container_sections}>
        //       <View
        //         style={{
        //           flexDirection: 'row',
        //           alignItems: 'center',
        //           justifyContent: 'space-between',
        //         }}>
        //         <Text style={styles.sectionTitle}>Ofertas especiales</Text>
        //         <Text
        //           style={{fontWeight: 'bold', color: '#3fc1f2', fontSize: 17}}>
        //           Ver mas
        //         </Text>
        //       </View>
        //       <FlatList
        //         data={offers}
        //         renderItem={renderOffer}
        //         horizontal
        //         showsHorizontalScrollIndicator={false}
        //         style={styles.horizontalList}
        //       />
        //     </View> */}

        //     {/* <Accordion title="Productos que te pueden interesar">
        //       <FlatList
        //         data={featured}
        //         renderItem={renderFeatured}
        //         horizontal
        //         showsHorizontalScrollIndicator={false}
        //         style={styles.horizontalList}
        //       />
        //     </Accordion> */}
        //   </ScrollView>
        // </Animated.View>
        <Layout>
          <LoadingScreen />
        </Layout>
      )}
    </>
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
