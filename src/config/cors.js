const configCors = (app) => {
    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        // res.setHeader('Access-Control-Allow-Origin', process.env.PORT_REACT);
        const allowedOrigins = [
            process.env.PORT_REACT,
            'https://ii-shop-itss.vercel.app',
            'http://localhost:3000'
            // Add more allowed origins as needed
        ];

        const origin = req.headers.origin;

        // Check if the request origin is in the list of allowed origins
        if (allowedOrigins.includes(origin)) {
            // Allow the specific origin
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'Authorization');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        if ('OPTIONS' === req.method) {
            res.sendStatus(200);
        }
        next();
    });
}
export default configCors;