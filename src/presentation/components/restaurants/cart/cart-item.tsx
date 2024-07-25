import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {StorageService} from '../../../../services';
import {ProductRestaurant} from '../../../../interfaces';


interface Props {
  item: {
    product: ProductRestaurant;
    quantity: number;
  };
}

export const CartItem = ({item}: Props) => {
  return (
    <View
      style={{
        margin: 7,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000000',
        borderWidth: 1,
        borderColor: '#eeeeee',
        padding: 10,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 2,
        // height: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 10,
      }}>
      <Image
        source={{
          uri: StorageService.getPhotoByFilename(item.product.imageUrl),
        }}
        style={{height: 80, width: 80, borderRadius: 100}}
      />
      <View>
       
        

      </View>
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
