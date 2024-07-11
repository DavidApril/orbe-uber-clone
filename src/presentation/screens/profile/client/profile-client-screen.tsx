import {Layout, Text} from '@ui-kitten/components';
import {useAuthStore} from '../../../../store';

export const ProfileClientScreen = () => {
  const {user} = useAuthStore();

  return (
    <Layout>
      <Text>{JSON.stringify(user)}</Text>
    </Layout>
  );
};
