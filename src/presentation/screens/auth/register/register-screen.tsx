import {useEffect, useState} from 'react';
import {Layout, Button} from '@ui-kitten/components';
import {StackScreenProps} from '@react-navigation/stack';
import {
  CLIENT,
  DRIVER,
  DELIVERY,
  RootStackParams,
} from '../../../../interfaces';
import {SelectRoleAccount} from './select-role-account';
import {registerRoutesByRoleMapper} from '../../../../utils';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

const ROLE_LIST_WITH_DESCRIPTIONS: {
  name: CLIENT | DRIVER | DELIVERY;
  description: string;
  iconName: string;
}[] = [
  {
    name: 'CLIENTE',
    description:
      'Usuario convencional que busca servicios de transporte y/o reparto',
    iconName: 'person-outline',
  },
  {
    name: 'DRIVER',
    description: 'Desea prestar servicios automovilísticos',
    iconName: 'car-outline',
  },
  {
    name: 'DELIVERY',
    description: 'Desea prestar servicios de reparto y/o favores',
    iconName: 'shopping-bag-outline',
  },
];

export const RegisterScreen = ({navigation}: Props) => {
  const [role, setRole] = useState<CLIENT | DRIVER | DELIVERY | null>(null);

  useEffect(() => {
    if (role) {
      navigation.navigate(registerRoutesByRoleMapper[role]);
    }
  }, [role]);

  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: 'column',
        gap: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
      }}>
      <SelectRoleAccount
        setRole={setRole}
        roles={ROLE_LIST_WITH_DESCRIPTIONS}
      />
      {/* <Button
        status="basic"
        onPress={() => navigation.pop()}
        appearance="ghost">
        Volver
      </Button> */}
    </Layout>
  );
};
