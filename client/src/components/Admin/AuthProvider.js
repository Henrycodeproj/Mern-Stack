import { AUTH_LOGIN } from 'react-admin';

//export const authProvider =  async (type, params) => {
//    login: params => Promise.resolve(),
//    //if (type === AUTH_LOGIN) {
//    //    const { username, password } = params;
//    //    const request = new Request('https://mydomain.com/authenticate', {
//    //        method: 'POST',
//    //        body: JSON.stringify({ username, password }),
//    //        headers: new Headers({ 'Content-Type': 'application/json' }),
//    //    })
//    //    return fetch(request)
//    //        .then(response => {
//    //            if (response.status < 200 || response.status >= 300) {
//    //                throw new Error(response.statusText);
//    //            }
//    //            return response.json();
//    //        })
//    //        .then(({ token }) => {
//    //            localStorage.setItem('token', token);
//    //        });
//    //}
//    return Promise.resolve();
//}

export const authProvider = {
    login: ({ username, password }) => {
        console.log(username,password)
        if (username !== 'a' || password !== 'a') {
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