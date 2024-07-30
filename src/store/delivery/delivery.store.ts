import {create} from 'zustand';
import {Location} from '../../interfaces';
import {Race} from '../client/client-driver-store';

interface DeliveryState {
  deliveryServiceIsActive: boolean;
  origin: Location | null;
  destination: Location | null;
  analyzingRace: boolean;
  // TODO: driverRquest Interface
  deliveryRequests: any[];
  raceData: Race | null;
  // TODO: currentRequest Interface
  currentRequest: any;
  currentRaceAccepted: boolean;

  setDeliveryServiceIsActive: (value: boolean) => void;
  setOrigin: (position: Location | null) => void;
  setDestination: (position: Location | null) => void;
  setAnalyzingRace: (value: boolean) => void;
  setRaceData: (value: Race | null) => void;
  setDeliveryRequests: (deliveryRequests: any) => void;
  // TODO: currentRequest Interface
  setCurrentRequest: (currentRequest: any) => void;
  setCurrentRaceAccepted: (value: boolean) => void;
}

export const useDeliveryStore = create<DeliveryState>()(set => ({
  deliveryServiceIsActive: false,
  origin: null,
  destination: null,
  analyzingRace: false,
  deliveryRequests: [],
  raceData: null,
  currentRequest: false,
  currentRaceAccepted: false,

  setDeliveryServiceIsActive: deliveryServiceIsActive =>
    set({deliveryServiceIsActive}),
  setOrigin: position => set({origin: position}),
  setDestination: position => set({destination: position}),
  setAnalyzingRace: value => set({analyzingRace: value}),
  setRaceData: value => set({raceData: value}),
  setDeliveryRequests: deliveryRequests => set({deliveryRequests}),
  setCurrentRequest: currentRequest => set({currentRequest}),
  setCurrentRaceAccepted: value => set({currentRaceAccepted: value}),
}));
