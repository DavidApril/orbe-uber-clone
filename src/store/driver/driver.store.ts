import {create} from 'zustand';
import {Location, Race, RequestDriver} from '../../interfaces';

interface DriverState {
  driverServiceIsActive: boolean;
  origin: Location | null;
  destination: Location | null;
  analyzingRace: boolean;
  // TODO: driverRquest Interface
  driverRequests: any[];
  raceData: Race | null;
  // TODO: currentRequest Interface
  currentRequest: RequestDriver | null;
  currentRaceAccepted: boolean;

  setDriverServiceIsActive: (value: boolean) => void;
  setOrigin: (position: Location | null) => void;
  setDestination: (position: Location | null) => void;
  setAnalyzingRace: (value: boolean) => void;
  setRaceData: (value: Race | null) => void;
  setDriverRequests: (driverRequests: any) => void;
  // TODO: currentRequest Interface
  setCurrentRequest: (currentRequest: RequestDriver) => void;
  setCurrentRaceAccepted: (value: boolean) => void;
}

export const useDriverStore = create<DriverState>()(set => ({
  driverServiceIsActive: false,
  origin: null,
  destination: null,
  analyzingRace: false,
  driverRequests: [],
  raceData: null,
  currentRequest: null,
  currentRaceAccepted: false,

  setDriverServiceIsActive: driverServiceIsActive =>
    set({driverServiceIsActive}),
  setOrigin: position => set({origin: position}),
  setDestination: position => set({destination: position}),
  setAnalyzingRace: value => set({analyzingRace: value}),
  setRaceData: value => set({raceData: value}),
  setDriverRequests: driverRequests => set({driverRequests}),
  setCurrentRequest: currentRequest => set({currentRequest}),
  setCurrentRaceAccepted: value => set({currentRaceAccepted: value}),
}));
