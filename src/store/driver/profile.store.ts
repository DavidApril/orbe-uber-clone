import {create} from 'zustand';

interface ProfileDriveState {
  uidDriver: string | null;

  balance: number;
  trips: number;
  addBalance: (add: number) => void;
  subtractBalance: (subtract: number) => void;

  increaseTrips: () => void;
  decreaseTrips: () => void;
}

export const useProfileDriverStore = create<ProfileDriveState>()(set => ({
  uidDriver: null,

  balance: 0,
  trips: 0,
  addBalance: value => set(state => ({balance: state.balance + value})),
  subtractBalance: value =>
    set(state => ({balance: Math.max(state.balance - value, 0)})),

  increaseTrips: () => set(state => ({trips: state.trips + 1})),
  decreaseTrips: () => set(state => ({trips: Math.max(state.trips - 1, 0)})),
}));
