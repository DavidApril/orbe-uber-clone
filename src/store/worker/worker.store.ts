import {create} from 'zustand';
import {Location, Race, WorkerRequest} from '../../interfaces';

interface WorkerState {
  workerServiceIsActive: boolean;
  origin: Location | null;
  destination: Location | null;
  analyzingRace: boolean;
  workerRequests: WorkerRequest[];
  raceData: Race | null;
  currentRequest: WorkerRequest | null;
  currentRaceAccepted: boolean;
  workerArrived: boolean;
  productImage: string | null;

  setWorkerArrived: (value: boolean) => void;
  setWorkerServiceIsActive: (value: boolean) => void;
  setOrigin: (position: Location | null) => void;
  setDestination: (position: Location | null) => void;
  setAnalyzingRace: (value: boolean) => void;
  setRaceData: (value: Race | null) => void;
  setWorkerRequests: (workerRequests: any) => void;
  setCurrentRequest: (currentRequest: WorkerRequest) => void;
  setCurrentRaceAccepted: (value: boolean) => void;
  setProductImage: (image: string | null) => void;
}

export const useWorkerStore = create<WorkerState>()(set => ({
  workerServiceIsActive: false,
  origin: null,
  destination: null,
  analyzingRace: false,
  workerRequests: [],
  raceData: null,
  currentRequest: null,
  currentRaceAccepted: false,
  workerArrived: false,
  productImage: null,

  setWorkerArrived: (value: boolean) => set({workerArrived: value}),
  setWorkerServiceIsActive: workerServiceIsActive =>
    set({workerServiceIsActive}),
  setOrigin: position => set({origin: position}),
  setDestination: position => set({destination: position}),
  setAnalyzingRace: value => set({analyzingRace: value}),
  setRaceData: value => set({raceData: value}),
  setWorkerRequests: workerRequests => set({workerRequests}),
  setCurrentRequest: currentRequest => set({currentRequest}),
  setCurrentRaceAccepted: value => set({currentRaceAccepted: value}),
  setProductImage: image => set({productImage: image}),
}));
