import { Button, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../../store/auth/auth.store';

export const HomeScreen = () => {
	const { logout } = useAuthStore();
	// const locationStatus = usePermissionStore((state) => state.locationStatus);
	return (
		<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>status: {''}</Text>
			<Button onPress={() => logout()}>Cerrar sesión</Button>
		</Layout>
	);
};
