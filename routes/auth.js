const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const router = express.Router()
require('dotenv').config()

// @route  GET api/auth
// @desc  Get logged in user
// @access private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password')
		res.json(user)
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ msg: 'Server error' })
	}
})
// @route  POST api/auth
// @desc  Auth user & get token
// @access public
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body

		try {
			let user = await User.findOne({ email })

			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials' })
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Credentials' })
			}

			const payload = {
				user: {
					id: user.id,
				},
			}

			jwt.sign(
				payload,
				process.env.jwtSECRET,
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err
					res.json({ token })
				}
			)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error')
		}
	}
)

module.exports = router
