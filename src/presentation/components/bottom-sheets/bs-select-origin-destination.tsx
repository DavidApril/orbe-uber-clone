import {useEffect, useMemo, useRef} from 'react';
import {SelectOriginDestination} from '../client/select-origin-destination';
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Spinner} from '@ui-kitten/components';
import {CustomIcon} from '../ui/custom-icon';
import {DriverInformationCard} from '../worker/driver-information-card';
import {useClientDriverStore} from '../../../store/client/client-driver-store';
import BottomSheet from '@gorhom/bottom-sheet';
import {useUIStore} from '../../../store';
import {globalColors} from '../../theme/styles';

export const BSSelectOriginDestination = () => {
  const SearchingDriverBottomSheetRef = useRef<BottomSheet>(null);
  const {height, width} = useWindowDimensions();

  const {isDarkMode} = useUIStore();
  const snapPoints = useMemo(() => ['25%', '90%'], []);

  const {
    searchingDriver,
    nearbyDrivers,
    setSearchingDriver,
    currentDriverAcceptRace,
  } = useClientDriverStore();

  useEffect(() => {
    SearchingDriverBottomSheetRef.current?.collapse();
  }, [currentDriverAcceptRace]);

  useEffect(() => {
    if (searchingDriver) {
      SearchingDriverBottomSheetRef.current?.collapse();
    }
  }, [searchingDriver]);

  return (
    <BottomSheet
      style={{
        marginTop: 10,
      }}
      backgroundStyle={{
        backgroundColor: isDarkMode
          ? globalColors.grayScale.black
          : globalColors.grayScale.white,
      }}
      handleStyle={{
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        backgroundColor: isDarkMode
          ? globalColors.grayScale.black
          : globalColors.grayScale.white,
      }}
      ref={SearchingDriverBottomSheetRef}
      snapPoints={snapPoints}>
      {!searchingDriver ? (
        <>
          <View style={{alignItems: 'center'}}>
            <Pressable
              onPress={() => {
                SearchingDriverBottomSheetRef.current?.expand();
              }}
              style={{
                backgroundColor: globalColors.primaryColors.primary,
                width: 200,
                padding: 10,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: globalColors.grayScale.white,
                }}>
                aquí
              </Text>
            </Pressable>
          </View>
          <SelectOriginDestination />
        </>
      ) : (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
              gap: 30,
            }}>
            {searchingDriver && nearbyDrivers?.length === 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10,
                }}>
                <Spinner />
                <Text style={{fontWeight: 'bold'}}>
                  Buscando conductores...
                </Text>
              </View>
            )}

            {searchingDriver && !currentDriverAcceptRace && (
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Pressable
                  style={{
                    backgroundColor: globalColors.stateColors.error,
                    padding: 10,
                    borderRadius: 50,
                  }}
                  onPress={() => setSearchingDriver(false)}>
                  <Text style={{textAlign: 'center'}}>Cancelar búsqueda</Text>
                </Pressable>
              </View>
            )}
          </View>

          {nearbyDrivers?.length === 0 && (
            <View
              style={{
                flex: 1,
                width: width,
                height: height * 0.6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>
                <CustomIcon
                  height={100}
                  width={100}
                  name="alert-circle-outline"
                  fill="#d5d9e0"
                />
              </Text>
            </View>
          )}

          {nearbyDrivers && (
            <FlatList
              data={nearbyDrivers}
              renderItem={({item: driver}) => {
                console.log(driver);
                return (
                  <DriverInformationCard
                    key={driver.uid_firebase}
                    driverUid={driver.id}
                  />
                );
              }}
            />
          )}
        </ScrollView>
      )}
    </BottomSheet>
  );
};
