import {Layout} from '@ui-kitten/components';
import {View} from 'react-native';
import {FAB} from '../../ui/floating-action-button';
import {useCartStore} from '../../../../store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../../../interfaces';
import BottomSheet from '@gorhom/bottom-sheet';
import {useRef} from 'react';

interface Props {
  onPressFunction: (params?: any) => void;
}

export const FABShoppingCart = ({onPressFunction}: Props) => {
  // const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {cartNews, setCartNews} = useCartStore();

  return (
    <Layout
      style={{
        zIndex: 1,
        position: 'absolute',
        borderRadius: 100,
        height: 30,
        width: 30,
        top: 20,
        right: 80,
      }}>
      <FAB
        iconName="shopping-cart"
        style={{backgroundColor: 'white'}}
        onPress={() => {
          setCartNews(false);
          onPressFunction();
        }}
      />
      {cartNews && (
        <View
          style={{
            height: 15,
            width: 15,
            borderRadius: 100,
            position: 'absolute',
            backgroundColor: 'red',
            top: -5,
            right: -10,

            zIndex: 999999,
          }}></View>
      )}
    </Layout>
  );
};
