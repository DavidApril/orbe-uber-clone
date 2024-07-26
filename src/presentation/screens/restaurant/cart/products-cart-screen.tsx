import {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  Modal,
} from 'react-native';

import {RootStackParams} from '../../../../interfaces';
import {StackScreenProps} from '@react-navigation/stack';
import {useCartStore} from '../../../../store';
import {
  CartItem,
  FAB,
  FABGoBackButton,
  FABShoppingCart,
  OpenDrawerMenu,
  PaymentControllers,
} from '../../../components';
import {globalColors} from '../../../theme/styles';
import BottomSheet from '@gorhom/bottom-sheet';
import {Layout, List} from '@ui-kitten/components';

interface Props
  extends StackScreenProps<RootStackParams, 'ProductsCartScreen'> {}

export const ProductsCartScreen = ({navigation}: Props) => {
  const [shipping] = useState(3000);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const summaryBottomSheetRef = useRef<BottomSheet>(null);

  const {cart, getSummaryInformation} = useCartStore();
  const {itemsInCart, subTotal, tax, total} = getSummaryInformation();

  const snapPoints = useMemo(() => ['15%', '70%'], []);

  return cart.length > 0 ? (
    <Layout style={{flex: 1, paddingTop: 70, padding: 20}}>
      <OpenDrawerMenu left={20} />
      <FABGoBackButton style={{backgroundColor: 'white', right: 20, top: 20}} />
      <FABShoppingCart
        onPressFunction={() => summaryBottomSheetRef.current?.expand()}
      />

      <ScrollView>
        <FlatList
          style={{
            flexDirection: 'column',
            gap: 10,
          }}
          data={cart}
          keyExtractor={item => item.product.id.toString()}
          renderItem={({item}) => (
            <CartItem item={{product: item.product, quantity: item.quantity}} />
          )}
        />
      </ScrollView>

      <BottomSheet
        ref={summaryBottomSheetRef}
        enableDynamicSizing
        style={{borderRadius: 40, paddingTop: 20}}
        snapPoints={snapPoints}>
        <List
          style={{backgroundColor: globalColors.backgroundContrast}}
          data={cart}
          renderItem={({item}) => (
            <CartItem item={{product: item.product, quantity: item.quantity}} />
          )}
        />

        <PaymentControllers
          itemsInCart={itemsInCart}
          tax={tax}
          subtotal={subTotal}
          total={total}
          shipping={0}
        />
      </BottomSheet>

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
    </Layout>
  ) : (
    <View style={[styles.container, styles.emptyCartContainer]}>
      <FAB
        white
        style={{right: 20, top: 20, backgroundColor: globalColors.primary}}
        iconName="arrow-back"
        onPress={() => navigation.goBack()}
      />
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
