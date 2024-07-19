import {Platform, useColorScheme, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polyline, Marker} from 'react-native-maps';
import {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {Location} from '../../../interfaces';
import {useLocationStore} from '../../../store';
import {FAB} from '../ui/floating-action-button';
import {MapStyle} from '../../../config/const/map';
import {GOOGLE_API_KEY} from '@env';
import MapViewDirections from 'react-native-maps-directions';
import {MapLightStyle} from '../../../config/const/mapLight';

interface Props {
  driverPosition?: any;
  showsUserLocation?: boolean;
  initialLocation: Location;
  children?: PropsWithChildren;
  handlePress?: (evt: any) => void;
  origin?: Location | null;
  showTraffic?: boolean;
  destination?: Location | null;
  setRaceData?: React.Dispatch<
    React.SetStateAction<{
      distance: number;
      duration: number;
    } | null>
  >;
}

export const CustomMapView = ({
  showsUserLocation = true,
  initialLocation,
  // handlePress,
  driverPosition,
  children,
  setRaceData,
  showTraffic = false,
  origin,
  destination,
}: Props & PropsWithChildren) => {
  const mapRef = useRef<MapView>();
  const cameraLocation = useRef<Location>(initialLocation);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [isShowingPolyline, setIsShowingPolyline] = useState(true);

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (origin) {
      moveCameraToLocation(origin);
    }
    if (destination) {
      moveCameraToLocation(destination);
    }
  }, [origin, destination]);

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
    if (driverPosition) {
      console.log({driverPosition});
    }
  }, [driverPosition]);

  useEffect(() => {
    if (lastKnownLocation && isFollowingUser) {
      moveCameraToLocation(lastKnownLocation);
    }
  }, [lastKnownLocation, isFollowingUser]);

  return (
    <>
      <MapView
        customMapStyle={colorScheme === 'dark' ? MapStyle : MapLightStyle}
        showsIndoors={false}
        showsCompass={false}
        showsMyLocationButton={false}
        showsTraffic={showTraffic}
        showsPointsOfInterest
        showsIndoorLevelPicker={false}
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

        {origin && destination && (
          <MapViewDirections
            origin={origin}
            mode="DRIVING"
            onReady={data => {
              if (setRaceData) {
                setRaceData({distance: data.distance, duration: data.duration});
              }
            }}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="white"
            strokeWidth={4}
          />
        )}

        {origin && (
          <Marker
            title="Recogida"
            coordinate={{
              latitude: origin?.latitude,
              longitude: origin?.longitude,
            }}></Marker>
        )}

        {driverPosition && (
          <Marker
            title="Conductor"
            coordinate={{
              latitude: driverPosition?.latitud,
              longitude: driverPosition?.longitud,
            }}>
            <Image
              style={{height: 50, width: 50}}
              source={require('../../../assets/car.png')}
            />
          </Marker>
        )}

        {destination && (
          <Marker
            title="Destino"
            coordinate={{
              latitude: destination?.latitude,
              longitude: destination?.longitude,
            }}
          />
        )}
      </MapView>
      {/* {origin && destination && <FAB iconName="" />} */}

      <FAB
        white
        iconName="compass-outline"
        onPress={moveToCurrentLocation}
        style={{
          top: 20,
          right: 20,
          backgroundColor: '#3fc1f2',
        }}
      />
    </>
  );
};
