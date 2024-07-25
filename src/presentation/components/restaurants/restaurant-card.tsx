import {Image, Pressable, TouchableOpacity} from 'react-native';
import {StorageService} from '../../../services';
import {RootStackParams, SingleRestaurantResponse} from '../../../interfaces';
import {useRestaurantStore} from '../../../store/restaurant/restaurant';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {Text} from 'react-native';
import {globalColors} from '../../theme/styles';
import {FAB} from '../ui/floating-action-button';

export const RestaurantCard = ({
  restaurant,
}: {
  restaurant: SingleRestaurantResponse;
}) => {
  const image_url = StorageService.getPhotoByFilename(
    restaurant.attachments[0]?.image_url,
  );

  const {setRestaurantSelected} = useRestaurantStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Pressable
      onPress={() => {
        setRestaurantSelected(restaurant);
        navigation.navigate('RestaurantScreen');
      }}
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        height: 270,
        width: 220,
        paddingTop: 25,
        position: 'relative',
        // shadowColor: '#000000',
      }}>
      <FAB
        iconName="shopping-bag-outline"
        style={{
          backgroundColor: 'white',
          right: 20,
          bottom: 20,
        }}
        onPress={() => {}}></FAB>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          borderRadius: 15,
          backgroundColor: 'white',
        }}></View>
      {restaurant.attachments.length > 0 && (
        <Image
          style={{
            width: 100,
            borderRadius: 100,
            height: 100,
          }}
          source={{uri: image_url ?? ''}}
        />
      )}

      <View
        style={{
          height: 50,
          width: '100%',
          top: 140,
          paddingHorizontal: 20,
          position: 'absolute',
        }}>
        <Text
          style={{
            color: globalColors.primary,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          {restaurant.name}
        </Text>
        <Text style={{color: '#919191'}}>{restaurant.description}</Text>
      </View>
    </Pressable>
  );
};
