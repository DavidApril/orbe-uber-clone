import {useEffect, useState} from 'react';
import {Layout, Button} from '@ui-kitten/components';
import {StackScreenProps} from '@react-navigation/stack';
import {
  CLIENT,
  DRIVER,
  DELIVERY,
  RootStackParams,
  ROLE_LIST_WITH_DESCRIPTIONS,
} from '../../../../interfaces';
import {SelectRoleAccount} from './select-role-account';
import {registerRoutesByRoleMapper} from '../../../../utils/mappers';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const [role, setRole] = useState<CLIENT | DRIVER | DELIVERY | null>(null);

  useEffect(() => {
    if (role) {
      // @ts-ignore
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
      <Button
        status="basic"
        onPress={() => navigation.pop()}
        appearance="ghost">
        Volver
      </Button>
    </Layout>
  );
};
