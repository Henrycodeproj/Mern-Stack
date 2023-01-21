import express from "express";
import PostModel from "../Models/Posts.js";

export const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const posts = await PostModel.find({})
        .sort({ createdAt: -1 })
        .populate("posterId", [
          "username",
          "email",
          "createdAt",
          "profilePicture",
        ])
        .populate("attending", ["username", "profilePicture"]);
      return res.status(200).send(posts);
    } catch (err) {
      return res.status(500).send("Internal Server error");
    }
});

router.patch("/delete", async (req, res) => {
    const { ids } = req.body.params
    try {
        const posts = await PostModel.deleteMany({_id:{ $in:ids }})
    } catch(error) {
        console.log(error)
    }
})

router.put("/update", async (req, res) => {
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

router.put("/getOne", async (req, res) => {
  const { id } = req.body.params
  try {
      const posts = await PostModel.findOne({_id: id})
  } catch(error) {
      console.log(error)
  }
})