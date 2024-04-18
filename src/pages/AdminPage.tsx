// sadece oturum açan kullanıcılar session olan kullanılar bu page görüntüleyebilir.

import { Outlet } from 'react-router-dom';

function AdminLayoutPage() {
	return (
		<>
			Only Admin Page
			<Outlet />
		</>
	);
}

export default AdminLayoutPage;
