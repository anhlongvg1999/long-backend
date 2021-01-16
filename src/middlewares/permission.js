import { MidUser } from '../models/middle';
import { checkToken } from '../libs/token';

export const checkPermission = (action) => {
    return async (req, res, next) => {
        try {
            let { token } = req.headers;
            if (!token) {
                token = req.query.token;
            }
            if (!token) {
                return res.send({
                    signal: 0,
                    code: 400,
                    message: 'Require Authen'
                });
            }
            if (!action) {
                return res.send({
                    signal: 0,
                    code: 400,
                    message: 'Require key permission'
                });
            }

            const dataToken = await checkToken(token)
            if (!dataToken.userid) {
                return res.send({
                    signal: 0,
                    code: 400,
                    message: 'Require Authen 1'
                });
            }
            req.userToken = dataToken.userid;
            req.userData = await MidUser.getUserByid(dataToken.userid);
            const getData = await MidUser.getArrayPermissionOfUser(dataToken.userid)
            const check = getData.includes(action)
            console.log('1111111111',check)
            if (check == true) {
                next();
            } else {
                return res.send({
                    signal: 0,
                    code: 400,
                    message: 'No Permission'
                });
            }
        } catch (err) {
            return res.send({
                signal: 0,
                code: 400,
                message: err
            });
        }
    }
}