import {Button, Layout, Text} from '@ui-kitten/components/ui';
import {Image, Pressable} from 'react-native';
import {StorageService} from '../../../services';
import {
  CartProduct,
  ProductRestaurant,
  RootStackParams,
} from '../../../interfaces';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FAB} from '../ui/floating-action-button';
import {CustomIcon} from '../ui/custom-icon';
import {currencyFormat} from '../../../utils';
import {useCartStore} from '../../../store';
import {useEffect, useState} from 'react';
import {LoadingScreen} from '../../screens';

interface Props {
  product: ProductRestaurant;
}

export const ProductCard = ({product}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const {setProductSelected} = useCartStore();
  const {
    cart,
    setCartNews,
    addProductToCart,
    removeFavorite,
    addProductToFavorites,
    removeProduct,
  } = useCartStore();

  useEffect(() => {
    console.log({cart})
    // setCartNews(true);
  }, [cart]);

  if (!product) {
    return <LoadingScreen />;
  }

  return (
    <Pressable
      onPress={() => {
        setProductSelected(product);
        navigation.navigate('ProductItemScreen');
      }}>
      <Layout
        style={{
          margin: 5,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          width: 220,
          // justifyContent: 'center',
          padding: 20,
          position: 'relative',
        }}>
        <FAB
          fill={!isFavorite ? 'gray' : 'red'}
          iconName="heart"
          onPress={() => {
            setIsFavorite(!isFavorite);
            if (isFavorite) {
              removeFavorite(product);
            } else {
              addProductToFavorites(product);
            }
          }}
          style={{right: 10, top: 10, backgroundColor: 'white'}}
        />
        <Image
          style={{
            height: 130,
            width: 130,
            borderRadius: 100,
            alignSelf: 'center',
          }}
          source={{
            uri: StorageService.getPhotoByFilename(product.imageUrl ?? ''),
          }}
        />

        <Text style={{marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>
          {product.name}
        </Text>
        <Text style={{}} numberOfLines={3}>
          {product.description}
        </Text>

        <Text
          style={{
            paddingVertical: 5,
            marginTop: 5,
            textAlignVertical: 'center',
          }}>
          {currencyFormat(+product.priceUnitary)}
        </Text>

        <Button
          onPress={() => {
            setIsAddedToCart(!isAddedToCart);
            if (isAddedToCart) {
              removeProduct({product: product, quantity: -1});
            } else {
              addProductToCart({product: product, quantity: 1});
            }
          }}
          status="success"
          style={{
            height: 15,
            width: 15,
            borderRadius: 50,
            position: 'absolute',
            right: 10,
            bottom: 10,
          }}>
          <CustomIcon white name={!isAddedToCart ? 'plus' : 'checkmark'} />
        </Button>
      </Layout>
    </Pressable>
  );
};
