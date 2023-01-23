import express from "express";
import PostModel from "../Models/Posts.js";
import UserModel from "../Models/Users.js";

export const router = express.Router();

router.post("/Post", async (req, res) => {
  const { order } = req.body.params.sort
    try {
      const posts = await PostModel.find({})
        .sort({ createdAt: order})
        .populate("posterId", [
          "username",
          "email",
          "createdAt",
          "profilePicture",
        ])
        .populate("attending", ["username", "profilePicture"]);
  
      return res.status(200).json(posts);
    } catch (err) {
      console.log(err)
      return res.status(500).json("Internal Server Error");
    }
});

router.post("/Users", async (req, res) => {

  const { order } = req.body.params.sort

  try {
    const users = await UserModel.find({})
    .sort({ createdAt: order})
    console.log(users)
    return res.status(200).json(users);
  }catch(error) {
    console.log(err)
    return res.status(500).send("Internal Server Error")
  } 
}) 


router.patch("/Post/delete", async (req, res) => {
    console.log(req.body, 'delete')
    const { id } = req.body.params
    try {
        const posts = await PostModel.deleteOne({_id: id})
    } catch(error) {
        console.log(error)
    }
})

router.patch("/Users/delete", async (req, res) => {
  const { id } = req.body.params
  try {
      const posts = await PostModel.deleteOne({_id: id})
  } catch(error) {
      console.log(error)
  }
})

router.patch("/Post/deleteMany", async (req, res) => {
  const { ids } = req.body.params
  try {
      const posts = await PostModel.deleteMany({_id:{ $in:ids }})
  } catch(error) {
      console.log(error)
  }
})

router.patch("/Users/deleteMany", async (req, res) => {
  const { ids } = req.body.params
  try {
      const posts = await PostModel.deleteMany({_id:{ $in:ids }})
  } catch(error) {
      console.log(error)
  }
})

router.put("/Post/update", async (req, res) => {
  const updated = req.body.params.data
  delete updated.id

  const filter = { _id : updated._id }
  const update = { Description : updated.Description }
  try {
      const posts = await PostModel.findByIdAndUpdate(filter, update)
  } catch(error) {
      console.log(error)
  }
})

/*router.put("/Users/update", async (req, res) => {
  const updated = req.body.params.data
  delete updated.id

  const filter = { _id : updated._id }
  const update = { Description : updated.Description }
  try {
      const posts = await PostModel.findByIdAndUpdate(filter, update)
  } catch(error) {
      console.log(error)
  }
})*/

router.put("/Post/getOne", async (req, res) => {
  const { id } = req.body.params
  console.log(id)
  try {
      const posts = await PostModel.findOne({_id: id})
  } catch(error) {
      console.log(error)
  }
})

router.put("/Users/getOne", async (req, res) => {
  const { id } = req.body.params
  console.log(id)
  try {
      const posts = await PostModel.findOne({_id: id})
  } catch(error) {
      console.log(error)
  }
})