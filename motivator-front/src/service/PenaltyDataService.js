import axios from 'axios'

const USER_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${USER_API_URL}`

class PenaltyDataService {

    retrieveAllPenalties() {
        return axios.get(`${INSTRUCTOR_API_URL}/penalties`, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }});
    }

    deletePenalty(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/penalties/${id}`);
    }

    retrievePenalty(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/penalties/${id}`);
    }

    updatePenalty(id, penalty) {
        return axios.put(`${INSTRUCTOR_API_URL}/penalties/${id}`, penalty);
    }
  
    createPenalty(penalty) {
        return axios.post(`${INSTRUCTOR_API_URL}/penalties`, penalty);
    }
}


export default new PenaltyDataService()