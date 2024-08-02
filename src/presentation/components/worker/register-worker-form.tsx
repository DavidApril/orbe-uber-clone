import {Formik} from 'formik';
import {Image, Pressable, TextInput, View} from 'react-native';
import {globalDimensions, neutralColors, stateColors} from '../../theme/styles';
import {
  CViewAlpha,
  CTextHeader,
  CInput,
  CButton,
  CView,
  CustomIcon,
  CText,
} from '../../components';
import uuid from 'react-native-uuid';
import {DRIVER, RootStackParams, WorkerRegisterForm} from '../../../interfaces';
import {useState} from 'react';
import {StorageService, WorkerService} from '../../../services';
import {CameraAdapter} from '../../../config/adapters';
import {useNavigation} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {parseError} from '../../../utils';

export const RegisterWorkerForm = () => {
  const navigation =
    useNavigation<
      MaterialTopTabNavigationProp<RootStackParams, 'RegisterWorkerScreen'>
    >();
  const [image, setImage] = useState<string>('');
  const [workerIsCreated, setWorkerIsCreated] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  // const validationSchema = Yup.object({
  //   firstName: Yup.string().required(),
  //   lastName: Yup.string().required(),
  //   identification: Yup.string().required(),
  //   phone: Yup.string().required(),
  //   email: Yup.string().required().email(),
  //   password: Yup.string().required(),
  //   confirmPassword: Yup.string()
  //     .required()
  //     // @ts-ignore
  //     .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  // });

  const initialValues: WorkerRegisterForm = {
    firstName: '',
    lastName: '',
    identification: '',
    phone: '',
    email: '',
    image: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      console.log('aquí');
      const formData = new FormData();
      formData.append('file', image);
      formData.append('fileName', uuid.v4());
      formData.append('directory', 'profile');

      await StorageService.uploadPhoto(formData);

      await WorkerService.create(
        values,
        DRIVER,
        // @ts-ignore
        image[0].uri.split('/').reverse()[0],
      );

      navigation.navigate('RegisterUserDocumentsScreen');
    } catch (error) {
      parseError('error at upload image', error);
      setWorkerIsCreated(false);
      console.log('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({values, handleChange, handleSubmit}) => (
        <>
          <CViewAlpha
            style={{
              margin: 30,
              padding: 30,
              borderRadius: globalDimensions.cardBorderRadius,
              height: 'auto',
            }}>
            <CTextHeader style={{fontSize: 15, marginBottom: 15}}>
              Información básica
            </CTextHeader>

            <View style={{flexDirection: 'column', gap: 15}}>
              <View style={{flexDirection: 'row', gap: 5}}>
                <CInput
                  value={values.firstName}
                  handleValue={handleChange('firstName')}
                  label="Nombres"
                />
                <CInput
                  value={values.lastName}
                  handleValue={handleChange('lastName')}
                  label="Apellidos"
                />
              </View>

              <CInput
                value={values.identification}
                handleValue={handleChange('identification')}
                label="No. Identificación"
              />

              <CInput
                value={values.email}
                handleValue={handleChange('email')}
                keyboardType="email-address"
                label="Correo electrónico"
              />

              <View
                style={{flexDirection: 'row', alignItems: 'flex-end', gap: 5}}>
                <CInput
                  value={values.password}
                  handleValue={handleChange('password')}
                  secureTextEntry={!passwordShown}
                  autoCapitalize="none"
                  label="Contraseña"
                />
                <Pressable
                  onPress={() => setPasswordShown(!passwordShown)}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: passwordShown
                      ? stateColors.success
                      : neutralColors.textInputBackgroundDark,
                  }}>
                  <CustomIcon
                    name={passwordShown ? 'eye' : 'eye-off-outline'}
                  />
                </Pressable>
              </View>
            </View>
          </CViewAlpha>

          <CViewAlpha
            style={{
              marginHorizontal: 30,
              padding: 30,
              borderRadius: globalDimensions.cardBorderRadius,
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 35,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CView
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {!image ? (
                  <CustomIcon name="camera" />
                ) : (
                  <Image
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 100,
                    }}
                    source={{
                      uri: StorageService.getPhotoFromCache(image),
                    }}
                  />
                )}
              </CView>

              <View style={{flexDirection: 'column', flex: 1, gap: 10}}>
                <View>
                  <CTextHeader style={{fontSize: 20}}>Perfil</CTextHeader>
                  <CText>Esta será tu imagen de perfil</CText>
                </View>

                <View style={{flexDirection: 'row', gap: 5}}>
                  <CButton
                    label="Abrir cámara"
                    onPress={async () => {
                      const picture = await CameraAdapter.takePicture();
                      setImage(picture[0]);
                    }}
                  />
                </View>
              </View>
            </View>
          </CViewAlpha>

          <View style={{margin: 30, height: 50}}>
            <CButton
              isLoading={isLoading}
              disabled={!image}
              onPress={handleSubmit}
              label="Registar"
            />
          </View>
        </>
      )}
    </Formik>
  );
};
