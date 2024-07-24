import {Layout, Text} from '@ui-kitten/components/ui';
import {Image, Pressable, TouchableOpacity} from 'react-native';
import {StorageService} from '../../../services';
import {ProductRestaurant, RootStackParams} from '../../../interfaces';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useRestaurantStore} from '../../../store/restaurant/restaurant';

interface Props {
  product: ProductRestaurant;
}

export const ProductCard = ({product}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {setProductSelected} = useRestaurantStore();
  return (
    <Pressable
      onPress={() => {
        setProductSelected(product);
        navigation.navigate('ProductItemScreen');
      }}>
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
    </Pressable>
  );
};
