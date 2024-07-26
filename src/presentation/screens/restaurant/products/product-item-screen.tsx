import {
  Text,
  Image,
  StyleSheet,
  Pressable,
  ImageBackground,
  Modal,
  View,
  useWindowDimensions,
} from 'react-native';
import {useEffect, useState} from 'react';
import {Button, ButtonGroup} from '@ui-kitten/components';
import {CustomIcon} from '../../../components';
import {CartProduct, RootStackParams} from '../../../../interfaces';
import {StackScreenProps} from '@react-navigation/stack';

import {LoadingScreen} from '../../loading/loading-screen';
import {StorageService} from '../../../../services';
import {currencyFormat} from '../../../../utils';
import {useCartStore} from '../../../../store';

interface Props
  extends StackScreenProps<RootStackParams, 'ProductItemScreen'> {}

export const ProductItemScreen = ({navigation}: Props) => {
  const [photoOpen, setPhotoOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {height} = useWindowDimensions();

  const {
    addProductToCart,
    productSelected: item,
    cart,
    updateProductQuantity,
  } = useCartStore();

  const [productCart, setProductCart] = useState<CartProduct | undefined>(
    undefined,
  );

  useEffect(() => {
    const productInCart = cart.find(
      itemCart => itemCart?.product.id === item?.id,
    );
    setProductCart(productInCart);
  }, [cart]);

  const handleAddToCart = () => {
    if (!item) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addProductToCart({product: item, quantity: 1});
      setModal(true);
    }, 2000);
  };
  return item ? (
    <View>
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
            onPress={() => setPhotoOpen(true)}>
            <Image
              source={{
                uri: StorageService.getPhotoByFilename(item!.imageUrl),
              }}
              style={{width: '100%', height: '100%'}}
            />
          </Pressable>
        </ImageBackground>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{translateY: -25}],
          }}>
          <ButtonGroup
            status="basic"
            style={{
              borderRadius: 10,
              borderWidth: 3,
              borderColor: 'white',
              backgroundColor: 'white',
              zIndex: 9999,
            }}>
            <Button
              // @ts-ignore
              disabled={!productCart && productCart?.quantity <= 0}
              onPress={() => {
                if (productCart) {
                  updateProductQuantity({
                    product: productCart?.product,
                    quantity: -1,
                  });
                }
              }}>
              -
            </Button>
            <Button
              style={{
                backgroundColor: 'white',
                borderColor: 'white',
                borderWidth: 0,
              }}>
              {/* @ts-ignore */}
              {productCart?.quantity > 0 ? productCart?.quantity : '0'}
            </Button>
            <Button
              onPress={() => {
                if (productCart) {
                  updateProductQuantity({
                    product: productCart?.product,
                    quantity: +1,
                  });
                } else {
                  addProductToCart({product: item!, quantity: 1});
                }
              }}>
              +
            </Button>
          </ButtonGroup>
        </View>
        <Modal
          animationType="fade"
          visible={photoOpen}
          transparent={true}
          onRequestClose={() => setPhotoOpen(false)}>
          <View style={styles.modal_container}>
            <Pressable
              style={styles.close_button}
              onPress={() => setPhotoOpen(false)}>
              <Image
                source={{
                  uri: StorageService.getPhotoByFilename(item!.imageUrl),
                }}
                style={styles.full_screen}
              />
            </Pressable>
          </View>
        </Modal>
        <View style={{padding: 20, gap: 10}}>
          <View>
            <Text style={{}}>{item?.category}</Text>
            <Text style={{fontWeight: '600', fontSize: 25, color: 'black'}}>
              {item?.name}
            </Text>
          </View>
          <Text style={styles.product_description}>{item?.description}</Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
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
              color: 'black',
              textAlignVertical: 'center',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {currencyFormat(+item?.priceUnitary)}
          </Text>
          <Button
            style={{borderRadius: 50}}
            onPress={handleAddToCart}
            disabled={loading}
            status="success">
            <Text style={styles.buy_product_text}>
              {loading ? 'CARGANDO...' : 'AÑADIR AL CARRITO'}
            </Text>
          </Button>
          <Button
            status="danger"
            style={{borderRadius: 50, height: 25, width: 25}}>
            <CustomIcon white name="heart" />
          </Button>
        </View>
      </View>

      <Modal
        style={styles.modal}
        visible={modal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModal(false)}>
        <View style={styles.modal_content}>
          <View style={styles.modal_mask}>
            <Text style={styles.modal_title}>
              {item?.name} añadido al carrito
            </Text>
            <View style={{alignItems: 'center'}}>
              {/* <CustomIcon name="checkmark-circle-2-outline" color={'#3fc1f2'} /> */}
            </View>
            <View style={styles.modal_buttons}>
              <Pressable
                style={styles.modal_button}
                onPress={() => {
                  setModal(false);
                  navigation.navigate('ProductsCartScreen');
                }}>
                <Text style={styles.modal_button_text}>Ir al carrito</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.modal_button,
                  {
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#3fc1f2',
                  },
                ]}
                onPress={() => setModal(false)}>
                <Text style={[styles.modal_button_text, {color: '#3fc1f2'}]}>
                  Ok
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  ) : (
    <LoadingScreen />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingTop: 25,
  },
  container_product: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
  },
  product_name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  product_description: {
    fontSize: 16,
    color: 'gray',
  },
  product_price: {
    fontSize: 20,
    color: 'gray',
  },
  product_rating: {
    fontSize: 20,
    color: 'gray',
  },
  buy_product_container: {
    position: 'absolute',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    bottom: 0,
    width: '100%',
    paddingVertical: 20,
    gap: 30,
  },
  buy_product_button: {
    width: '95%',
    borderRadius: 25,
    backgroundColor: '#3fc1f2',
    padding: 20,
    alignSelf: 'center',
  },
  buy_product_text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  modal_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  close_button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  full_screen: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  arrow_back_button: {
    zIndex: 99,
    position: 'absolute',
    top: '5%',
    left: '3%',
    width: 50,
    height: 50,
    borderColor: '#3fc1f2',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
  },
  cart_button: {
    zIndex: 99,
    position: 'absolute',
    top: '5%',
    right: '3%',
    width: 50,
    height: 50,
    borderColor: '#3fc1f2',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  modal_content: {
    backgroundColor: '#0006',
    height: '100%',
    justifyContent: 'center',
    margin: 'auto',
    marginHorizontal: 0,
    borderRadius: 10,
    alignItems: 'center',
  },
  modal_mask: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
    gap: 30,
  },
  modal_title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '600',
    color: '#3fc1f2',
  },
  modal_buttons: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_button: {
    backgroundColor: '#3fc1f2',
    width: '100%',
    padding: 20,
    borderRadius: 25,
  },
  modal_button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
