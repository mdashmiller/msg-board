import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Link } from 'react-router-dom'

import PostList from '../../../components/posts/PostList'
import PostSummary from '../../../components/posts/PostSummary'

Enzyme.configure({ adapter: new Adapter() })

// required props
const propsNoPost = {
	posts: [],
	mobileNavVisible: false,
	mobileNotesVisible: false
}

const propsWithPost = {
	posts: [
		{
			authorFirstName: 'First',
			authorLastName: 'Last',
			createdAt: {
				nanoseconds: 1,
				seconds: 1
			},
			id: '1',
			message: 'fake message',
			title: 'fake title'
		}
	],
	mobileNavVisible: false,
	mobileNotesVisible: false
}

// render component for tests
const setUp = (props = {}) => {
	return shallow(<PostList {...props} />)
}

describe('<PostList /> rendering', () => {

	describe('rendering without posts', () => {

		let wrapper
		beforeAll(() => {
			wrapper = setUp(propsNoPost)
		})

		it('should render 1 div.post-list', () => {
			expect(wrapper.find('div').length).toBe(1)
			expect(wrapper.find('div').hasClass('post-list'))
		})

		it('should not render a Link or PostList component', () => {
			expect(wrapper.find(Link).length).toBe(0)
			expect(wrapper.find(PostList).length).toBe(0)
		})
	})

	describe('rendering with posts', () => {

		let wrapper
		beforeAll(() => {
			wrapper = setUp(propsWithPost)
		})

		it('should render 1 PostSummary component', () => {
			expect(wrapper.find(PostSummary).length).toBe(1)
		})

		it('should render 1 Link element', () => {
			expect(wrapper.find(Link).length).toBe(1)
		})
	})

		describe('Link attributes', () => {

			let wrapper
			beforeAll(() => {
				wrapper = setUp(propsWithPost)
			})

			it('should navigate to props.posts[post].id', () => {
				expect(wrapper.find(Link).prop('to')).toBe('/post/1')
			})

			// it('should have a key of props.posts[post].id', () => {
			// 	expect(wrapper.find(Link).prop('key')).toBe('1')
			// 	// received undefined
			// })
		})

	describe('rendering a welcome message', () => {

		describe('conditional .welcome on PostSummary', () => {

			const welcomeProps = {
				posts: [
					{
						authorFirstName: 'First',
						authorId: 'PostIt!',
						authorLastName: 'Last',
						createdAt: {
							nanoseconds: 1,
							seconds: 1
						},
						id: '1',
						message: 'fake message',
						title: 'fake title'
					}
				],
				mobileNavVisible: false,
				mobileNotesVisible: false
			}

			let wrapper
			beforeAll(() => {
				wrapper = setUp(welcomeProps)
			})

			it('should have prop welcome = "welcome"', () => {
				expect(wrapper.find(PostSummary).prop('welcome')).toBe('welcome')
			})
		})
	})
})

describe('handleClick()', () => {

	describe('clicking Link and spying on handleClick()', () => {

		let wrapper
		let instance
		beforeEach(() => {
			wrapper = setUp(propsWithPost)
			instance = wrapper.instance()
		})

		it('should call handleClick()', () => {
			jest.spyOn(instance, 'handleClick')
			wrapper.find(Link).simulate('click')

			setTimeout(() => {
				expect(instance.handleClick).toHaveBeenCalledTimes(1)
			})
		})
	})

	describe('directly invoking handleClick()', () => {

		it('should return when !state.menuVisible', () => {
			const wrapper = setUp(propsWithPost)
			const instance = wrapper.instance()

			jest.spyOn(instance, 'handleClick')
			wrapper.find(Link).simulate('click')

			setTimeout(() => {
				expect(instance.handleClick).toHaveReturnedTimes(1)
				expect(instance.state('menuVisible')).toBe(false)
			})
		})

		let wrapper
		// mocking e.preventDefault
		const event = {
			preventDefault: jest.fn()
		}
		// props when mobileNav is visible
		const navVisible = {
			posts: [
				{
					authorFirstName: 'First',
					authorLastName: 'Last',
					createdAt: {
						nanoseconds: 1,
						seconds: 1
					},
					id: '1',
					message: 'fake message',
					title: 'fake title'
				}
			],
			mobileNavVisible: true,
			mobileNotesVisible: false
		}
		// props when mobileNotes are visible
		const notesVisible = {
			posts: [
				{
					authorFirstName: 'First',
					authorLastName: 'Last',
					createdAt: {
						nanoseconds: 1,
						seconds: 1
					},
					id: '1',
					message: 'fake message',
					title: 'fake title'
				}
			],
			mobileNavVisible: false,
			mobileNotesVisible: true
		}

		it('should call e.preventDefault() when state.menuVisible', () => {
			wrapper = setUp(navVisible)

			wrapper.find(Link).simulate('click', event)

			setTimeout(() => {
				expect(event.preventDefault).toHaveBeenCalledTimes(1)
			})

			wrapper = setUp(notesVisible)

			wrapper.find(Link).simulate('click', event)

			setTimeout(() => {
				expect(event.preventDefault).toHaveBeenCalledTimes(2)
			})
		})

		it('should set state.menuVisible false when state.menuVisible', () => {
			wrapper = setUp(navVisible)

			wrapper.find(Link).simulate('click')

			expect(wrapper.state('menuVisible')).toBe(false)

			wrapper = setUp(notesVisible)

			wrapper.find(Link).simulate('click')

			expect(wrapper.state('menuVisible')).toBe(false)
		})
	})
})

describe('componentDidUpdate()', () => {

	// it('should set state.menuVisible to true when mobile nav is open', () => {

	// })

	// it('should set state.menuVisible to true when mobile notes are open', () => {
		
	// })
})
