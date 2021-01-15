import { MidRole } from "../models/middle";

class RoleCotroller {

    async getallRole(req, res) {
        let dataQuery = req.query;
        return await MidRole.getallRole(dataQuery);
    }
    async createRole(req, res) {
        let data = req.body;
        return MidRole.createRole(data);
    }
    async deleteRole(req, res) {
        let dataQuery = req.query;
        return MidRole.deleteRole(dataQuery);
    }
    async updateRole(req, res) {
        let data = req.body;
        return MidRole.updateRole(data)
    }
    async searchRole(req, res) {
        let dataQuery = req.query;
        return MidRole.searchRole(dataQuery);
    }
    async updateRoleUser(req,res){
        let data = req.body;
        console.log(data)
        return MidRole.updateRoleUser(data.user_id,data.listUserRole)
    }
}
export default new RoleCotroller();