import * as yup from 'yup';

export const loginSchema = yup
	.object({
		email: yup.string().required().email('Email formatında değil'),
		password: yup.string().required().min(8, 'Min 8 karakter olmalıdır'),
		address: yup.object({
			street: yup.string(),
		}),
	})
	.required();
