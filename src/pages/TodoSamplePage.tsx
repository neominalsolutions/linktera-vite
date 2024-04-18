import { Link } from 'react-router-dom';
import { Todo } from '../models/todo.model';
import useSWR, { Fetcher } from 'swr';
import { getTodos } from '../services/todo.service';
import { useState } from 'react';

function TodoSamplePage() {
	const [key, setKey] = useState<string>('FETCHTODOS');
	const todosFetcher: Fetcher<Todo[], string> = () => getTodos('todos');
	// FETCHTODOS key üzerinden server state 5 dakikalığına default cache den çalıştırıcak şekilde çağırıyor.
	// FETCHTODOS bu key üzerinden cache yönetiyor.
	const { data, isLoading, error, mutate } = useSWR(key, todosFetcher, {
		errorRetryCount: 3,
	});
	// { refreshInterval: 2000, errorRetryCount: 3}

	// 2 saniye de bir istek atıp yeninden veriyi apidan çek.

	if (isLoading) return <>Loading...</>;

	if (error) return <>Yükleme yapılırken hata oluştu</>;

	return (
		<>
			<button
				onClick={() => {
					const random = Math.round(Math.random() * 100);
					// Key üzerinden CACHE bozma işlemi
					setKey(random.toString());
					// CACHE INVALITED işlemi

					mutate();
				}}
			>
				Change Key
			</button>

			{data && (
				<>
					<div>
						{data.map((item: Todo) => {
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
