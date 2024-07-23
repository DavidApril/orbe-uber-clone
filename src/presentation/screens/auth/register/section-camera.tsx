import {Button, Layout, Text} from '@ui-kitten/components';
import { useAuthStore } from '../../../../store';
import { CameraAdapter } from '../../../../config/adapters';
import { CustomIcon } from '../../../components';

export const SectionCamera = () => {
  const { registerImage } = useAuthStore();
  
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Layout>
        <Text category="h1">Perfil</Text>
        <Text category="p2">Empieza a modificar los datos de tu perfil</Text>
      </Layout>

      <Layout style={{height: 40}}></Layout>

      <Layout style={{flexDirection: 'row', gap: 5}}>
        <Button
          onPress={async () => {
            const photo = await CameraAdapter.getPictureFromLibrary();
            registerImage(photo[0].split('/').reverse()[0]);
          }}
          accessoryLeft={<CustomIcon white name="image-outline" />}>
          Subir una foto
        </Button>

        <Button
          onPress={async () => {
            const photo = await CameraAdapter.takePicture();
            registerImage(photo[0].split('/').reverse()[0]);
          }}
          accessoryLeft={<CustomIcon white name="camera-outline" />}>
          Tomar una foto
        </Button>
      </Layout>
    </Layout>
  );
};
