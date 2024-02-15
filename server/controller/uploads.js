const router = require('express').Router()
const multer = require('multer')
const fs = require('fs')
const { User } = require('../models')

const upload = multer({ dest: './uploads/' })

router.post('/', upload.single('file'), async (req, res) => {
  const userId = req.body.userId
  if (!userId) {
    return res.status(400).json('No user ID provided')
  }
  const user = await User.findById(userId)
  if (!user) {
    return res.status(400).json('User not Fund')
  }
  const file = req.file
  if (!file) {
    return res.status(400).json('No file found')
  }
  const originalFilename = file.originalname
  const filenameWithoutSpaces = originalFilename.replace(/\s+/g, '')
  const filename = userId + filenameWithoutSpaces
  const newFilePath = './uploads/' + filename
  fs.renameSync(file.path, newFilePath)
  user.pfp = newFilePath
  await user.save()
  res.json({ message: 'File uploaded successfully', filename: filename })
})

module.exports = router
