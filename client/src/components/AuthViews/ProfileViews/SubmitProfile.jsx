import axios from "axios";
import FaceIcon from '@mui/icons-material/Face';
import { useState } from "react";

export const SubmitProfile = () =>  {
    const [uploadedImage, setUploadedImage] = useState(null)

    const submitHandler = async () => {
        console.log('submitting')
        const newUpload = new FormData()

        newUpload.append("file", uploadedImage)
        newUpload.append("UPLOADCARE_PUB_KEY", '82efe8e1794afced30ba')
        newUpload.append("UPLOADCARE_STORE", "auto")

        const response = await axios.post('https://upload.uploadcare.com/base/', newUpload, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
        console.log(response)
    }

    const change = async() => {
        const response = await axios.put('https://api.uploadcare.com/files/2e68c5cb-f1a4-4a27-b4a2-edbcdeedb95a/storage/')
        console.log(response)
    }
    return (
      <>
        <input type = "file" style = {{fontSize:"unset"}} onChange = {e => setUploadedImage(e.target.files[0])} />
        <button type = "submit" onClick={() => submitHandler()}>Submit</button>
        <button onClick = {() => change}>uid</button>
      </>
    )
}
