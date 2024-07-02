import Geolocation from '@react-native-community/geolocation';
import { Location } from '../../interfaces';

export class LocationService {

  static getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        info => {
          resolve({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });
        },
        error => {
          console.log(`Can't get location`);
          reject(error);
        },
        {
          enableHighAccuracy: true,
        },
      );
    });
  };

  static watchCurrentLocation = (
    locationCallback: (location: Location) => void,
  ): number => {
    return Geolocation.watchPosition(
      info =>
        locationCallback({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        }),
      error => {
        throw new Error(`Can't get watchPosition`);
      },
      {
        enableHighAccuracy: true,
      },
    );
  };

  static clearWatchLocation = (watchId: number) => {
    Geolocation.clearWatch(watchId);
  };
}
