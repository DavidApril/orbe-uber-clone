import {TouchableOpacity, Image} from 'react-native';
import {StorageService} from '../../../services';
import {RootStackParams, SingleRestaurantResponse} from '../../../interfaces';
import {Layout, Text} from '@ui-kitten/components';
import {CustomIcon} from '../ui/custom-icon';
import {useRestaurantStore} from '../../../store/restaurant/restaurant';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export const RestaurantCard = ({
  restaurant,
}: {
  restaurant: SingleRestaurantResponse;
}) => {
  const image_url = StorageService.getPhotoByFilename(
    restaurant.attachments[0].image_url,
  );

  const {setRestaurantSelected} = useRestaurantStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <TouchableOpacity
      onPress={() => {
        setRestaurantSelected(restaurant);
        navigation.navigate('ProductItem')
      }}
      style={{padding: 10}}
      key={restaurant.id}>
      <Layout style={{padding: 10}}>
        {restaurant.attachments.length > 0 && (
          <Image
            style={{
              width: '100%',
              borderRadius: 10,
              height: 200,
              marginBottom: 8,
            }}
            source={{uri: image_url}}
          />
        )}
      </Layout>
      <Text style={{fontWeight: 'bold', fontSize: 17}}>{restaurant.name}</Text>
      <Text style={{}}>{`${restaurant.description}`}</Text>
      <Text style={{}}>{`Direccion: ${restaurant.address}`}</Text>
      <Layout style={{flexDirection: 'row', gap: 5, paddingVertical: 5}}>
        <CustomIcon name="star" />
        <CustomIcon name="star" />
        <CustomIcon name="star" />
        <CustomIcon name="star" />
      </Layout>
    </TouchableOpacity>
  );
};
