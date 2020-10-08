import axios from 'axios'

const LOGIN = 'admin'
const PASSWORD = 'password'
const USER_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${USER_API_URL}`

class UserDataService {

    retrieveAllUsers() {
        return axios.get(`${INSTRUCTOR_API_URL}/users`, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }});
    }

    deleteUser(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/users/${id}`);
    }

    retrieveUser(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/users/${id}`);
    }

    updateUser(id, user) {
        return axios.put(`${INSTRUCTOR_API_URL}/users/${id}`, user);
    }
  
    createUser(user) {
        return axios.post(`${INSTRUCTOR_API_URL}/users`, user);
    }
}


export default new UserDataService()