import { create } from 'zustand';
import { PermissionStatus } from '../../interfaces';
import { PermissionsService } from '../../services';

interface PermissionsState {
	locationStatus: PermissionStatus;

	requestLocationPermission: () => Promise<PermissionStatus>;
	checkLocationPermission: () => Promise<PermissionStatus>;
}

export const usePermissionStore = create<PermissionsState>()((set) => ({
	locationStatus: 'undetermined',

	requestLocationPermission: async () => {
		const status = await PermissionsService.requestLocationPermission();
		set({ locationStatus: status });

		return status;
	},

	checkLocationPermission: async () => {
		const status = await PermissionsService.checkLocationPermission();
		set({ locationStatus: status });
		return status;
	},
}));
