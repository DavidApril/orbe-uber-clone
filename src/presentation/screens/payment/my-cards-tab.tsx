import {Layout, List, Text} from '@ui-kitten/components';
import {CreditCard} from '../../components';
import {useWindowDimensions} from 'react-native';

export const MyCardsTab = () => {
  const { height } = useWindowDimensions();
  

  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <List style={{ padding: 40}} data={['1', '2']} renderItem={({item}) => <CreditCard />} />
    </Layout>
  );
};
