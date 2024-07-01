import { PropsWithChildren, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/auth/auth.store';
import { RootStackParams } from '../presentation/navigation/stack-navigation';

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const { status } = useAuthStore();
	const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

	useEffect(() => {
		if (status !== 'pending') {
			if (status === 'authorized') {
				navigation.reset({
					index: 0,
					routes: [{ name: 'PermissionsScreen' }],
				});
			} else {
				navigation.reset({
					index: 0,
					routes: [{ name: 'LoginScreen' }],
				});
			}
		}
	}, [status]);

	return <>{children}</>;
};
