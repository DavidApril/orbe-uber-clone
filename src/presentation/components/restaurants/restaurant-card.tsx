import {Image, Pressable, useColorScheme} from 'react-native';
import {StorageService} from '../../../services';
import {RootStackParams, SingleRestaurantResponse} from '../../../interfaces';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {Text} from 'react-native';
import {globalColors} from '../../theme/styles';
import {FAB} from '../ui/floating-action-button';
import {useCartStore, useUIStore} from '../../../store';
import {useEffect} from 'react';

export const RestaurantCard = ({
  restaurant,
}: {
  restaurant: SingleRestaurantResponse;
}) => {
  let image_url = restaurant.attachments[0]?.image_url;

  useEffect(() => {
    image_url = restaurant.attachments[0]?.image_url;
  }, [restaurant]);

  const {setRestaurantSelected} = useCartStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {isDarkMode} = useUIStore();

  return (
    <Pressable
      onPress={() => {
        setRestaurantSelected(restaurant);
        navigation.navigate('RestaurantScreen');
      }}
      style={{
        flexDirection: 'column',
        marginRight: 5,
        alignItems: 'center',
        flex: 1,
        height: 270,
        width: 220,
        paddingTop: 25,
        position: 'relative',
      }}>
      <FAB
        white={!isDarkMode ? true : false}
        iconName="heart"
        style={{
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
          backgroundColor: !isDarkMode
            ? globalColors.grayScale.white
            : globalColors.neutralColors.backgroundDarkAlpha,
        }}></View>
      {restaurant.attachments.length > 0 && (
        <Image
          style={{
            width: 100,
            borderRadius: 100,
            height: 100,
          }}
          source={{uri: StorageService.getPhotoByFilename(image_url)}}
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
            color: !isDarkMode
              ? globalColors.fontColor.textColorHeader
              : globalColors.fontColor.textColorHeaderDark,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          {restaurant.name}
        </Text>
        <Text
          style={{
            color: !isDarkMode
              ? globalColors.fontColor.textColor
              : globalColors.fontColor.textColorDark,
          }}>
          {restaurant.description}
        </Text>
      </View>
    </Pressable>
  );
};
