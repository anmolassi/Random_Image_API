const saveImg = require("../models/save_img");
const functions = require("firebase-functions");
const UUID = require("uuid-v4");
const formidable = require("formidable-serverless");
var admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
var serviceAccount = require("../downloadKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const storage = new Storage({
  keyFilename: "downloadKey.json",
});

module.exports.home = function (req, res) {
  return res.render("home");
};
module.exports.upload = async function (req, res, next) {
  try {
    var fileinfo = req.files;
    console.log(fileinfo);
    let url;
    const bucket = storage.bucket("gs://random-movie-image.appspot.com");
    for (let i = 0; i < req.files.length; i++) {
      const imageResponse = await bucket
        .upload(fileinfo[i].path, {
          destination: `uploads/${fileinfo[i].originalname}`,
          resumable: true,
        })
        .then((err, file) => {
        //   url = file;
        });

      const file = bucket.file(`uploads/${fileinfo[i].originalname}`);
      await file
        .getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        })
        .then((signedUrls) => {
          // signedUrls[0] contains the file's public URL
          url = signedUrls[0];
        });
      console.log(url);
      saveImg.create({
        author: "Anmol Assi",
        linkedIn: "https://www.linkedin.com/in/anmol-assi-b2b0b6208",
        originalName: fileinfo[i].originalname,
        fileName: fileinfo[i].filename,
        path: `${url}`,
        bytes: fileinfo[i].size,
      });
    }
    res.send(fileinfo);
  } catch (err) {}
};
module.exports.getImage = function (req, res) {
  // Math.floor(Math.random() * (1500 - 13 + 1)) + 13
  const getImg = Math.floor(Math.random() * (160 - 1 + 1)) + 1;
  saveImg.find({ originalName: `(${getImg}).jpg` }, function (err, image) {
    if (!image.length) {
      res.send({
        failure: 1,
      });
      return;
    }
    res.send(image[0]);
  });
};
