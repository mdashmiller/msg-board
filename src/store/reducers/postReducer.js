const initState = {
	posts: [],
	postSuccess: false,
	postError: null
}

const postReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_POST':
			console.log('created post', action.post)
			return {
				...state,
				postSuccess: true,
				postError: null
			}
		case 'CREATE_POST_ERROR':
			console.log('create post error')
			return {
				...state,
				postError: action.err,
				postSuccess: false
			}
		default: 
			return state
	}
}

export default postReducer
