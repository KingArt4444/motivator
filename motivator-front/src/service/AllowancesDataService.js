import axios from 'axios'

const USER_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${USER_API_URL}`

class AllowancesDataService {

    retrieveAllAllowances() {
        return axios.get(`${INSTRUCTOR_API_URL}/allowances`, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }});
    }

    deleteAllowance(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/allowances/${id}`);
    }

    retrieveAllowance(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/allowances/${id}`);
    }

    updateAllowance(id, allowance) {
        return axios.put(`${INSTRUCTOR_API_URL}/allowances/${id}`, allowance);
    }
  
    createAllowance(allowance) {
        return axios.post(`${INSTRUCTOR_API_URL}/allowances`, allowance);
    }
}


export default new AllowancesDataService()