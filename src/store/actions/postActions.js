export const createPost = post => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// make async call to db
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const authorId = getState().firebase.auth.uid

		firestore.collection('posts').add({
			...post,
			authorFirstName: profile.firstName,
			authorLastName: profile.lastName,
			authorId,
			createdAt: new Date()
		}).then(() => {
			dispatch({ type: 'CREATE_POST', post })
		}).catch(err => {
			dispatch({ type: 'CREATE_POST_ERROR', err })
		})
	}
}
