import axios from 'axios'

const USER_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${USER_API_URL}`

class HealthBenefitsDataService {

    retrieveAllBenefits() {
        return axios.get(`${INSTRUCTOR_API_URL}/healthbenefits`, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }});
    }

    deleteBenefit(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/healthbenefits/${id}`);
    }

    retrieveBenefit(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/healthbenefits/${id}`);
    }

    updateBenefit(id, benefit) {
        return axios.put(`${INSTRUCTOR_API_URL}/healthbenefits/${id}`, benefit);
    }
  
    createBenefit(benefit) {
        return axios.post(`${INSTRUCTOR_API_URL}/healthbenefits`, benefit);
    }
}


export default new HealthBenefitsDataService()