import {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  Image,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import {LoadingScreen} from '../../loading/loading-screen';
import {RootStackParams} from '../../../../interfaces';
import {StackScreenProps} from '@react-navigation/stack';
import {useShoppingCartStore} from '../../../../store';
import {currencyFormat} from '../../../../utils';
import {StorageService} from '../../../../services';
import {CustomIcon} from '../../../components';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const ProductsCartScreen = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);

  const {productsInCart, deleteProduct, addProduct, increaseDecrementCount} =
    useShoppingCartStore();

  return productsInCart.length > 0 ? (
    <View style={styles.container}>
      <Text style={styles.productCount}>
        {productsInCart.length}{' '}
        {productsInCart.length > 1 ? 'productos' : 'producto'} en el carrito
      </Text>
      <ScrollView style={styles.scrollView}>
        <FlatList
          style={styles.flatList}
          data={productsInCart}
          keyExtractor={item => item.product.id.toString()}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Image
                source={{
                  uri: StorageService.getPhotoByFilename(item.product.imageUrl),
                }}
                style={styles.image}
              />
              <View style={styles.productInfo}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.productName}>{item.product.name}</Text>
                  <Pressable
                    // onPress={() => openModal(item)}
                    style={styles.removeButton}>
                    {/* <Ionicons
											name='trash'
											size={25}
											color={'#3fc1f2'}
										/> */}
                  </Pressable>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>
                    {currencyFormat(+item.product.priceUnitary)}
                  </Text>
                  <View style={styles.counterContainer}>
                    <Pressable
                      disabled={item.count <= 0}
                      style={[
                        styles.button,
                        item.count > 0
                          ? styles.buttonActive
                          : styles.buttonInactive,
                      ]}
                      onPress={() =>
                        increaseDecrementCount(item.product.id.toString(), -1)
                      }>
                      <CustomIcon white name="arrow-ios-back" />
                    </Pressable>
                    <Text style={styles.textCount} key={item.product.id}>
                      {item.count}
                    </Text>
                    <Pressable
                      style={styles.button}
                      onPress={() =>
                        increaseDecrementCount(item.product.id.toString(), +1)
                      }>
                      <CustomIcon white name="arrow-ios-forward" />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notas</Text>
          <TextInput
            placeholder="Ingrese sus notas aqui"
            placeholderTextColor={'gray'}
            numberOfLines={4}
            multiline
            style={styles.notesInput}
          />
        </View>
      </ScrollView>
      <View style={styles.containerBuy}>
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalLabel}>SubTotal:</Text>
          {/* <Text style={styles.priceFinal}>${subtotal.toFixed(2)}</Text> */}
        </View>
        <Pressable
          // onPress={handleConfirmBuyProduct}

          style={[
            styles.buyProductButton,
            // subtotal > 0 ? styles.buttonActive : styles.buttonInactive,
          ]}
          // disabled={subtotal <= 0}
        >
          <Text style={styles.buyProductText}>COMPRAR</Text>
        </Pressable>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        // onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              ¿Desea eliminar este producto del carrito?
            </Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={styles.modalButtonYes}
                // onPress={confirmRemoveProduct}
              >
                <Text style={styles.modalButtonText}>SI</Text>
              </Pressable>
              <Pressable
                style={styles.modalButtonNo}
                // onPress={closeModal}
              >
                <Text style={styles.modalButtonTextNo}>NO</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalConfirm}
        transparent={true}
        animationType="fade"
        // onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              ¿Desea realizar pedido de este producto?
            </Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={styles.modalButtonYes}
                // onPress={handleBuyProduct}
              >
                <Text style={styles.modalButtonText}>SI</Text>
              </Pressable>
              <Pressable
                style={styles.modalButtonNo}
                onPress={() => {
                  setModalConfirm(false);
                }}>
                <Text style={styles.modalButtonTextNo}>NO</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  ) : (
    <View style={[styles.container, styles.emptyCartContainer]}>
      <Text>No hay productos en el carrito.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartContainer: {
    justifyContent: 'center',
  },
  productCount: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'right',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  scrollView: {
    height: '100%',
    width: '100%',
  },
  flatList: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  productInfo: {
    gap: 20,
    width: '60%',
  },
  productName: {
    fontWeight: '600',
    fontSize: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    gap: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: '500',
  },
  counterContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3fc1f2',
    width: 35,
    height: 35,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#3fc1f2',
  },
  buttonInactive: {
    backgroundColor: '#3fc1f255',
  },
  textCount: {
    fontSize: 20,
  },
  notesContainer: {
    padding: 20,
    width: '100%',
    gap: 10,
  },
  notesLabel: {
    color: '#888',
    fontSize: 16,
  },
  notesInput: {
    backgroundColor: '#ddd',
    height: 200,
    borderRadius: 10,
    padding: 20,
  },
  containerBuy: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    paddingVertical: 20,
    width: '100%',
    justifyContent: 'center',
    gap: 20,
    zIndex: 999,
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  subtotalLabel: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  priceFinal: {
    fontSize: 20,
    marginHorizontal: 20,
    color: '#777',
  },
  buyProductButton: {
    width: '90%',
    borderRadius: 25,
    padding: 20,
    alignSelf: 'center',
  },
  buyProductText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#0006',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalButtonYes: {
    backgroundColor: '#3fc1f2',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalButtonNo: {
    backgroundColor: '#aaa',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonTextNo: {
    color: 'white',
    fontWeight: 'bold',
  },
});
