import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter } from 'react-router-dom'

import PostList from '../../../components/posts/PostList'

Enzyme.configure({ adapter: new Adapter() })

describe('<PostList /> rendering', () => {

	describe('rendering without posts', () => {

		it('should pass', () => {
			expect(1).toBe(1)
		})

	})

	describe('rendering with posts', () => {

		it('should pass', () => {
			expect(1).toBe(1)
		})

	})

})
