import axios from "axios";

export const authProvider = {
    login: async ({ username, password }) => {
        const information = {
            username : username,
            password: password
        }
        const url = "http://localhost:3001/admin/authenticate"
        const response = await axios.post(url, information, {
            headers:{
                "authorization":localStorage.getItem("Token")
            }
        })
        console.log(response)
        if (response.data === false) {
            return Promise.reject();
        }
        localStorage.setItem('username', username);
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
        checkAuth: () =>
        localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
    checkError:  (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    getIdentity: () =>
        Promise.resolve({
            id: 'user',
            fullName: 'Henry',
        }),
    getPermissions: () => Promise.resolve(''),
};

export default authProvider;