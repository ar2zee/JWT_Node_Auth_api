const express = require('express')
const jwt = require('jsonwebtoken')

const app = express();

app.get('/api', (req, res) => {
	res.json({
		message: 'Welcome to the API'
	});
});

app.post('/api/posts', verifyToken ,(req, res) => {
	jwt.verify(req.token, 'key', (err, authData) => {
		if(err) {
			res.sendStatus(403);
		} else {
			res.json({
				message: 'Post Created',
				authData
			})
		}
	});
	
})

app.post('/api/login', (req, res) => {
	// Mock User
	const user = {
		id: 1,
		username: 'Brad',
		email: 'brad@mail.ru'
	}

	jwt.sign({user: user}, 'key', { expiresIn: '30s'}, (err, token) => {
		res.json({
			token: token
		})
	});
})

//FORMAT OF TOKEM
//


// Verify TOken
function verifyToken(req, res, next) {
	// Get auth header Value
	const bearerHeader = req.headers['authorization'];
	//Check if bearer is undefined
	if(typeof bearerHeader !== 'undefined') {
		// Split at the space
		const bearer = bearerHeader.split(' ');
		// Get Token from Array
		const bearerToken = bearer[1];
		// Set The Token
		req.token = bearerToken;
		next();
	} else {
		// Forbidden
		res.sendStatus(403);
	}
}

app.listen(4000, () => console.log('Server is 4000 running'))