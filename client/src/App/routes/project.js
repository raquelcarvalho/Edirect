//import App from '../controllers/App/App'
//import { SectionTitle, List, rows, Filters } from '../components'

console.log('1')
const queries = () => {
	return ([
    {
		resource: 'projects',
		body: `__typename, id`
	}
])}

const projects = (path, navigation, exact, title) => ({
	path,
	navigation,
	//component: App,
	queries,
	exact,
	title: [title],
	components: [
		// {
		// 	component: SectionTitle,
		// 	props: {
		// 		title: ['label(Audit Summary)']
		// 	}
		// },
		
		// {
		// 	component: List,
		// 	modifiers: [
		// 		'--root-margin-top-small'
		// 	],
		// 	props: {
		// 		items: 'query(0).list',
		// 		cardKey: 'param(id)',
		// 		card: rows.EntityCard,
		// 		metadata: 'query(0).metadata',
		// 		page: 'param(page)',
		// 		status: 'status(0)',
		// 		pageSize: 'param(pageSize)',
		// 		pageDefault: 10,
		// 		footer: 'query(0).footer',
		// 		header: 'query(0).header'
		// 	}
		// }
	]
})

export default projects
