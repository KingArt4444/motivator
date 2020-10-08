import axios from 'axios'

const USER_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${USER_API_URL}`

class WorkAmountDataService {

    retrieveAllAmounts() {
        return axios.get(`${INSTRUCTOR_API_URL}/workamounts`, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }});
    }

    deleteAmount(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/workamounts/${id}`);
    }

    retrieveAmount(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/workamounts/${id}`);
    }

    updateAmount(id, amount) {
        return axios.put(`${INSTRUCTOR_API_URL}/workamounts/${id}`, amount);
    }
  
    createAmount(amount) {
        return axios.post(`${INSTRUCTOR_API_URL}/workamounts`, amount);
    }
}


export default new WorkAmountDataService()