//import App from '../controllers/App/App'
console.log('2')
const page = (path, navigation) => ({
	path,
	navigation,
	//component: App,
	exact: true,
	components: [
		{
			//component: SectionTitle,
			props: {
				title: 'label(404)',
				subtitle: 'label(Item not found)'
			}
		}
	]
})

export default page
