import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import styles from './Login.module.sass'

class Login extends Component {
	state = {
		logginIn: false,
		email: '',
		password: '',
	}

	handleSubmit(e) {
		e.preventDefault()
        const { email, password } = this.state
        
        const queriesBody = {
			query: `mutation($u:String!,$p:String!){login(email:$u,password:$p){id,email}}`,
			variables: {
				u: email,
				p: password
			}
		}
		fetch('/graphql', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify(queriesBody)
		})
        .then((res) => res.json())
        .then((res) => {
            const {data, errors} = res

            if(errors){
                return errors.message
            }

            if (!data.login) {
                return 'Invalid credentials. Make sure you are using your email and password.'
            }

            window.location.href = '/'
        })
        .catch((e) => e)
        
    }
    
    getToken(n) {
        let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
        return a ? a[1] : '';
    }

	render() {
        const { email, password } = this.state
        const token = this.getToken("x-session")
        const { ...user } = token && JSON.parse(atob(token.split('.')[1]))
        
		if (user && user.id) {
            if(user.email === 'admin'){
                return <Redirect to={ '/users' } />
            }
			return <Redirect to={ '/' } />
		}

		return (
			<div className={ styles['root'] }>
				<div className={styles["container"]}>
                    <div className={styles["login-item"]}>
                        <form onSubmit={ this.handleSubmit.bind(this) } className={`${styles["form"]} ${styles["form-login"]}`}>
                            <div className={styles["form-field"]}>
                                <label className={styles["user"]}><span className={styles["hidden"]}>E-mail</span></label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                    placeholder="E-mail"
                                    required
                                    className={styles["form-input"]}
                                    value={ email }
                                    onChange={ (e) => {
                                        this.setState({ email: e.target.value })
                                    } }
                                />
                            </div>
                            <div className={styles["form-field"]}>
                                <label className={styles["lock"]}><span className={styles["hidden"]}>Password</span></label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    required
                                    value={ password }
                                    className={styles["form-input"]}
                                    onChange={ (e) => {
                                    this.setState({ password: e.target.value })
                                    } }
                                />
                            </div>
                            <div className={styles["form-field"]}>
                                <input type="submit" value="Log in" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
		)
	}
}

export default Login
