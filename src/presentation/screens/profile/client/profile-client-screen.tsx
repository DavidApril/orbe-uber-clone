import {Layout, Text} from '@ui-kitten/components';
import {useAuthStore} from '../../../../store';

export const ProfileClientScreen = () => {
  const {user, role} = useAuthStore();
  console.log({role})

  return (
    <Layout>
      <Text>{JSON.stringify(user)}</Text>
    </Layout>
  );
};
