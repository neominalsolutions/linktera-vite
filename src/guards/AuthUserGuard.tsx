/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext } from 'react';
import {
	SessionContext,
	SessionContextType,
} from '../contexts/SessionProvider';
import { Navigate, useLocation } from 'react-router-dom';

function AuthUserGuard({ children }: any) {
	console.log('guard');
	const { session } = useContext(SessionContext) as SessionContextType;
	const location = useLocation();
	console.log('location', location);

	// axiodan kontrol edip kullanıcının sayfaya giriş yapıp yapmayacağını belirleyebiliriz.

	if (!session) return <Navigate to="/login"></Navigate>;

	return children;
}

export default AuthUserGuard;
