const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
		console.log(req.headers);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN');
        const userId = decodedToken.userId;
        if(req.body.userId && userId !== req.body.userId){
            throw Error('Invalid User ID');
        }else {
            req.auth = { userId };
            next();
        }
    }catch(error){
        console.log(error);
        res.status(401).json({
            error: new Error('Invalid request')
        })
    }

}