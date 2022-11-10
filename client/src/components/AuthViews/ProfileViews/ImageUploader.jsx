import { Widget } from "@uploadcare/react-widget";
import "./ImageUploader.css"
import axios from "axios"

export const ImageUploader = ({widgetApi, viewedUser, user, setViewedUser}) => {
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
      console.log(response)
      if (response.status === 200 && response.data.new._id === user.id) {
        setViewedUser(response.data.new)
        const res = await axios.delete(`https://ucarecdn.com/files/${response.data.prev.profilePicture}/`,{
          headers:{
            'apiKeyAuth' : '82efe8e1794afced30ba'
          }
        })
        console.log(res)
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