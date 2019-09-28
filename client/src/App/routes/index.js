//import Login from '../controllers/Login/Login'

import project from './project'
import notFound from './notFound'
import navigation from './navigation'

const routes = [
	{
		path: '/login',
		//component: Login,
		exact: true
	},
	project('/', navigation, true, 'Project'),
	notFound('/*', navigation)
]

export default routes
