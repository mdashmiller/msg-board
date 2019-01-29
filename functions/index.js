const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const createNotification = notification => {
	return admin.firestore().collection('notifications').add(notification)
		.then(doc => console.log('notification added', doc))
		.catch(err => console.log('notification creation failed', err))
}

const createWelcomePost = post => {
	return admin.firestore().collection('posts').add(post)
		.then(doc => console.log('welcome post added', doc))
		.catch(err => console.log('welcome post failed', err))
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

exports.welcomePost = functions.auth.user()
	.onCreate(user => {

		return admin.firestore().collection('users')
			.doc(user.uid).get().then(doc => {

				const newUser = doc.data()
				const post  = {
					authorId: 'PostIt!',
					authorFirstName: 'Post',
					authorLastName: 'It!',
					createdAt: admin.firestore.FieldValue.serverTimestamp(),
					message: "Welcome to PostIt! Let's share some thoughts and stuff...",
					title: `Hi, ${newUser.firstName} ${newUser.lastName}!`
				}

				return createWelcomePost(post)
			})

	})
