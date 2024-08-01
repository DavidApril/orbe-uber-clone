import {useAuthStore} from '../../../../../store';
import {SectionDisplayEditDataDriver} from './section-display-edit-data-driver';
import {RegisterWorkerScreen} from './register-worker-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RootStackParams} from '../../../../../interfaces';
import {RegisterVehiclesDocumentsScreen} from './register-vehicle-documents-screen';
import {RegisterUserDocumentsScreen} from './register-user-documents-screen';

const {Screen, Navigator} = createMaterialTopTabNavigator<RootStackParams>();

export const RegisterDriverScreen = () => {
  const {registerForm, image_url} = useAuthStore();

  return (
    <Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarBounces: true,
        tabBarIndicatorContainerStyle: {
          width: '100%',
        },
      }}>
      <Screen name="RegisterClientScreen" component={RegisterWorkerScreen} />
      <Screen
        name="RegisterUserDocumentsScreen"
        component={RegisterUserDocumentsScreen}
      />
      <Screen
        name="RegisterVehiclesDocumentsScreen"
        component={RegisterVehiclesDocumentsScreen}
      />
      <Screen
        name="RegisterEditScreen"
        component={SectionDisplayEditDataDriver}
      />
    </Navigator>
  );
};
