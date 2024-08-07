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
import {globalColors, globalStyles, primaryColors} from '../../../theme/styles';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({navigation}: Props) => {
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
    setCartNews,
  } = useCartStore();

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
        <CustomIcon
          fill={globalColors.neutralColors.backgroundAlpha}
          name="arrow-back"
        />
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate('CartOfProductsScreen');
          setCartNews(false);
        }}
        style={[globalStyles.FABShoppingCartButton]}>
        {cartNews && (
          <View
            style={{
              height: 14,
              width: 14,
              backgroundColor: globalColors.stateColors.error,
              position: 'absolute',
              top: 0,
              right: 0,
              borderRadius: 50,
            }}
          />
        )}
        <CustomIcon
          fill={globalColors.neutralColors.backgroundAlpha}
          name="shopping-cart-outline"
        />
      </Pressable>

      <View
        style={{
          height,
        }}>
        <ImageBackground
          style={{
            height: '45%',
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
          bottom: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems: 'center',
            marginHorizontal: 5,
            gap: 20,
            flex: 1,
          }}>
            <Text
              style={{
                color: primaryColors.primary,
                textAlignVertical: 'center',
                fontWeight: '300',
                fontSize: 30,
                paddingHorizontal: 20
              }}>
              {currencyFormat(+item.priceUnitary)}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10 }}>
              <Pressable
                style={{
                  borderRadius: 50,
                  backgroundColor: globalColors.primaryColors.primary,
                  paddingVertical: 25,
                  paddingHorizontal: 35,
                  width: '80%',
                }}
                onPress={() => {
                  addProductToCart(item);
                }}
                disabled={!!productInCart}>
                <Text style={{color: 'white', textAlign: 'center'}}>AÑADIR AL CARRITO</Text>
              </Pressable>
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
                  height: 60,
                  width: 60,
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
    </View>
  ) : (
    <LoadingScreen />
  );
};
