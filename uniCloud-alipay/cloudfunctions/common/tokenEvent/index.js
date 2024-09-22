const jwt = require('jsonwebtoken');
module.exports = {
	getToken(value,secret,expirationDate){
		let expirationDateTime = new Date(expirationDate).getTime();
		return jwt.sign({value},secret,{expiresIn:expirationDateTime})
	},
	verifyToken(token,secret){
		try {
			return jwt.verify(token,secret);
		} catch (error) {
			
		}
	},
	checkToken(token,secret){
		let vt = this.verifyToken(token,secret);
		if(new Date().getTime()>verifT.exp){
			 		return false;
			 	}
				return true;
	}
}
