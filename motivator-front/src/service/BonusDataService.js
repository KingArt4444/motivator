import axios from 'axios'

const USER_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${USER_API_URL}`

class BonusDataService {

    retrieveAllBonuses() {
        return axios.get(`${INSTRUCTOR_API_URL}/bonuses`, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }});
    }

    deleteBonus(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/bonuses/${id}`);
    }

    retrieveBonus(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/bonuses/${id}`);
    }

    updateBonus(id, bonus) {
        return axios.put(`${INSTRUCTOR_API_URL}/bonuses/${id}`, bonus);
    }
  
    createBonus(bonus) {
        return axios.post(`${INSTRUCTOR_API_URL}/bonuses`, bonus);
    }
}


export default new BonusDataService()