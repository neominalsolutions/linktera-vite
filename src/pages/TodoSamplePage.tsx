import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Todo } from '../models/todo.model';
import { Link } from 'react-router-dom';

function TodoSamplePage() {
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		// ES6 version
		axios
			.get(`${import.meta.env.VITE_BASEURL}/todos`)
			.then((response: AxiosResponse) => {
				console.log('response', response.data);
				setTodos(response.data as Todo[]);
			})
			.catch((err: AxiosError) => {
				console.log('err', err);
			});
	}, []);

	return (
		<>
			{todos && (
				<>
					<div>
						{todos.map((item: Todo) => {
							return (
								<div key={item.id}>
									<Link to={`${item.id}`}>{item.title}</Link>{' '}
								</div>
							);
						})}
					</div>
				</>
			)}
		</>
	);
}

export default TodoSamplePage;
