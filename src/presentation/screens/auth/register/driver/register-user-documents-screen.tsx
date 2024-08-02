import {
  CView,
  TextHeaderScreen,
  UploadImageInput,
} from '../../../../components';
import {ScrollView} from 'react-native';
import {useAuthStore} from '../../../../../store';
import {useEffect} from 'react';

interface Props {
  onPress: (params: any | never) => void;
  label: string;
  icon?: string;
}
export const RegisterUserDocumentsScreen = () => {
  const {addWorkerDocument} = useAuthStore();

  return (
    <CView style={{flex: 1}}>
      <ScrollView>
        <TextHeaderScreen
          paddingTop={30}
          title="Registro de documentos"
          description="Ingresa todos los documentos para registrarte correctamente"
        />
        <UploadImageInput
          setImageUrl={imageUrl =>
            addWorkerDocument({
              type: 'Registro Único Tributario',
              description: `Esta es una imagen del registro único tributario del usuario`,
              imageUrl,
            })
          }
          documentName="Registro Único Tributario"
          description="RUT"
        />

        <UploadImageInput
          setImageUrl={imageUrl =>
            addWorkerDocument({
              type: 'Tarjeta de propiedad',
              description: `Esta es una imagen de la tarjeta de propiedad del usuario`,
              imageUrl,
            })
          }
          documentName="Tarjeta de propiedad"
          description="La licencia de tránsito"
        />

        <UploadImageInput
          setImageUrl={imageUrl =>
            addWorkerDocument({
              type: 'Cédula',
              description: `Esta es una imagen de la cédula del usuario`,
              imageUrl,
            })
          }
          documentName="Cédula"
          description="CC"
        />
      </ScrollView>
    </CView>
  );
};
