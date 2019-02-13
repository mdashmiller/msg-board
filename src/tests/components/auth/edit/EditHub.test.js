import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter } from 'react-router-dom'

import store from '../../../../store/store'
import EditHub from '../../../../components/auth/edit/EditHub'
import EditProfile from '../../../../components/auth/edit/EditProfile'
import EditAuth from '../../../../components/auth/edit/EditAuth'

Enzyme.configure({ adapter: new Adapter() })

// auth.uid is required to view this component
const state = {
	firebase: {
		auth: {
			uid: '1'
		}
	}
}

// required props
const props = {
	mobileNavVisible: false,
	mobileNotesVisible: false
}

// render component for testing
const setUp = (props = {}) => {
	return mount(
		<BrowserRouter>
			<Provider store={store(state)}>
				<EditHub {...props} />
			</Provider>
		</BrowserRouter>
	)
}

describe('<EditHub /> rendering', () => {

	let wrapper
	beforeAll(() => {
		wrapper = setUp(props)
	})

	it('should render without errors', () => {
		expect(wrapper.find(EditHub).length).toBe(1)
	})

	it('should render 1 EditAuth component', () => {
		expect(wrapper.find(EditAuth).length).toBe(1)
	})

	it('should render 1 EditProfile component', () => {
		expect(wrapper.find(EditProfile).length).toBe(1)
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
