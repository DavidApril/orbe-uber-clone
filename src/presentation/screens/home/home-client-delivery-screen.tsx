import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import axios from 'axios';
import { CustomIcon } from '../../components';

type Product = {
  id: string;
  name: string;
  image_url: string;
  description?: string;
};

type Catalog = {
  id: string;
  category: string;
  image_url: string;
};

type Restaurant = {
  id: string;
  name: string;
  attachments: {
    image_url: string;
  };
  address?: string;
};

function shuffleProduct(array: Product[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function shuffleCatalog(array: Catalog[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function shuffleRestaurant(array: Restaurant[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export const HomeClientDeliveryScreen = ({navigation}: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Product[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [placeholder, setPlaceholder] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const placeholders = [
    'Buscar restaurantes...',
    'Tu plato favorito...',
    '¿Qué se te antoja hoy?',
    'Encuentra comidas cerca de ti...',
    'Buscar por tipo de cocina...',
    'Explorar menús...',
    'Buscar ofertas especiales...',
    'Descubre nuevos sabores...',
    'Buscar bebidas...',
    '¿Qué deseas ordenar?',
    'Buscar por ingredientes...',
    'Buscar postres...',
    'Encuentra tus comidas favoritas...',
    'Buscar comidas rápidas...',
    'Buscar opciones saludables...',
    'Buscar por calificación...',
    'Buscar platos populares...',
    'Encuentra algo delicioso...',
    'Buscar comida vegetariana...',
  ];

  useEffect(() => {
    const updatePlaceholder = () => {
      const randomIndex = Math.floor(Math.random() * placeholders.length);
      setPlaceholder(placeholders[randomIndex]);
    };

    updatePlaceholder();
    const intervalId = setInterval(updatePlaceholder, 4000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const productData = [
        {
          id: '1',
          name: 'Pizza Margherita',
          image_url:
            'https://i.pinimg.com/564x/0a/34/c1/0a34c17ac88f93878b0d3253ffd39e1f.jpg',
          price: (Math.random() * 10).toFixed(2),
          deliveryTime: (Math.random() * 60).toFixed(1),
          rating: (Math.random() * 5).toFixed(1.5),
        },
        {
          id: '2',
          name: 'Sushi Platter',
          image_url:
            'https://i.pinimg.com/564x/1c/78/f4/1c78f4ffacffbb0e4858cffa67fc7009.jpg',
          price: (Math.random() * 10).toFixed(2),
          deliveryTime: (Math.random() * 60).toFixed(1),
          rating: (Math.random() * 5).toFixed(1.5),
        },
        {
          id: '3',
          name: 'Burger with Fries',
          image_url:
            'https://i.pinimg.com/564x/12/a8/db/12a8dba6ad2279644dfc48cabd3a9ca3.jpg',
          price: (Math.random() * 10).toFixed(2),
          deliveryTime: (Math.random() * 60).toFixed(1),
          rating: (Math.random() * 5).toFixed(1.5),
        },
        {
          id: '4',
          name: 'Spaghetti Carbonara',
          image_url:
            'https://i.pinimg.com/564x/79/b0/4d/79b04dc4c8f3c438c63a8c25bb2ba3c8.jpg',
          price: (Math.random() * 10).toFixed(2),
          deliveryTime: (Math.random() * 60).toFixed(1),
          rating: (Math.random() * 5).toFixed(1.5),
        },
        {
          id: '5',
          name: 'Caesar Salad',
          image_url:
            'https://i.pinimg.com/564x/07/b3/fa/07b3fa5f80454a92f323140a4504ad23.jpg',
          price: (Math.random() * 10).toFixed(2),
          deliveryTime: (Math.random() * 60).toFixed(1),
          rating: (Math.random() * 5).toFixed(1.5),
        },
        {
          id: '6',
          name: 'Tacos',
          image_url:
            'https://i.pinimg.com/564x/55/4d/c5/554dc5442570bb50344b45145d63db8b.jpg',
          price: (Math.random() * 10).toFixed(2),
          deliveryTime: (Math.random() * 60).toFixed(1),
          rating: (Math.random() * 5).toFixed(1.5),
        },
        {
          id: '7',
          name: 'Pancakes',
          image_url:
            'https://i.pinimg.com/564x/98/6e/80/986e8020d901fe1c313e9460495ec5c3.jpg',
          price: (Math.random() * 10).toFixed(2),
          deliveryTime: (Math.random() * 60).toFixed(1),
          rating: (Math.random() * 5).toFixed(1.5),
        },
        {
          id: '8',
          name: 'Ice Cream Sundae',
          image_url:
            'https://i.pinimg.com/564x/9e/df/63/9edf63395b618f8a8e9fe70b6355caaa.jpg',
          price: (Math.random() * 10).toFixed(2),
          deliveryTime: (Math.random() * 60).toFixed(1),
          rating: (Math.random() * 5).toFixed(1.5),
        },
      ];

      // const restaurantData = [
      //     {
      //         id: '1',
      //         name: "McDonald's Valledupar",
      //         image_url: 'https://www.tecnogus.com.co/wp-content/uploads/2023/09/McDonalds-Valledupar-jpeg.webp',
      //         address: 'Cl. 16 #Carrera 19, Valledupar, Cesar',
      //         rating: (Math.random() * 5).toFixed(1.5)
      //     },
      //     {
      //         id: '2',
      //         name: "Burger King Cartagena",
      //         image_url: 'https://estaticos-cdn.prensaiberica.es/clip/51d9023b-54d6-4aa7-b3a7-9ce4e33b5eba_16-9-discover-aspect-ratio_default_0.jpg',
      //         address: 'Av. San Martín #5-45, Cartagena, Bolívar',
      //         rating: (Math.random() * 5).toFixed(1.5)
      //     },
      //     {
      //         id: '3',
      //         name: "KFC Bogotá",
      //         image_url: 'https://www.elpaseoshopping.com/assets/img/upload/big/564a40ad21ac47db9d6f6c10427e68a6.jpg',
      //         address: 'Calle 80 #70-91, Bogotá, Cundinamarca',
      //         rating: (Math.random() * 5).toFixed(1.5)
      //     },
      //     {
      //         id: '4',
      //         name: "Subway Medellín",
      //         image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh1yyEXpvazm8VRBxTEAvI-UhqjeE1DdwVYg&s',
      //         address: 'Cra. 43a #1-50, Medellín, Antioquia',
      //         rating: (Math.random() * 5).toFixed(1.5)
      //     },
      //     {
      //         id: '5',
      //         name: "Domino's Pizza Cali",
      //         image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOOlM0QYV0p3M356_eEbRhpFwV3LKn5T1BA&s',
      //         address: 'Cra. 66 #11-40, Cali, Valle del Cauca',
      //         rating: (Math.random() * 5).toFixed(1.5)
      //     }
      // ];

      const catalogData = [
        {
          id: '1',
          category: 'Postres',
          image_url:
            'http://154.38.180.23:3001/api_v1/storage?fileName=product%2Fcake-slice.png',
        },
        {
          id: '2',
          category: 'Dulces',
          image_url:
            'http://154.38.180.23:3001/api_v1/storage?fileName=product%2Fcandy.png',
        },
        {
          id: '3',
          category: 'Fast Food',
          image_url:
            'http://154.38.180.23:3001/api_v1/storage?fileName=product%2Fburguer.png',
        },
        {
          id: '4',
          category: 'Almuerzos',
          image_url:
            'http://154.38.180.23:3001/api_v1/storage?fileName=product%2Flunch.png',
        },
        {
          id: '5',
          category: 'Bebidas',
          image_url:
            'http://154.38.180.23:3001/api_v1/storage?fileName=product%2Fsoft-drink.png',
        },
        {
          id: '6',
          category: 'Ensaladas',
          image_url:
            'http://154.38.180.23:3001/api_v1/storage?fileName=product%2Fsalads.png',
        },
        {
          id: '7',
          category: 'Mariscos',
          image_url:
            'http://154.38.180.23:3001/api_v1/storage?fileName=product%2Fseafood.png',
        },
        {
          id: '8',
          category: 'Sopas',
          image_url:
            'http://154.38.180.23:3001/api_v1/storage?fileName=product%2Fsoup.png',
        },
      ];

      const shuffledProducts = shuffleProduct(productData);
      const shuffledCatalogs = shuffleCatalog(catalogData);
      // const shuffledRestaurants = shuffleRestaurant(restaurantData);

      //const productResponse = await axios.get('');
      setProducts(shuffledProducts);

      //const catalogResponse = await axios.get('');
      setCatalogs(shuffledCatalogs);

      //const featuredResponse = await axios.get('');
      setFeatured(shuffledProducts);

      //const offersResponse = await axios.get('');
      setOffers(shuffledProducts);

      const restaurantsResponse = await axios.get(
        'https://orbeapi.devzeros.com/api_v1/restaurant?skip=1&take=100',
      );
      setRestaurants(restaurantsResponse.data.data);

      setLoadingInfo(true);
    };

    fetchData();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderProduct = ({item}: any) => (
    <View style={{paddingVertical: 10}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductItemScreen');
        }}
        style={styles.product}
        key={item.id}>
        <Image
          source={{uri: item.image_url}}
          resizeMode="cover"
          style={styles.image}
        />
        <View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text
            style={
              styles.deliveryInfo
            }>{`Tiempo estimado: ${item.deliveryTime} - Precio: ${item.price}`}</Text>
          <Text style={styles.rating}>{`Rating: ${item.rating}`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderRestaurant = ({item}: any) => {
    // const image_url = item.attachments && item.attachments.image_url ? item.attachments.image_url : '';
    const image_url =
      'http://154.38.180.23:3001/api_v1/storage?fileName=icons%2Frestaurant-icon.png';
    return (
      <View style={{paddingVertical: 10}}>
        <TouchableOpacity style={styles.restaurant} key={item.id}>
          <View style={{padding: 10}}>
            {image_url.length > 0 ? (
              <Image style={styles.imageRestaurant} source={{uri: image_url}} />
            ) : (
              <Image
                style={styles.imageRestaurant}
                source={{
                  uri: 'http://154.38.180.23:3001/api_v1/storage?fileName=icons%2Frestaurant-icon.png',
                }}
              />
            )}
          </View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.deliveryInfo}>{`${item.description}`}</Text>
          <Text
            style={styles.deliveryInfo}>{`Direccion: ${item.address}`}</Text>
          <Text style={styles.rating}>{`Rating: ${(Math.random() * 5).toFixed(
            1.5,
          )}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCatalog = ({item}: any) => (
    <TouchableOpacity style={styles.catalog} key={item.id}>
      <View style={styles.image_container}>
        <Image
          source={{uri: item.image_url}}
          style={styles.catalog_image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.catalogName}>{item.category}</Text>
    </TouchableOpacity>
  );

  const renderFeatured = ({item}: any) => (
    <View style={styles.featured} key={item.id}>
      <Image
        source={{uri: item.image_url}}
        resizeMode="cover"
        style={styles.featuredImage}
      />
      <Text style={styles.featuredName}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  const renderOffer = ({item}: any) => (
    <View style={styles.offer} key={item.id}>
      <Image
        source={{uri: item.image_url}}
        resizeMode="cover"
        style={styles.offerImage}
      />
      <Text style={styles.offerName}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.offerDescription}>{item.description}</Text>
    </View>
  );

  return (
    <>
      {loadingInfo ? (
        <Animated.View style={styles.container}>
          <View style={styles.container_top}>
            <View style={styles.container_search}>
              <TextInput placeholder={placeholder} style={styles.search} />

              {/* <Ionicons size={24} style={{ position: 'absolute', top: '25%', right: 25 }} color={'#777'} name='search' /> */}
            </View>

            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 52,
                width: 52,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: '#3fc1f2',
                backgroundColor: '#3fc1f2',
              }}
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <CustomIcon name="menu" white={true} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container_sections}>
              <FlatList
                data={catalogs}
                renderItem={renderCatalog}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{gap: 5}}
              />
            </View>

            <View style={styles.container_sections}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.sectionTitle, {paddingVertical: 0}]}>
                  Productos Destacados
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('ProductList', ProductList);
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#3fc1f2',
                      fontSize: 17,
                    }}>
                    Ver productos
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={featured}
                renderItem={renderProduct}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
              />
            </View>

            <View style={styles.container_sections}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.sectionTitle, {paddingVertical: 0}]}>
                  Restaurantes recomendados
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('RestaurantList');
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#3fc1f2',
                      fontSize: 17,
                    }}>
                    Ver mas
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={restaurants}
                renderItem={renderRestaurant}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
              />
            </View>

            <View style={styles.container_sections}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.sectionTitle}>Ofertas especiales</Text>
                <Text
                  style={{fontWeight: 'bold', color: '#3fc1f2', fontSize: 17}}>
                  Ver mas
                </Text>
              </View>
              <FlatList
                data={offers}
                renderItem={renderOffer}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
              />
            </View>

            {/* <Accordion title="Productos que te pueden interesar">
              <FlatList
                data={featured}
                renderItem={renderFeatured}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
              />
            </Accordion> */}
          </ScrollView>
        </Animated.View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          {/* <LoadingScreen /> */}
        </View>
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
