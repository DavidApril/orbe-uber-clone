import {Layout} from '@ui-kitten/components';
import {CustomMapView, FAB} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useLocationStore} from '../../../store';
import {useMemo, useRef} from 'react';
import {RootStackParams} from '../../../interfaces';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';

export const HomeDeliveryScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const SearchingDriverBottomSheetRef = useRef<BottomSheet>(null);

  const {lastKnownLocation} = useLocationStore();

  const snapPoints = useMemo(() => ['20%', '50%', '80%'], []);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <>
      <FAB
        white
        iconName="menu-2-outline"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
        style={{
          position: 'absolute',
          left: 20,
          top: 20,
          backgroundColor: '#3fc1f2',
        }}
      />

      <CustomMapView initialLocation={lastKnownLocation!}></CustomMapView>

      <BottomSheet ref={SearchingDriverBottomSheetRef} snapPoints={snapPoints}>
        <Layout></Layout>
      </BottomSheet>
    </>
  );
};
