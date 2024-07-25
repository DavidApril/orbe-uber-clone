import {Button, Layout, Text} from '@ui-kitten/components/ui';
import {Image, Pressable, TouchableOpacity} from 'react-native';
import {StorageService} from '../../../services';
import {ProductRestaurant, RootStackParams} from '../../../interfaces';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useRestaurantStore} from '../../../store/restaurant/restaurant';
import {FAB} from '../ui/floating-action-button';
import {View} from 'react-native';
import {CustomIcon} from '../ui/custom-icon';
import {currencyFormat} from '../../../utils';

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
          width: 220,
          // justifyContent: 'center',
          padding: 20,
          position: 'relative',
        }}>
        <FAB
          fill="gray"
          iconName="heart"
          onPress={() => {}}
          style={{right: 10, top: 10, backgroundColor: 'white'}}
        />
        <Image
          style={{
            height: 130,
            width: 130,
            borderRadius: 100,
            alignSelf: 'center',
          }}
          source={{
            uri: StorageService.getPhotoByFilename(product.imageUrl),
          }}
        />

        <Text style={{marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>
          {product.name}
        </Text>
        <Text style={{}} numberOfLines={3}>
          {product.description}
        </Text>

        <Text
          style={{
            paddingVertical: 5,
            marginTop: 5,
            textAlignVertical: 'center',
          }}>
          {currencyFormat(+product.priceUnitary)}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <CustomIcon white height={16} name="plus" />
        </View>
        <Button
          status="success"
          style={{
            height: 15,
            width: 15,
            borderRadius: 50,
            position: 'absolute',
            right: 10,
            bottom: 10,
          }}>
          <CustomIcon white name="plus" />
        </Button>
      </Layout>
    </Pressable>
  );
};
