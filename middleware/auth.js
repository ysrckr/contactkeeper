const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
	// Get Token from header
	const token = req.header('x-auth-token')

	// Check if not Token
	if (!token) {
		return res.status(401).json({ msg: 'Not Authorized' })
	}

	try {
		const decoded = jwt.verify(token, process.env.jwtSECRET)

		req.user = decoded.user
		next()
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' })
	}
}
