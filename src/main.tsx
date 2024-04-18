import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import TodoSamplePage from './pages/TodoSamplePage.tsx';
import TodoSampleDetailPage from './pages/TodoSampleDetailPage.tsx';
import LoginPage from './pages/LoginPage.tsx';

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
		path: '*',
		element: <>Page Not Found 404</>,
	},
]);

// * path root'a ve en son dosya olarak yazılır.

ReactDOM.createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router} />
);
