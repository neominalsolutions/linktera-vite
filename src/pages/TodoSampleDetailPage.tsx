import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Todo } from '../models/todo.model';

function TodoSampleDetailPage() {
	// dinamik routerları yakalamak için use Params Hook kullanırız.
	const params = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	// aktif route lokasyon bilgilerine erişim
	console.log('location', location);
	const [todo, setTodo] = useState<Todo>();

	const gotoTodos = () => {
		navigate('/todos');
		// window.localtion.href kullanmıyoruz.
		// navigate de sayfa refleshlenmeden client state kaybolmadan bir yönlendirme yapılır.
	};

	const loadData = async () => {
		// ES7 ile data load
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASEURL}/todos/${params?.id}`
			);
			setTodo(response.data as Todo);
		} catch (error) {
			console.log('err', error);
		}
	};

	useEffect(() => {
		// useEffect içerisinde async bir kod blogunu aşağıdaki gibi yazabiliriz.
		// useEffect içerisinde await key word kullanamıyoruz.
		loadData();
	}, []);

	return (
		<>
			{todo && (
				<>
					<p>{todo.title}</p>
					<p>{todo.completed ? 'Tamamlandı' : 'Tamamlanamadı'}</p>
				</>
			)}
			{/* {params?.id} */}
			<br></br>
			<button onClick={gotoTodos}> Go to Todos</button>
			<button onClick={() => alert('Test')}>Test</button>
		</>
	);
}

export default TodoSampleDetailPage;
