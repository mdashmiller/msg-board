import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter } from 'react-router-dom'

import store from '../store/store'
import EditHub from '../components/auth/edit/EditHub'
import EditProfile from '../components/auth/edit/EditProfile'
import EditAuth from '../components/auth/edit/EditAuth'

Enzyme.configure({ adapter: new Adapter() })

const setUp = (props = {}) => {
	return shallow(
		<BrowserRouter>
			<Provider store={store()}>
				<EditHub {...props} />
			</Provider>
		</BrowserRouter>
	)
}

const props = {
	mobileNavVisible: false,
	mobileNotesVisible: false
}

describe('<EditHub /> rendering', () => {

	let wrapper
	beforeEach(() => {
		wrapper = setUp(props)
	})

	it('should render without errors', () => {
		expect(wrapper.find(EditHub).length).toBe(1)
	})

})

describe('<EditHub /> snapshot', () => {

	it('should have a valid snapshot', () => {
		const component = renderer.create(
			<BrowserRouter>
				<Provider store={store()}>
					<EditHub {...props} />
				</Provider>
			</BrowserRouter>
		)
		let tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})	

})

describe('<EditHub /> mounting and unmounting', () => {

	it('should render without crashing', () => {
	    const div = document.createElement('div')
	    ReactDOM.render(
	    	<BrowserRouter>
	    		<Provider store={store()}>
	    			<EditHub {...props} />
	    		</Provider>
	    	</BrowserRouter>
	    , div)
	    ReactDOM.unmountComponentAtNode(div)
	})

})
