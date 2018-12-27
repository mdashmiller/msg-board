export const signIn = credentials => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase()

		firebase.auth().signInWithEmailAndPassword(
			credentials.email,
			credentials.password
		).then(() => {
			dispatch({ type: 'LOGIN_SUCCESS' })
		}).catch(err => {
			dispatch({ type: 'LOGIN_ERROR', err })
		})
	}
}

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase()

		firebase.auth().signOut()
			.then(() => {
				dispatch({ type: 'SIGNOUT_SUCCESS' })
			})
	}
}

export const signUp = newUser => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()

		firebase.auth().createUserWithEmailAndPassword(
			newUser.email,
			newUser.password
		).then(res => {
			return firestore.collection('users').doc(res.user.uid).set({
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				initials: newUser.firstName[0] + newUser.lastName[0]
			})
		}).then(() => {
			dispatch({ type: 'SIGNUP_SUCCESS' })
		}).catch(err => {
			dispatch({ type: 'SIGNUP_ERROR', err })
		})
	}
}

export const authUpdate = email => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase()
		const user = firebase.auth().currentUser

		user.updateEmail(email).then(() => {
			console.log('update success')
			dispatch({ type: 'UPDATE_SUCCESS' })
			// dispatch({ type: 'UPDATE_ERROR' })

		}).catch(err => {
			console.log('update error')
			dispatch({ type: 'UPDATE_ERROR', err })
		})
	}
}

export const userUpdate = (firstName, lastName) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()
		const user = firebase.auth().currentUser

		firestore.collection('users').doc(user.uid).set({
			firstName,
			lastName,
			initials: firstName[0] + lastName[0]
		}).then(() => {
			dispatch({ type: 'UPDATE_SUCCESS' })
			// dispatch({ type: 'UPDATE_ERROR' })

		}).catch(err => {
			dispatch({ type: 'UPDATE_ERROR', err })
		})
	}
}
