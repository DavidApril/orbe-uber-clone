import { create } from 'zustand';
import { PermissionStatus } from '../../interfaces';
import { LocationService } from '../../services';

interface PermissionsState {
	locationStatus: PermissionStatus;

	requestLocationPermission: () => Promise<PermissionStatus>;
	checkLocationPermission: () => Promise<PermissionStatus>;
}

export const usePermissionStore = create<PermissionsState>()((set) => ({
	locationStatus: 'undetermined',

	requestLocationPermission: async () => {
		const status = await LocationService.requestLocationPermission();
		set({ locationStatus: status });

		return status;
	},

	checkLocationPermission: async () => {
		const status = await LocationService.checkLocationPermission();
		set({ locationStatus: status });
		return status;
	},
}));
