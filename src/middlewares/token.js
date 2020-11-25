const jwt = require('jsonwebtoken');

module.exports = app => {

    app.use('/api/**',function(req, res, next) {
        // console.log(req);
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, 'yourband', function(err, decoded) {
          // console.log('ERROR TOKEN', err);
          if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
          
          req.dataReq = decoded;
          next();
        });
        // next();
    });
}