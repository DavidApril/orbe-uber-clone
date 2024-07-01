// import { PermissionStatus } from '@/interfaces';
// import { Platform } from 'react-native';
// import { PERMISSIONS, check, openSettings, request } from 'react-native-permissions';

// export class LocationService {
// 	static requestLocationPermission = async (): Promise<PermissionStatus> => {

// 		let status: PermissionStatus = 'unavailable';

// 		if (Platform.OS === 'ios') {
// 			status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
// 		} else if (Platform.OS === 'android') {
// 			status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
// 		} else {
// 			throw new Error('Unsupported platform');
// 		}

// 		if (status === 'blocked') {
// 			await openSettings();
// 			return await this.checkLocationPermission();
// 		}

// 		const permissionMapper: Record<any, PermissionStatus> = {
// 			granted: 'granted',
// 			denied: 'denied',
// 			blocked: 'blocked',
// 			unavailable: 'unavailable',
// 			limited: 'limited',
// 		};

// 		return permissionMapper[status] ?? 'unavailable';
// 	};

// 	static checkLocationPermission = async (): Promise<PermissionStatus> => {
// 		let status: any = 'unavailable';

// 		if (Platform.OS === 'ios') {
// 			status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
// 		} else if (Platform.OS === 'android') {
// 			status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
// 		} else {
// 			throw new Error('Unsupported platform');
// 		}

// 		const permissionMapper: Record<any, PermissionStatus> = {
// 			granted: 'granted',
// 			denied: 'denied',
// 			blocked: 'blocked',
// 			unavailable: 'unavailable',
// 			limited: 'limited',
// 		};

// 		return permissionMapper[status] ?? 'unavailable';
// 	};
// }
