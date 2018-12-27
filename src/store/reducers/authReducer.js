const initState = {
	authError: null
}

const authReducer = (state = initState, action) => {
	switch(action.type)	 {
		case 'LOGIN_SUCCESS':
			console.log('login success')
			return {
				...state,
				authError: null
			}
		case 'LOGIN_ERROR':
			console.log('login error')
			return {
				...state,
				authError: 'Login failed...'
			}
		case 'SIGNOUT_SUCCESS':
			console.log('signout success')
			return state
		case 'SIGNUP_SUCCESS':
			console.log('signup success')
			return {
				...state,
				authError: null
			}
		case 'SIGNUP_ERROR':
			console.log('signup error')
			return {
				...state,
				authError: action.err.message
			}
		case 'UPDATE_SUCCESS':
			console.log('successful update')
			return {
				...state,
				authError: null
			}
		case 'UPDATE_ERROR':
			console.log('update error', action)
			return {
				...state,
				authError: 'update error'
			}
		default:
			return state
	}
}

export default authReducer
