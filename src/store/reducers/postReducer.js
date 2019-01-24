const initState = {
	posts: [],
	postSuccess: null,
	postError: null
}

const postReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_POST':
			console.log('created post', action.post)
			return {
				...state,
				postSuccess: action.post,
				postError: null
			}
		case 'CREATE_POST_ERROR':
			console.log('create post error')
			return {
				...state,
				postError: action.err,
				postSuccess: null
			}
		default: 
			return state
	}
}

export default postReducer
