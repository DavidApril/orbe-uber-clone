import {Layout, Text} from '@ui-kitten/components/ui';
import {Image, TouchableOpacity} from 'react-native';
import {StorageService} from '../../../services';
import {ProductRestaurant, RootStackParams} from '../../../interfaces';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface Props {
  product: ProductRestaurant;
}

export const ProductCard = ({product}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <TouchableOpacity>
      <Layout
        style={{
          margin: 5,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          height: 150,
          width: 150,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{product.name}</Text>

        <Layout style={{height: 10}} />

        <Image
          style={{height: 100, width: 100, borderRadius: 10}}
          source={{
            uri: StorageService.getPhotoByFilename(product.imageUrl),
          }}
        />
      </Layout>
    </TouchableOpacity>
  );
};
