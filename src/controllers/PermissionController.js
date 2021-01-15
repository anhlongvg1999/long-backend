import { MidPermission } from "../models/middle";

class PermissionController{
    async getAllPermission(req,res)
    {
        return MidPermission.getAllPermission();
    }
    async getRolePermission(req,res)
    {
        let data = req.query;
        console.log('1111111111111111',data.id)
        return MidPermission.getRolePermission(data.id);
    }

}
export default new PermissionController();