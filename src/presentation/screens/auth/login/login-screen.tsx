import {StackScreenProps} from '@react-navigation/stack';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {useEffect, useRef, useState} from 'react';
import {Animated, Image, Pressable, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParams} from '../../../navigation/stack-navigation';
import {useAuthStore} from '../../../../store/auth/auth.store';
import {CustomIcon} from '../../../components';
import { globalColors } from '../../../theme/styles';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<{email: string; password: string}>({
    email: '',
    password: '',
  });
  

  async function onLogin() {
    if (form.email.length === 0 || form.password.length === 0) return;

    setIsLoading(true);
    const {ok} = await login(form.email, form.password);
    setIsLoading(false);
  }

  const {height} = useWindowDimensions();

  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 360,
        duration: 2000,
        useNativeDriver: true,
      })
    );

    rotateAnimation.start();
  }, [rotateValue]);

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg']
  });

  const rotateStyle = {
    transform: [{ rotate: rotateInterpolation }]
  };

  const [focus, setFocus] = useState<boolean>(false)
  const [inputPosition, setInputPosition] = useState<any>('')

  const handleInputBorder = (focused: boolean, inputPosition?: string) => {
    setFocus(focused)
    setInputPosition(inputPosition)
  }


  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 30}}>
        <Layout style={{paddingTop: height * 0.25, paddingBottom: 40, flexDirection: 'row', gap: 20}}>
          <Animated.Image
            style={[{
              height: 80,
              width: 80,
            }, rotateStyle]}
            source={require('../../../../assets/loading.png')}
          />

          <Layout>
            <Text category="h1">Ingresar</Text>
            <Text category="p2">Por favor, ingrese para continuar</Text>
          </Layout>
        </Layout>

        {/* Inputs */}
        <Layout style={{marginTop: 10}}>
          <Input
            value={form.email}
            onFocus={() => {handleInputBorder(true, 'input1')}}
            onBlur={() => {handleInputBorder(false)}}
            onChangeText={value => setForm({...form, email: value})}
            accessoryLeft={<CustomIcon name="email-outline" />}
            placeholder="Correo eléctronico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={[{marginBottom: 10, borderRadius: 20}, focus && inputPosition === 'input1' ? {borderWidth: 1, borderColor: globalColors.primary} : null]}
          />
          <Input
            value={form.password}
            onFocus={() => {handleInputBorder(true, 'input2')}}
            onBlur={() => {handleInputBorder(false)}}
            onChangeText={value => setForm({...form, password: value})}
            accessoryLeft={<CustomIcon name="lock-outline" />}
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            style={[{marginBottom: 10, borderRadius: 20}, focus && inputPosition === 'input2' ? {borderWidth: 1, borderColor: globalColors.primary} : null]}
          />
        </Layout>

        {/* Space */}
        <Layout style={{height: 60}}></Layout>

        {/* Button */}
        <Layout style={{alignItems: 'center'}}>
          <Pressable disabled={isLoading} onPress={onLogin}>
            <Text style={{color: globalColors.primary, fontWeight: 'bold'}}>Ingresar</Text>
          </Pressable>
        </Layout>

        {/* Space */}
        <Layout style={{height: 100}}></Layout>

        {/* Not have account */}
        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>¿No tienes cuenta?</Text>
          <Text
            style={{color: globalColors.primary}}
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}>
            {' '}
            crea una aquí
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
