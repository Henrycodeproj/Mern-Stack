import { Widget } from "@uploadcare/react-widget";
import "./ImageUploader.css"
import axios from "axios"
import { accountContext } from "../../Contexts/appContext";
import { useContext } from "react"; 

export const ImageUploader = ({widgetApi, viewedUser, setViewedUser}) => {

  const {setUser, user} = useContext(accountContext)

  const changeProfileImageHandler = (response) => {
    //console.log(response, 'uploaded resposne')
    //const userInfo = JSON.parse(localStorage.getItem("User"))
    //user.profilePicture = response.profilePicture
    //localStorage.setItem("User", JSON.stringify(userInfo))
    console.log(typeof user, 'user uploader')
    setUser((prev) => ({...prev}, prev.profilePicture = response.profilePicture))
    //setUser(userInfo)
}

  const uploadHandler = async (file) => {
    const results = await file

    if (results.isStored){
      const data = { data: results.uuid}
      const url = `http://localhost:3001/user/update/profileImage/${viewedUser._id}`
      const response = await axios.patch(url, data, {
        headers:{
          "authorization": localStorage.getItem("Token")
        }
      })
      console.log(response, 'response stored')
      if (response.status === 200 && response.data.new._id === user.id) {
        console.log(response.data, user.id)
        setViewedUser(response.data.new)
        changeProfileImageHandler(response.data.new)
        await axios.delete(`https://api.uploadcare.com/files/${response.data.prev.profilePicture}/storage/`, {
          headers: {
            Accept: 'application/vnd.uploadcare-v0.7+json',
            Authorization: 'Uploadcare.Simple 82efe8e1794afced30ba:afa55846bad933aa30ff'
          }
        })
      }
    }
  }

  return (
    <div className="profile_upload_button">
      <Widget ref={widgetApi}
      imagesOnly = "true"
      publicKey="82efe8e1794afced30ba" 
      preloader={null}
      onChange = {e => uploadHandler(e)}
      imageShrink = "640x480"
      />
    </div>
  );
};