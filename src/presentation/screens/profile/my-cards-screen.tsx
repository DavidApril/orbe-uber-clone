import {
  AddCardButton,
  BSAddCreditCard,
  CreditCardSelector,
  CView,
  TextHeaderScreen,
} from '../../components';

import {usePaymentStore} from '../../../store';
import {
  Image,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import {globalDimensions} from '../../theme/styles';

export const MyCardsScreen = () => {
  const {addTarjetBottomSheetRef} = usePaymentStore();
  const {height} = useWindowDimensions();

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{
          zIndex: -10,
        }}>
        <Image
          source={require('../../../assets/dark-gradient.jpg')}
          style={{
            position: 'absolute',

            width: '100%',
            height,
          }}
        />
      </ImageBackground>
      <ScrollView
        style={{
          height,
        }}>
        <TextHeaderScreen
          paddingTop={30}
          title="Tus tarjetas"
          description="Aquí puedes agregar o eliminar tus de pagos"
        />

        <CreditCardSelector
          showAddButton={false}
          horizontal={false}
          onAddButtonPress={() => addTarjetBottomSheetRef?.current?.expand()}
        />
        <AddCardButton
          onAddButtonPress={() => addTarjetBottomSheetRef?.current?.expand()}
        />
      </ScrollView>

      <BSAddCreditCard />
    </View>
  );
};
