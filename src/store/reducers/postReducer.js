const initState = {
	posts: [
		{ id: '1', title: 'Dummy Post 1', message: 'blah blah blah'},
		{ id: '2', title: 'Dummy Post 2', message: 'yadda yadda yadda'},
		{ id: '3', title: 'Dummy Post 3', message: 'derp derp derp'}
	]
}

const postReducer = (state = initState, action) => {
	return state
}

export default postReducer
