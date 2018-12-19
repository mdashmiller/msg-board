export const createPost = post => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// make async call to db
		const firestore = getFirestore()
		firestore.collection('posts').add({
			...post,
			authorFirstName: 'Robo',
			authorLastName: 'Robissimo',
			authorId: 1234,
			createdAt: new Date()
		}).then(() => {
			dispatch({ type: 'CREATE_POST', post })
		}).catch(err => {
			dispatch({ type: 'CREATE_POST_ERROR', err })
		})
	}
}
