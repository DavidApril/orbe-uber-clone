import {TouchableOpacity, Image} from 'react-native';
import {StorageService} from '../../../services';
import {SingleRestaurantResponse} from '../../../interfaces';
import {Layout, Text} from '@ui-kitten/components';
import {CustomIcon} from '../ui/custom-icon';

export const RestaurantCard = ({
  restaurant,
}: {
  restaurant: SingleRestaurantResponse;
}) => {
  const image_url = StorageService.getPhotoByFilename(
    restaurant.attachments[0].image_url,
  );
  return (
    <Layout style={{padding: 10}}>
      <TouchableOpacity style={{}} key={restaurant.id}>
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
        <Text style={{fontWeight: 'bold', fontSize: 17}}>
          {restaurant.name}
        </Text>
        <Text style={{}}>{`${restaurant.description}`}</Text>
        <Text style={{}}>{`Direccion: ${restaurant.address}`}</Text>
        <Layout style={{flexDirection: 'row', gap:5,  paddingVertical: 5}}>
          <CustomIcon name="star" />
          <CustomIcon name="star" />
          <CustomIcon name="star" />
          <CustomIcon name="star" />
        </Layout>
      </TouchableOpacity>
    </Layout>
  );
};
