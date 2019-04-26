const express = require("express");

const router = express.Router();
//const multer = require('multer');
const Picture = require("../models/Picture");
const uploadCloud = require("../config/cloudinary.js");

router.get("/", (req, res, next) => {
  Picture.find((err, pictures) => {
    res.render("index", { pictures });
  });
});

router.get("/map", (req, res) => {
  res.render("map");
});

router.post("/upload", uploadCloud.single("photo"), (req, res) => {
  const imgPath = req.file.url;
  const imgName = req.file.originalname;

  const pic = new Picture({
    name: req.body.pictureName,
    path: imgPath,
    originalName: imgName
  });

  pic.save(err => {
    console.log(err);
    res.redirect("/");
  });
});

module.exports = router;
