import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import moment from 'moment'

import store from '../store/store'
import NotificationsPanel from '../components/dashboard/NotificationsPanel'
import Notifications from '../components/dashboard/Notifications'

Enzyme.configure({ adapter: new Adapter() })

const state = {
	firestore: {
		ordered: {
			notifications: [
				{
					content: 'example',
					id: '1',
					time: {
						nanoseconds: 1,
						seconds: 1
					},
					user: 'fake-user'
				}
			]
		}
	}
}

describe('<NotificationsPanel /> rendering', () => {

	it('renders without crashing', () => {
	    const div = document.createElement('div')
	    ReactDOM.render(
	    	<Provider store={store()}>
	    		<NotificationsPanel />
	    	</Provider>
	    , div)
	    ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Provider store={store()}>
				<NotificationsPanel />
			</Provider>
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	// // TypeError: item.time.toDate is not a function
	// it('renders 1 div.notifications-panel', () => {
	// 	const wrapper = mount(
	// 		<Provider store={store(state)}>
	// 			<NotificationsPanel />
	// 		</Provider>
	// 	)
	// 	expect(wrapper.find('div').length).toBe(1)
	// 	// expect(wrapper.find('div')).hasClass('notifications-panel')
	// })

	// it('renders 1 <Notifications /> component', () => {
	// 	const wrapper = shallow(
	// 		<Provider store={store(state)}>
	// 			<NotificationsPanel />
	// 		</Provider>
	// 	)
	// 	expect(wrapper.find(Notifications).length).toBe(1)
	// })
})
