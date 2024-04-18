import { Link, Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { SessionContext, SessionContextType } from './contexts/SessionProvider';
import { useContext } from 'react';

function App() {
	const navigate = useNavigate();
	const { session, clearSession } = useContext(
		SessionContext
	) as SessionContextType;

	return (
		<>
			<div>
				<p>Env: {import.meta.env.VITE_MODE}</p>
				<header>
					<nav>
						<Link style={{ color: 'black' }} to="/todos">
							Todos
						</Link>{' '}
						<Link style={{ color: 'black' }} to="/todos/1">
							Todos Detail 1
						</Link>{' '}
						<Link to="login">Login</Link>
						<br></br>
					</nav>
					{session && (
						<>
							Hoşgeldiniz {session.name}
							<br></br>
							<button
								onClick={() => {
									clearSession();
									navigate('/login');
								}}
							>
								LogOut
							</button>
						</>
					)}
				</header>
				<main>
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default App;
