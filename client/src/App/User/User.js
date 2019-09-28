import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Logout from '../components/Logout/Logout';
import styles from './User.module.sass'

class User extends Component {
	state = {
		logginIn: false,
		email: '',
		password: '',
	}

	handleSubmit(e) {
		e.preventDefault()
        const { email, password } = this.state
        
        const queriesBody = {
			query: `mutation($u:String!,$p:String!){createUser(email:$u,password:$p){id,email}}`,
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

            if (!data.createUser) {
                return 'Invalid credentials.'
            }

            window.location.href = '/users'
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

		if (user && !user.id) {
            return <Redirect to={ '/login' } />
        }

		return (
			<div className={ styles['root'] }>
                <div className={ styles['header'] }>
                    {/* <Link className={ styles['link'] } to={'/projects'}>projects</Link> */}
                    <div>
                        <small  className={styles["user"]}>{user.email}</small>
                        <Logout />
                    </div>
                </div>
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
                                <input type="submit" value="Create User" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
		)
	}
}

export default User
