const jwt = require('jwt-simple')
const moment = require('moment')

const createToken = (user) => {
	let payload = {
		userId: user._id,
		createdAt: moment().unix(),
		expiresAt: moment().add(1, 'day').unix()
	}
	return jwt.encode(payload, process.env.TOKEN_KEY)
}

const checkToken = (req, res, next) =>{
	console.log(req.headers)
	if(!req.headers['user_token']){
		return res.json({
			error: "You must include the header"
		})
	}

	const token = req.headers['user_token']
	let payload = null

	try{
		payload = jwt.decode(token, process.env.TOKEN_KEY)
	}catch(err){
		return res.json({
			error: 'Invalid token'
		})

	}

	req.userId = payload.userId

	next()
}


module.exports = {
	createToken: createToken,
	checkToken: checkToken
}
