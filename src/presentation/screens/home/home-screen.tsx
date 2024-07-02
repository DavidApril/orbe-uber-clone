import {useEffect, useState} from 'react';
import {useLocationStore} from '../../../store';
import {CustomMapView, FAB} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';

export const HomeScreen = () => {
  const {lastKnownLocation, getLocation} = useLocationStore();
  const [servicesActive, setServicesActive] = useState<boolean>(false);

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <>
      <CustomMapView initialLocation={lastKnownLocation!} />

      <FAB
        iconName={!servicesActive ? 'power-outline' : 'bar-chart-2-outline'}
        style={{
          bottom: 20,
          left: 40,
          right: 40,
        }}
        label={!servicesActive ? 'Activar servicios' : 'Capturando viajes'}
        onPress={() => setServicesActive(!servicesActive)}
      />
    </>
  );
};
