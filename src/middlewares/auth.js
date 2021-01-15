import { checkToken } from '../libs/token';
import { MidUser } from '../models/middle';

export const isAuth = async (req, res, next) => {
    try {
        let { token } = req.headers;
        if (!token) {
            token = req.query.token;
        }
        if (!token) {
            return res.send({
                signal: 0,
                code: 430,
                message: 'Require Authen'
            });
        }

        const dataToken = await checkToken(token)
        if (!dataToken.userid) {
            return res.send({
                signal: 0,
                code: 425,
                message: 'User not found'
            });
        }
        req.userToken = dataToken.userid;
        req.userData = await MidUser.getUserByid(dataToken.userid);
        next();
    } catch(err) {
        return res.send({
            signal: 0,
            code: 432,
            message: err.message || err
        });
    }
}