const Post = require('../models/post')
const userModel = require('../models/members')
const express = require('express');
const router = express.Router();
var ObjectId = require("mongodb").ObjectId;

router.get("/", (req, res) => {
    console.log("getting post")
    res.json({
        Posts:
            [
                {
                    title: 'first post'
                },
                {
                    title: 'Second Post'
                }
            ]
    })
})

/**
 * Add New User
 */
router.post("/add", (req, res) => {
  console.log(req.body)
    const post = new userModel(req.body)
    post.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        else {
            res.status(200).json({
                Post: result
            })
        }
    })
    console.log("CREATING POST: ", post)
})


router.get("/getPosts", (req, res) => {
    Post.find()
        .then((posts) => {
            res.status(200).json({
                Posts: posts
            });
        })
        .catch(err => console.log("Error"))
});



router.put("/updatePost/:id", (req, res, next)=> {
    console.log("Updating" , req.params)
  console.log(req.body)
    var id = ObjectId( req.params.id);
    var update = req.body;
    var options = {
      new: true,
      upsert: true,
    };
    Post
      .findByIdAndUpdate(id, update, options)
      .then((result)=> {
        res.status(200).json({
          status: "success",
          update: result,
          message: "Updated data.",
        });
      })
      .catch(function (err) {
        return res.status(400).send({
          error: err,
          message: "Error occured",
        });
      });
  });


  router.delete("/remove/:id", (req, res)=> {
      console.log("removed",req.query)
    Post.remove(
      { _id: ObjectId(req.params.id) },
      (err, deletedAchievementResult)=> {
        res.status(200).json({
          status: "Success",
          message: "Achievement Removed",
        });
      }
    );
  });

  router.patch("/patchPost/:id", (req, res, next)=> {
    console.log("Updating")
  console.log(req.body)
    var id = ObjectId( req.params.id);
    var update = req.body;
    var options = {
      new: true,
      upsert: true,
    };
    Post
      .findByIdAndUpdate(id, update, options)
      .then((result)=> {
        res.status(200).json({
          status: "success",
          update: result,
          message: "Updated data.",
        });
      })
      .catch(function (err) {
        return res.status(400).send({
          error: err,
          message: "Error occured",
        });
      });
  });


  
// patch('/user/:id', function (req, res) { var updateObject = req. body; // {last_name : "smith", age: 44} var id = req.params.id; db. users. update({_id : ObjectId(id)}, {$set: updateObject}); });


module.exports = router
