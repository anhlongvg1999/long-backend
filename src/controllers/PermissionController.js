import { MidPermission } from "../models/middle";

class PermissionController{
    async getAllPermission(req,res)
    {
        return MidPermission.getAllPermission();
    }
    async getRolePermission(req,res)
    {
        let data = req.query;
        return MidPermission.getRolePermission(data.id);
    }

}
export default new PermissionController();