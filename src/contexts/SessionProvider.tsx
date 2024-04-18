/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from 'react';

export type SessionState = {
	name: string;
	sub: string;
};

export type SessionContextType = {
	session: SessionState | null; // Home Page sessiondaki name değerini okuyabilmem lazım
	clearSession: () => void; // logout işleminde session clear edilecek
	updateSession: (decoded: any) => void; // login işleminde jwt decode sonrası bilgileri göndereceğim bir action açtım
};

// yani login olurken yada logout olurken session state değişmesini buraki session Context üstlenecek.
// Componentlerde global state ait bu context için useContext() hook ile erişim sağlayacağız.
export const SessionContext = createContext<SessionContextType | null>(null);

// Providerlar state global yönetimi için tanımlanan reducer benzer, session state yönetimi yapmmaızı sağlayan sağlayıcılar.

export const SessionProvider = ({ children }: any) => {
	const [session, setSession] = useState<SessionState | null>(null);

	const clearSession = () => {
		setSession(null);
		sessionStorage.removeItem('x-token');
	};

	const updateSession = (decoded: any) => {
		setSession({ ...decoded });
	};

	const values = {
		session,
		clearSession,
		updateSession,
	};

	return (
		<SessionContext.Provider value={values}>{children}</SessionContext.Provider>
	);
};
