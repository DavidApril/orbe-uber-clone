import {ScrollView} from 'react-native';
import {
  CView,
  TextHeaderScreen,
  RegisterWorkerForm,
} from '../../../../components';

export const RegisterWorkerScreen = () => {
  return (
    <CView style={{flex: 1}}>
      <ScrollView>
        <TextHeaderScreen
          paddingTop={30}
          title="Formulario de registro"
          description="Ingresa todos tus datos para continuar"
        />

        <RegisterWorkerForm />
      </ScrollView>
    </CView>
  );
};
