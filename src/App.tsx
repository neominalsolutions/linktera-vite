import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<>
			<div>
				<p>Env: {import.meta.env.VITE_MODE}</p>
				<header>
					<nav>
						<Link style={{ color: 'black' }} to="/todos">
							Todos
						</Link>
						<br></br>
					</nav>
				</header>
				<main>
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default App;
