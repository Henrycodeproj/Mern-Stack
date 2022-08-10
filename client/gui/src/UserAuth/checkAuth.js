import axios from "axios";

export const authCheck = async ()=> {

    const URL = 'http://localhost:3001/authtest'
    return await axios.get(`${URL}`, {
        headers: {
            "authorization": localStorage.getItem("Token")
        }
    })
}
