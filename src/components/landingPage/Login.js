import React, { useState, useContext } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined, AlignLeftOutlined } from '@ant-design/icons';

import * as ROUTES from '../../constants/routes';
import ForgotPassword from './ForgotPassword';
import AuthContext from '../contexts/AuthContext';
import UserContext from '../contexts/UserContext';
import { LOGIN_LINK } from '../../constants/constants';

const Login = ({ history }) => {
	const [loginState, setLoginState] = useState({ error: null, loading: null });
	const { error, loading } = loginState;
	const [authUser, setAuthUser] = useContext(AuthContext);
	const [userInfo, dispatchUser] = useContext(UserContext);
	// const [state, dispatch] = useContext(AuthContext);
	// const { authUser, username, email, course } = state;
	// console.log('authUser', authUser)

	const onFinish = async (values) => {
		const { email } = values;
		try {
			// Have loading symbol turned on
			setLoginState({ loading: true });
			// Get user information + token
			const res = await fetchData(values);
			// Update state with form values, token, loading=false
			setLoginState({ error: res, loading: false });
			// Update auth context with jwt
			setAuthUser(res.token);
			// dispatch({ type: 'all', payload: { field: 'all', value: { email, username: 'Jerry', course: 'High Noon' } } });
			// Switch to home page
			history.push(`${ROUTES.HOME}${ROUTES.DASHBOARD}`);
			// Check if res has jwt
			// if (res.hasOwnProperty('token')) {
			// 	// Update auth context with jwt
			// 	setAuthUser(res.token);
			// 	// dispatch({ type: 'all', payload: { field: 'all', value: { email, username: 'Jerry', course: 'High Noon' } } });
			// 	// Switch to home page
			// 	history.push(`${ROUTES.HOME}${ROUTES.DASHBOARD}`);
			// }

		} catch (e) {
			console.log(e.message);
		}
	};

	async function fetchData(values) {
		try {
			const response = await fetch(LOGIN_LINK, {
				method: 'POST',
				body: JSON.stringify(values),
				headers: { 'Content-Type': 'application/json' }
			});
			// const response = await fetch('https://students-dashboard-back-end.herokuapp.com/auth/login', {
			// 	method: 'POST',
			// 	mode: 'cors',
			// 	credentials: 'include',
			// 	body: JSON.stringify(values),
			// 	headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
			// });
			const message = await response.json();
			console.log(response.headers.get('Set-Cookie'))
			return message;
		} catch (e) {
			console.log(e.message);
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
				{
					authUser ?
						<div>
							You are signed in
				</div>
						:
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
									help={error ? error.error : null}
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
				}
			</div>
		</div>
	);
};
export default Login;
