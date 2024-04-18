import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import TodoSamplePage from './pages/TodoSamplePage.tsx';
import TodoSampleDetailPage from './pages/TodoSampleDetailPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import { SessionProvider } from './contexts/SessionProvider.tsx';
import AdminLayoutPage from './pages/AdminPage.tsx';
import AuthUserGuard from './guards/AuthUserGuard.tsx';

// AuntenticatedUserGuard girilmeden admin page'e gidilmez.
const router = createBrowserRouter([
	{
		path: '',
		Component: App,
		children: [
			{
				path: 'todos',
				Component: TodoSamplePage,
			},
			{
				path: 'todos/:id',
				Component: TodoSampleDetailPage,
			},
			{
				path: 'login',
				Component: LoginPage,
			},
		],
	},
	{
		path: '/admin',
		element: (
			<AuthUserGuard>
				<AdminLayoutPage />
			</AuthUserGuard>
		),
		children: [],
	},
	{
		path: '*',
		element: <>Page Not Found 404</>,
	},
]);

// * path root'a ve en son dosya olarak yazılır.
// SessionProvider bütün uygulama gelenine sarıp, tüm componentlerden oturum açan kullanıcı bilgisine erişilmesini sağlamak.
ReactDOM.createRoot(document.getElementById('root')!).render(
	<SessionProvider>
		<RouterProvider router={router} />
	</SessionProvider>
);
