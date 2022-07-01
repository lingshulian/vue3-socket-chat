const express = require('express')
const router = express.Router()
const multer = require("multer")
const fs = require("fs")
const { S3Client, PutObjectCommand  } = require('@aws-sdk/client-s3')
const {s3Config: {config, path, bucket}} = require('../config') 

const s3Client = new S3Client(config)

function deleteall(path) {
  fs.unlink(path, function(error){
    if(error){
      console.log(error)
    }
    console.log('删除文件成功')
  })
}

router.post('/uploadFile', (req,_,next)=>{
  // req.newTime = +new Date()
  next()
},
  multer({
    dest: "upload"
  }).array("file", 1),
  function (req, res) {
    const files = req.files[0]
    const fileStream = fs.createReadStream(files.path)
    try {
      // console.log(+new Date() - req.newTime)
      s3Client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: `${path}/${files.filename}`,
        Body: fileStream
      })).then(_res => {
        deleteall(files.path)
        // console.log(+new Date() - req.newTime)
        res.cc('上传成功', 200 ,{...files, url: `${config.endpoint}/${bucket}/${path}/${files.filename}`})
      }).catch((err)=>{
        deleteall(files.path)
        res.cc(err)
      })
    } catch (err) {
      deleteall(files.path)
      res.cc(err)
    }
  })

module.exports = router