import axios from "axios"

export const authCheck = ()=> {
    const URL = 'http://localhost:3001/authtest'
    return axios.get(`${URL}`, {
        headers:{
            "authorization":localStorage.getItem("Token")
        }
    })
    .then(async res=>await res.data)
    .catch(err => console.log(err))
}
