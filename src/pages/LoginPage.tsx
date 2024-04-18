import { useForm } from 'react-hook-form';
import { login } from '../services/login.service';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validations/login.schema';
import { useContext } from 'react';
import {
	SessionContext,
	SessionContextType,
} from '../contexts/SessionProvider';

type AddressInput = {
	street?: string;
};

type LoginInput = {
	email: string;
	password: string;
	address: AddressInput;
};

function LoginPage() {
	const navigate = useNavigate(); // yönlendirme işlemi
	const { updateSession } = useContext(SessionContext) as SessionContextType;

	const {
		handleSubmit,
		register,
		watch,
		reset,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: yupResolver(loginSchema),
	});

	const onFormSubmit = async (data: LoginInput) => {
		console.log('data', data);

		const response = await login('https://reqres.in/api/login', data);
		if (response) {
			sessionStorage.setItem('x-token', import.meta.env.VITE_TOKEN);
			// YARIN SESSION STATE'e atılacak.
			const decoded = jwtDecode(import.meta.env.VITE_TOKEN);
			console.log('decoded', decoded);
			updateSession(decoded); // session update edilmiş oldu.
			reset();
			navigate('/');
		}
	};

	const emailValue = watch('email');
	console.log('emailValue', emailValue);

	return (
		<>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<input
					defaultValue="eve.holt@reqres.in"
					placeholder="email"
					{...register('email')}
					type="text"
				/>
				<span>{errors.email?.message}</span>
				<br></br>
				<input
					defaultValue="cityslicka"
					placeholder="password"
					{...register('password')}
					type="password"
				/>
				<span>{errors.password?.message}</span>
				<br></br>

				{/* <input {...register('address.street')} placeholder="street" />
				<br></br> */}

				<input type="submit" value="Login" />
			</form>
		</>
	);
}

export default LoginPage;
