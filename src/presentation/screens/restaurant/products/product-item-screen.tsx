import {
  Text,
  Image,
  Pressable,
  ImageBackground,
  View,
  useWindowDimensions,
} from 'react-native';
import {useEffect, useState} from 'react';
import {Button, Spinner} from '@ui-kitten/components';
import {CustomIcon} from '../../../components';
import {CartProduct, RootStackParams} from '../../../../interfaces';
import {StackScreenProps} from '@react-navigation/stack';

import {LoadingScreen} from '../../loading/loading-screen';
import {StorageService} from '../../../../services';
import {currencyFormat} from '../../../../utils';
import {useCartStore, useUIStore} from '../../../../store';
import {CartQuantitySelector} from '../../../components/restaurants/cart/cart-quantity-selector';
import {globalColors, globalStyles} from '../../../theme/styles';

interface Props
  extends StackScreenProps<RootStackParams, 'ProductItemScreen'> {}

export const ProductItemScreen = ({navigation}: Props) => {
  const {isDarkMode} = useUIStore();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const {height} = useWindowDimensions();

  const {
    productSelected: item,
    cart,
    addProductToCart,
    addProductToFavorites,
    removeFavorite,
    favorites,
    cartNews,
    setCartNews
  } = useCartStore();

  useEffect(() => {
    console.log({favorites});
  }, [isFavorite]);

  const [productInCart, setProductInCart] = useState<CartProduct | null>(null);

  useEffect(() => {
    const productInCart = cart.find(product => product.product.id === item?.id);
    if (productInCart) {
      setProductInCart(productInCart);
    }
  }, [cart]);

  return item ? (
    <View
      style={{
        backgroundColor: isDarkMode
          ? globalColors.neutralColors.backgroundDark
          : globalColors.neutralColors.background,
      }}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={globalStyles.FABBackButton}>
        <CustomIcon name="arrow-back" />
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate('ProductsCartScreen');
          setCartNews(false)

        }}
        style={[globalStyles.FABShoppingCartButton]}>
        {cartNews && (
          <View
            style={{
              height: 14,
              width: 14,
              backgroundColor: globalColors.stateColors.success,
              position: 'absolute',
              top: 0,
              right: 0,
              borderRadius: 50,
            }}
          />
        )}
        <CustomIcon name="shopping-cart-outline" />
      </Pressable>

      <View
        style={{
          height,
        }}>
        <ImageBackground
          style={{
            height: '35%',
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            overflow: 'hidden',
          }}>
          <Pressable
            style={{
              width: '100%',
              height: '100%',
            }}
            onPress={() => {}}>
            <Image
              source={{
                uri: StorageService.getPhotoByFilename(item.imageUrl),
              }}
              style={{width: '100%', height: '100%'}}
            />
          </Pressable>
        </ImageBackground>

        {productInCart && (
          <View>
            <CartQuantitySelector product={productInCart} />
          </View>
        )}

        <View style={{padding: 20, gap: 10}}>
          <View>
            <Text style={{}}>{item.category}</Text>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 25,
                color: isDarkMode
                  ? globalColors.fontColor.textColorHeaderDark
                  : globalColors.fontColor.textColorHeader,
              }}>
              {item.name}
            </Text>
          </View>
          <Text
            style={{
              color: isDarkMode
                ? globalColors.fontColor.textColorDark
                : globalColors.fontColor.textColor,
            }}>
            {item.description}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 130,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 20,
            flex: 1,
          }}>
          <Text
            style={{
              color: isDarkMode
                ? globalColors.fontColor.textColorHeaderDark
                : globalColors.fontColor.textColorHeader,
              textAlignVertical: 'center',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {currencyFormat(+item.priceUnitary)}
          </Text>
          <Button
            style={{borderRadius: 50}}
            onPress={() => {
              addProductToCart(item);
            }}
            disabled={!!productInCart}
            status="success">
            <Text>AÑADIR AL CARRITO</Text>
          </Button>
          <Pressable
            onPress={() => {
              setIsFavorite(!isFavorite);
              if (isFavorite) {
                removeFavorite(item);
              } else {
                addProductToFavorites(item);
              }
            }}
            style={{
              borderRadius: 50,
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isFavorite
                ? globalColors.stateColors.error
                : isDarkMode
                ? globalColors.neutralColors.backgroundDarkAlpha
                : globalColors.neutralColors.backgroundAlpha,
            }}>
            <CustomIcon white name="heart" />
          </Pressable>
        </View>
      </View>
    </View>
  ) : (
    <LoadingScreen />
  );
};
