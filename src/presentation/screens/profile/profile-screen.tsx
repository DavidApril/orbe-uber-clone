import {
  CouponsScreen,
  MyCardsScreen,
  ProfileClientScreen,
  ProfileWorkerScreen,
} from '..';
import {CLIENT, DELIVERY, DRIVER, RootStackParams} from '../../../interfaces';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useAuthStore} from '../../../store';

const {Screen, Navigator} = createMaterialTopTabNavigator<RootStackParams>();

export const ProfileScreen = (): React.ReactElement => {
  const {role} = useAuthStore();

  return (
    <Navigator
    // tabBar={props => <CustomTopBar {...props} />}
    >
      {role === CLIENT && (
        <Screen
          options={{
            title: 'award',
          }}
          name="ProfileClientScreen"
          component={ProfileClientScreen}
        />
      )}

      {role === DRIVER ||
        (role === DELIVERY && (
          <Screen
            options={{
              title: 'award',
            }}
            name="ProfileWorker"
            component={ProfileWorkerScreen}
          />
        ))}

      <Screen
        options={{
          title: 'archive-outline',
        }}
        name="MyCardsScreen"
        component={MyCardsScreen}
      />
    </Navigator>
  );
};
