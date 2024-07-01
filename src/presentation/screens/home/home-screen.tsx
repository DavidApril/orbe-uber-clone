import { Button, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../../store/auth/auth.store';
import { usePermissionStore } from '../../../store';

export const HomeScreen = () => {
	const { logout } = useAuthStore();
	const { locationStatus } = usePermissionStore();
	return (
		<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>status: {locationStatus}</Text>
			<Button onPress={() => logout()}>Cerrar sesión</Button>
		</Layout>
	);
};
