import React from 'react';
import {Modal, View} from 'react-native';
import {usePaymentStore, useUIStore} from '../../../store';
import {neutralColors} from '../../theme/styles';
import {Spinner} from '@ui-kitten/components';
import {CTextHeader} from '../ui/custom-text-header';
import {CText} from '../ui/custom-text';

export const ModalPaying = () => {
  const {isDarkMode} = useUIStore();
  const {isPaying} = usePaymentStore();

  return (
    <Modal
      visible={isPaying}
      transparent
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          opacity: 0.9,
          // margin: 30,
          // backgroundColor: 'tranparent',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDarkMode
            ? neutralColors.backgroundDarkAlpha
            : neutralColors.backgroundAlpha,
        }}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              transform: [{scale: 3}],
              margin: 40,
            }}>
            <Spinner status="success" />
          </View>
        </View>
        <View>
          <CTextHeader
            style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>
            Realizando pago
          </CTextHeader>
          <CText style={{fontSize: 24, textAlign: 'center'}}>
            Porfavor, espera que concluya la transacción
          </CText>
        </View>
        {/* <Text></Text> */}
      </View>
    </Modal>
  );
};
