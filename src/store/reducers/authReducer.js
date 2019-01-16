const initState = {
	authError: null,
	editProfileError: null,
	updateAuthError: null
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
				authError: action.err
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
		case 'UPDATE_AUTH_SUCCESS':
			console.log('successful auth update')
			return {
				...state,
				updateAuthError: null
			}
		case 'UPDATE_AUTH_ERROR':
			console.log('update auth error')
			return {
				...state,
				updateAuthError: action.err
			}
		case 'EDIT_PROFILE_SUCCESS':
			console.log('edit profile success')
			return {
				...state,
				editProfileError: null
			}
		case 'EDIT_PROFILE_ERROR':
			console.log('edit profile error')
			return {
				...state,
				editProfileError: action.err
			}
		default:
			return state
	}
}

export default authReducer
