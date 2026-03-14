// src/components/auth/LoginForm.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash, FaFacebook } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Logo from '../../assets/photo_2025-04-04_16-36-39.jpg'
import { useNavigate } from 'react-router'

interface LoginFormData {
	username: string
	password: string
}

interface LoginFormProps {
	onSubmit: (data: LoginFormData) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const handleFacebookLogin = () => {
		window.location.href = 'https://www.facebook.com/login/'
	}

	const handleForgotPassword = () => {
		window.location.href = 'https://www.instagram.com/accounts/password/reset/'
	}

	const goToRegister = () => {
		navigate('/registration')
	}

	return (
		<motion.form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-5 p-6 bg-white border rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-900'
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
		>
			<div className='flex justify-center'>
				<img src={Logo} alt='Logo' className='h-12' />
			</div>

			<div>
				<input
					{...register('username')}
					placeholder='Email или имя пользователя'
					className='w-full p-3 border rounded focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800'
				/>
				{errors.username && (
					<p className='mt-1 text-sm text-red-600'>{errors.username.message}</p>
				)}
			</div>

			<div className='relative'>
				<input
					{...register('password')}
					type={showPassword ? 'text' : 'password'}
					placeholder='Пароль'
					className='w-full p-3 border rounded focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800'
				/>
				<button
					type='button'
					onClick={() => setShowPassword(!showPassword)}
					className='absolute text-gray-500 -translate-y-1/2 right-3 top-1/2'
				>
					{showPassword ? <FaEyeSlash /> : <FaEye />}
				</button>
				{errors.password && (
					<p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>
				)}
			</div>

			<motion.button
				type='submit'
				className='py-3 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-400'
				disabled={false} // можно добавить логику isSubmitting
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				Войти
			</motion.button>

			<div className='flex items-center justify-center gap-4 my-4 text-gray-500'>
				<hr className='w-full' />
				<span>или</span>
				<hr className='w-full' />
			</div>

			<button
				type='button'
				onClick={handleFacebookLogin}
				className='flex items-center justify-center gap-2 py-2 text-blue-600 bg-white rounded shadow hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
			>
				<FaFacebook size={20} />
				Войти через Facebook
			</button>

			<div className='mt-4 text-sm text-center'>
				<button
					type='button'
					onClick={handleForgotPassword}
					className='text-blue-600 hover:underline'
				>
					Забыли пароль?
				</button>
			</div>

			<div className='pt-4 mt-6 text-sm text-center border-t'>
				Нет аккаунта?{' '}
				<button
					type='button'
					onClick={goToRegister}
					className='font-semibold text-blue-600 hover:underline'
				>
					Зарегистрироваться
				</button>
			</div>
		</motion.form>
	)
}
