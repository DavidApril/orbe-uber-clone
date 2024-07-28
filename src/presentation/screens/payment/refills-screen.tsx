import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  CModal,
  CreditCard,
  CText,
  CTextHeader,
  CustomIcon,
  CView,
  CViewAlpha,
  OpenDrawerMenu,
  TransactionItemTraidingDown,
  TransactionItemTraidingUp,
} from '../../components';
import {useUIStore} from '../../../store';
import {globalColors, globalDimensions, stateColors} from '../../theme/styles';
import {
  currencyFormat,
  parseNumberToText,
  parseTextToNumber,
} from '../../../utils';

export const RefillsScreen = () => {
  const {isDarkMode} = useUIStore();
  const [isOpenRefillModal, setIsOpenRefillModals] = useState<boolean>(false);
  const [refillValue, setRefillValue] = useState<number>(0);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? globalColors.neutralColors.backgroundDark
          : globalColors.neutralColors.background,
      }}>
      <CView style={{flex: 1, paddingTop: 100, paddingHorizontal: 30}}>
        <OpenDrawerMenu />
        <CTextHeader style={{fontSize: 20, fontWeight: 'bold'}}>
          Cuentas
        </CTextHeader>
        <CViewAlpha
          style={{
            marginVertical: 15,
            height: 200,
            padding: 30,
            borderRadius: globalDimensions.cardBorderRadius,
          }}>
          <View>
            <CView
              style={{
                height: 45,
                width: 45,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomIcon name="trending-up-outline" />
            </CView>
            <CTextHeader style={{fontSize: 35, fontWeight: 'bold'}}>
              1.430.300
              <CText style={{fontSize: 18, fontWeight: 'normal'}}>cop</CText>
            </CTextHeader>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Pressable
              onPress={() => setIsOpenRefillModals(true)}
              style={{
                // width: 100,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: globalColors.stateColors.success,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <CustomIcon fill="white" name="plus-circle-outline" />
                <Text style={{fontWeight: 'bold'}}>Recargar</Text>
              </View>
            </Pressable>
          </View>
        </CViewAlpha>

        <CText style={{marginBottom: 5, paddingLeft: 12}}>Transacciones</CText>

        <FlatList
          data={[0, 1]}
          style={{height: 400}}
          renderItem={() => <TransactionItemTraidingDown />}
        />

        <CModal isOpen={isOpenRefillModal} setIsOpen={setIsOpenRefillModals}>
          <CViewAlpha
            style={{
              height: '75%',
              width: '90%',
              borderRadius: 20,
              padding: 30,
            }}>
            <TextInput
              value={`${parseNumberToText(refillValue)}`}
              keyboardType="numeric"
              onChangeText={value =>
                setRefillValue(parseTextToNumber(value ? value : '0'))
              }
              cursorColor={globalColors.primaryColors.primary}
              placeholderTextColor={
                isDarkMode
                  ? globalColors.fontColor.textColorDark
                  : globalColors.fontColor.textColor
              }
              style={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                fontSize: 60,
                textAlign: 'right',
                fontWeight: 'bold',
                letterSpacing: 2,
              }}
            />

            <View
              style={[
                {
                  height: 1,
                  width: '100%',
                  backgroundColor: isDarkMode ? '#424241' : 'white',
                  borderRadius: 50,
                  marginBottom: 40,
                },
                // globalStyles.boxShadow,
                {
                  shadowColor: '#000000',
                  shadowOffset: {
                    width: 20,
                    height: 10,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 0.1,
                  elevation: 5,
                },
              ]}
            />

            <CTextHeader style={{fontSize: 20, fontWeight: 'bold'}}>
              Método
            </CTextHeader>
            <View>
              <FlatList
                data={[0, 1]}
                horizontal
                renderItem={() => <CreditCard />}
              />
            </View>

            <Pressable
              style={{
                overflow: 'hidden',
                height: 50,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
                backgroundColor: stateColors.success,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>Recargar</Text>
            </Pressable>
            <Pressable
              onPress={() => setIsOpenRefillModals(false)}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 30,
                left: 30,
                height: 50,
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  color: isDarkMode ? 'white' : 'black',
                }}>
                Cerrar
              </Text>
            </Pressable>
          </CViewAlpha>
        </CModal>
      </CView>
    </ScrollView>
  );
};
