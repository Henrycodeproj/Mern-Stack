import axios from "axios"

export const authCheck = async ()=> {
    const URL = 'http://localhost:3001/authtest'
    const response = await axios.get(`${URL}`, {
        headers:{
            "authorization":localStorage.getItem("Token")
        }
    })
    .then(res => res.data)
    .catch(err => {
        console.log(err)
    })
}
