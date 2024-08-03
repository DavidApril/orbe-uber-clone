import {create} from 'zustand';
import {Location, Race} from '../../interfaces';
import {RaceService} from '../../services';
import {parseError} from '../../utils';



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
  createRequest: (
    id_driver: string,
    uid_user: string,
  ) => Promise<{ok: boolean}>;
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
  createRequest: async (
    id_driver: string,
    uid_user: string,
  ): Promise<{ok: boolean}> => {
    const {origin, destination} = get();

    if (!origin || !destination) {
      return {ok: false};
    }

    try {
      await RaceService.createOrder({
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
      return {ok: true};
    } catch (error) {
      return {ok: false};
    }
  },
}));
