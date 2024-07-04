import {Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {Location} from '../../../interfaces';
import {useLocationStore} from '../../../store';
import {FAB} from '../ui/floating-action-button';
import {MapStyle} from '../../../config/const/map';

interface Props {
  showsUserLocation?: boolean;
  initialLocation: Location;
  children?: PropsWithChildren;
  handlePress?: (evt: any) => void;
}

export const CustomMapView = ({
  showsUserLocation = true,
  initialLocation,
  handlePress,
  children,
}: Props & PropsWithChildren) => {
  const mapRef = useRef<MapView>();
  const cameraLocation = useRef<Location>(initialLocation);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [isShowingPolyline, setIsShowingPolyline] = useState(true);

  const {
    getLocation,
    lastKnownLocation,
    watchLocation,
    clearWatchLocation,
    userLocationList,
  } = useLocationStore();

  const moveCameraToLocation = (location: Location) => {
    if (!mapRef.current) return;
    mapRef.current.animateCamera({center: location});
  };

  const moveToCurrentLocation = async () => {
    if (!lastKnownLocation) {
      moveCameraToLocation(initialLocation);
    }
    const location = await getLocation();
    if (!location) return;
    moveCameraToLocation(location);
  };

  useEffect(() => {
    watchLocation();

    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (lastKnownLocation && isFollowingUser) {
      moveCameraToLocation(lastKnownLocation);
    }
  }, [lastKnownLocation, isFollowingUser]);

  return (
    <>
      <MapView
        customMapStyle={MapStyle}
        showsIndoors={false}

        onPress={handlePress}
        showsCompass={false}
        showsMyLocationButton={false}
        showsTraffic={true}
        showsBuildings={true}
        ref={map => (mapRef.current = map!)}
        showsUserLocation={showsUserLocation}
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE}
        style={{flex: 1}}
        onTouchStart={() => setIsFollowingUser(false)}
        region={{
          latitude: cameraLocation.current.latitude,
          longitude: cameraLocation.current.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {children}
  

        {isShowingPolyline && (
          <Polyline
            coordinates={userLocationList}
            strokeColor="black"
            strokeWidth={5}
          />
        )}
      </MapView>

      {/* {origin && destination && <FAB iconName="" />} */}

      <FAB
        iconName="compass-outline"
        onPress={moveToCurrentLocation}
        style={{
          top: 20,
          right: 20,
        }}
      />
    </>
  );
};
