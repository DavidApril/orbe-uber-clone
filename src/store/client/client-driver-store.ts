import {create} from 'zustand';
import {DriverResponseByUidData, Location} from '../../interfaces';
import {RacesService} from '../../services';

export type Race = {
  distance: number;
  duration: number;
};

interface ClientDriverStore {
  searchingDriver: boolean;
  origin: Location | null;
  destination: Location | null;
  payWithCard: boolean;
  currentDriverAcceptRace: boolean | null;
  nearbyDrivers: DriverResponseByUidData[];
  raceData: Race | null;

  setSearchingDriver: (value: boolean) => void;
  setOrigin: (position: Location | null) => void;
  setDestination: (position: Location | null) => void;
  setPayWithCard: (value: boolean) => void;
  setNearbyDrivers: (nearbyDrivers: DriverResponseByUidData[]) => void;
  createRequest: (id_driver: string) => Promise<any>;
  setRaceData: (raceData: Race | null) => void;
  setCurrentDriverAcceptRace: (value: boolean) => void;
}

export const useClientDriverStore = create<ClientDriverStore>()((set, get) => ({
  searchingDriver: false,
  origin: null,
  destination: null,
  payWithCard: false,
  currentDriverAcceptRace: null,
  nearbyDrivers: [],
  raceData: null,

  setSearchingDriver: searchingDriver => set({searchingDriver}),
  setOrigin: origin => set({origin}),
  setDestination: destination => set({destination}),
  setPayWithCard: payWithCard => set({payWithCard}),
  setNearbyDrivers: nearbyDrivers => set({nearbyDrivers}),
  setCurrentDriverAcceptRace: currentDriverAcceptRace =>
    set({currentDriverAcceptRace}),
  setRaceData: raceData => set({raceData}),
  createRequest: async (id_driver: string, uid_user: string) => {
    const {origin, destination, nearbyDrivers} = get();

    if (!origin || !destination) return;

    const response = await RacesService.createRequest({
      id_client: uid_user,
      id_driver: id_driver,
      origin: {
        latitude: origin?.latitude,
        longitude: origin?.longitude,
      },
      destination: {
        latitude: destination?.latitude,
        longitude: destination?.longitude,
      },
    });

    raceWaitsSocket.emit('waiting-request', {idRequest: response.data.id});

    const driver = nearbyDrivers?.filter(
      (driver: any) => driver.id === id_driver,
    );

    if (driver) {
      setCurrentDriver(driver[0]);
    }

    return response;
  },
}));
