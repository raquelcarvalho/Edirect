import React from 'react'
import ReactDOM from 'react-dom'

import { Route, BrowserRouter as Router,Switch } from 'react-router-dom'

import Project from './App/Project/Project'
import Login from './App/Login/Login'
import User from './App/User/User'

ReactDOM.render(
		<Router>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/users" component={User} />
				<Route path="/" component={Project} />
			</Switch>
		</Router>,
	document.getElementById('root')
)
