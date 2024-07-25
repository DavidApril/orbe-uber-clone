import {
  Text,
  Image,
  StyleSheet,
  Pressable,
  ImageBackground,
  Modal,
  View,
} from 'react-native';
import {useState} from 'react';
import {Button, ButtonGroup, Layout} from '@ui-kitten/components';
import {CustomIcon, FAB, OpenDrawerMenu} from '../../../components';
import {RootStackParams} from '../../../../interfaces';
import {StackScreenProps} from '@react-navigation/stack';
import {useRestaurantStore} from '../../../../store/restaurant/restaurant';

import {LoadingScreen} from '../../loading/loading-screen';
import {globalColors} from '../../../theme/styles';
import {StorageService} from '../../../../services';
import {currencyFormat} from '../../../../utils';
import {useShoppingCartStore} from '../../../../store';

interface Props
  extends StackScreenProps<RootStackParams, 'ProductItemScreen'> {}

export const ProductItemScreen = ({navigation}: Props) => {
  const [photoOpen, setPhotoOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {productSelected: product} = useRestaurantStore();
  const {addProduct} = useShoppingCartStore();

  if (!product) {
    return <LoadingScreen />;
  }

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addProduct(product!, 1);
      setModal(true);
    }, 2000);
  };

  return (
    <Layout>
      <OpenDrawerMenu left={20} />
      <FAB
        style={{right: 20, top: 20, backgroundColor: globalColors.white}}
        iconName="arrow-back"
        onPress={() => navigation.goBack()}
      />

      <FAB
        style={{right: 80, top: 20, backgroundColor: globalColors.white}}
        iconName="shopping-cart"
        onPress={() => navigation.navigate('ProductsCartScreen')}
      />

      <Layout style={styles.container_product}>
        <ImageBackground
          style={{
            height: '50%',
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
                uri: StorageService.getPhotoByFilename(product!.imageUrl),
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
            <Button style={{borderWidth: 0}}>-1</Button>
            <Button
              style={{
                backgroundColor: 'white',
                borderColor: 'white',
                borderWidth: 0,
              }}>
              0
            </Button>
            <Button>+1</Button>
          </ButtonGroup>
        </View>
        <Modal
          animationType="fade"
          visible={photoOpen}
          transparent={true}
          onRequestClose={() => setPhotoOpen(false)}>
          <Layout style={styles.modal_container}>
            <Pressable
              style={styles.close_button}
              onPress={() => setPhotoOpen(false)}>
              <Image
                source={{
                  uri: StorageService.getPhotoByFilename(product!.imageUrl),
                }}
                style={styles.full_screen}
              />
            </Pressable>
          </Layout>
        </Modal>
        <Layout style={{padding: 20, gap: 10}}>
          <Layout>
            <Text style={{}}>{product?.category}</Text>
            <Text style={{fontWeight: '600', fontSize: 25, color: 'black'}}>
              {product?.name}
            </Text>
          </Layout>
          <Text style={styles.product_description}>{product?.description}</Text>
        </Layout>
      </Layout>
      <Layout
        style={{
          position: 'absolute',
          bottom: 0,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
        }}>
        <Layout
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
            {currencyFormat(+product?.priceUnitary)}
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
          <Button status='danger' style={{ borderRadius: 50, height: 25, width: 25 }}>
            <CustomIcon white name='heart'/> 
          </Button>
        </Layout>
      </Layout>

      <Modal
        style={styles.modal}
        visible={modal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModal(false)}>
        <Layout style={styles.modal_content}>
          <Layout style={styles.modal_mask}>
            <Text style={styles.modal_title}>
              {product?.name} añadido al carrito
            </Text>
            <Layout style={{alignItems: 'center'}}>
              {/* <CustomIcon name="checkmark-circle-2-outline" color={'#3fc1f2'} /> */}
            </Layout>
            <Layout style={styles.modal_buttons}>
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
            </Layout>
          </Layout>
        </Layout>
      </Modal>
    </Layout>
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
