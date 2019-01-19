const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const createNotification = notification => {
	return admin.firestore().collection('notifications').add(notification)
		.then(doc => console.log('notification added', doc))
		.catch(err => console.log('notification creation failed', err))
}

exports.postCreated = functions.firestore
	.document('posts/{postId}')
	.onCreate(doc => {

		const post = doc.data()
		const notification = {
			content: 'posted a new message',
			user: `${post.authorFirstName} ${post.authorLastName}`,
			time: admin.firestore.FieldValue.serverTimestamp()
		}

		return createNotification(notification)
})

exports.userJoined = functions.auth.user()
	.onCreate(user => {

		return admin.firestore().collection('users')
			.doc(user.uid).get().then(doc => {

				const newUser = doc.data()
				const notification = {
					content: 'joined Post It!',
					user: `${newUser.firstName} ${newUser.lastName}`,
					time: admin.firestore.FieldValue.serverTimestamp()
				}

				return createNotification(notification)
			})
})
