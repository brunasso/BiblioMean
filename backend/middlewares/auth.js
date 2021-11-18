import jwt from 'jsonwebtoken';

const auth = async(req, res, next ) => {
    let token = req.header("Authorization");
    if(!token) return res.status(400).send("Auth. failed: No token");

    token = token.split(" ")[1];
    try {
        req.user = jwt.verify(token, process.env.SK_JWT);
        next();
    } catch (e) {
        return res.status(400).send("Atuhorization failed.");
    }
}

export default auth;