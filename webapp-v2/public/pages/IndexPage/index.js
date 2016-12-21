import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { Button, Input } from '../../components';
import styles from './index.css';
import { login, createAccount } from '../../lib';

class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginModal: false,
			email: null,
			password: null,
			hasAccount: true,
			showError: false
		};
	}

	/**
	 * sign in or create an account
	 * @return {None} 
	 */
	signInOrCreateAcct() {
		this.setState({ showError: false });
		const params = { 
			email: this.state.email,
			password: this.state.password
		};
		if (this.state.hasAccount) {
			login(params).then(() => {
				this.setState({
					loginModal: false
				});
				browserHistory.push('/node');
			})
			.catch((err) => {
				this.setState({
					error: err.message
				});
			});
		} else {
			createAccount(params).then(() => {
				this.setState({
					loginModal: false
				});
				browserHistory.push('/node');
			})
			.catch((err) => {
				this.setState({
					error: err.message
				});
			});
		}
	}

	render() {
		let headerText = 'Sign In';
		let bottomText = "Don't have an account? Create one here!";
		let buttonText = 'Log In';
		if (!this.state.hasAccount) {
			headerText = 'Create Account';
			bottomText = 'Have an account? Sign in here!';
			buttonText = 'Create';
		}
		return (
			<div>
				{ this.props.children }
				{ 
					!this.props.children && 
					<div className={styles.indexContainer}>
						{
							this.state.loginModal &&
							<ModalContainer onClose={() => this.setState({ loginModal: false })}>
								<ModalDialog>
									<div className={styles.header}>
										<h1>{headerText}</h1>
									</div>
									<Input 
										style={{ marginBottom: '10px' }}
										type='text'
										placeholder='coolguy@email.com'
										label='Email' 
										onChange={(email) => this.setState({ email })}
										id='email'
									/>
									<Input
										type='password'
										placeholder='Enter a password'
										label='Password'
										onChange={(password) => this.setState({ password })}
										id='password'
									/>
									<Button 
										style={{ marginTop: '10px', marginBottom: '10px' }}
										text={buttonText}
										onClick={() => { this.signInOrCreateAcct(); }}
									/>
									<br />
									<a 
										onClick={() => this.setState({ hasAccount: !this.state.hasAccount })}
										style={{ cursor: 'pointer' }}
									>
										{bottomText}
									</a> 
									{
										this.state.error &&
										<p style={{ color: 'red' }}>
											{this.state.error}
										</p>
									}
								</ModalDialog>
							</ModalContainer>
						}
						<h1>Nodepad</h1>
						<p>Change the way you study</p>
						<Button 
							text='Log in' 
							onClick={() => this.setState({ loginModal: true })}
						/>
					</div>
				}
			</div>
		);
	}
}

export default IndexPage;
