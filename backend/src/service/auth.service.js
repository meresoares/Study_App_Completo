import axios from 'axios';

class AuthService {
  constructor() {}

  login(username, password) {
    return axios.post(`http://localhost:3000/login`, { username, password })
      .then(response => {
        const { data } = response;
        if (data.success) {
          const token = data.token;
          // Guardar el token en localStorage
          return { success: true, token };
        } else {
          return { success: false, error: data.error };
        }
      })
      .catch(error => {
        return { success: false, error: error.message };
      });
  }

}

export default AuthService;
