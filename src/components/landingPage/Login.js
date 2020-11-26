import React, { useState, useContext } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.css';
import ForgotPassword from './ForgotPassword';
import AuthContext from '../contexts/AuthContext';
import { LOGIN_LINK } from '../../constants/constants';

const Login = ({ history }) => {
	const [state, setState] = useState({ username: null, password: null, signIn: null, loading: null });
	const { username, password, signIn, loading } = state;
	const [authUser, setAuthUser] = useContext(AuthContext);
	const onFinish = async (values) => {
		try {
			setState({ loading: true });
			const res = await fetchData(values);
			setState({ values, signIn: res, loading: false });
			console.log(res)
			if (res.hasOwnProperty('token')) {
				setAuthUser(res.token);
				history.push('/home');
			}

		} catch (e) {
			console.log(e.message);
		}
	};

	console.log(state);

	async function fetchData(values) {
		try {
			const response = await fetch(LOGIN_LINK, {
				method: 'POST',
				body: JSON.stringify(values),
				headers: { 'Content-Type': 'application/json' }
			});
			const message = await response.json();
			return message;
		} catch (error) {
			console.log('error');
		}
	}

	return (
		<div className=' col-4 contain'>
			<h1>
				Welcome to CTD's School
				<span className='span-txt'>This website is your main hub for class materials for Code the Dream’s classes.</span>
			</h1>

			<div className='form'>
				<h2>Sign In</h2>
				<div className='col-10 mx-auto'>
					<Form
						name='normal_login'
						className='login-form'
						initialValues={{
							remember: true
						}}
						onFinish={onFinish}
					>
						<Form.Item
							name='email'
							rules={[
								{
									required: true,
									type: 'email',
									message: 'Enter a valid email address'
								}
							]}
							help={signIn ? signIn.error : null}
							hasFeedback
							validateStatus={loading ? 'validating' : null}
						>
							<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='email' />
						</Form.Item>
						<Form.Item
							name='password'
							rules={[
								{
									required: true,
									message: 'Enter your password'
								}
							]}
							hasFeedback
							validateStatus={loading ? 'validating' : null}
						>
							<Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='password' />
						</Form.Item>
						<Form.Item>
							<div className='login-form-forgot'>
								<ForgotPassword />
							</div>
						</Form.Item>
						<Form.Item>
							<Button type='primary' htmlType='submit' className='login-form-button button-hover' id='validating'>
								Login
							</Button>
						</Form.Item>
					</Form>
					{/* <div align="center">
						{signIn ? signIn.error : null}
					</div> */}
				</div>
			</div>
		</div>
	);
};
export default Login;
