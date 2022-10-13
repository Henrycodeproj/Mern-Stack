import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

export const SocialMediaBar = ({viewedUser}) => {
  return (
    <div className="social_media_bar">
    {
      viewedUser.socialMedia?.linkedin &&
      <a href = {viewedUser.socialMedia.linkedin} target = "blank">
        <LinkedInIcon sx = {{fontSize:"30px", color:"#0072b1", cursor:"pointer"}}/>
      </a>
    }
    {
      viewedUser.socialMedia?.instagram &&
      <a href = {viewedUser.socialMedia.instagram} target = "blank">
      <InstagramIcon sx = {{fontSize:"30px", color:"#bc2a8d", cursor:"pointer"}}/>
      </a>
    }
    {
      viewedUser.socialMedia?.facebook &&
      <a href = {viewedUser.socialMedia.facebook} target = "blank">
      <FacebookIcon sx = {{fontSize:"30px", color:"#4267B2", cursor:"pointer"}}/>
      </a>
    }
    {
      viewedUser.socialMedia?.twitter &&
      <a href = {viewedUser.socialMedia.twitter} target = "blank">
      <TwitterIcon sx = {{fontSize:"30px", color:"#00acee", cursor:"pointer"}}/>
      </a>
    }
    {
      viewedUser.socialMedia?.github &&
      <a href = {viewedUser.socialMedia.github} target = "blank">
      <GitHubIcon sx = {{fontSize:"30px", color:"#171515", cursor:"pointer"}}/>
      </a>
    }
</div>
  )
}
