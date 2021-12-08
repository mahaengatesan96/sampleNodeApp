const express = require('express')
const app = express()
const port = 4000
app.use(express.json())
const { body, validationResult } = require('express-validator');
const rules = require('./validations')
const {generateToken, verifyToken} = require('./authentication')

// set a common middleware 
app.use((req, resp, next) => {
    const token = req.headers.token
    console.log("Token:", token)
    if(token) {
        // const verify = verifyToken(token)
        // console.log("Token is verified::", verify)
        verifyToken(token).then((res)=> {
            console.log("Token is verified::", res)  
            return next()
        })
        .catch((err) => {
            console.log("Error happened:", err)
            resp.status(403).json(err)
            // if(err.name === "tokenersrs"){
        // }
        // if(err.name === "JsonWebTokenError"){
        // }
        })
    
    }
    else{
        return next()
    }
})

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + file.originalname)
//     }
//   })
  
// const upload = multer({ storage: storage })

app.listen(port, (err, res) => {
    console.log("Listening at", port)
})

app.get('/sampleGet', (req, res) => {
    console.log("req.headers:", req.headers.test)
    res.json({ status: 1, header: req.headers.test })
})

app.post('/samplePost', 
[...rules.sampleRules],
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Body is:", req.body)
    res.status(200).json({ msg: "Success!", "bodyVal": req.body })
})

// ternary operator - ?:
app.post('/testPost', (req, res) => {
    let columns = "" // ""
    if(req.body.title) {
        columns ? columns+=" title = ?" : columns= "title = ?"
    }
    // column+=  column = column + sdfds
    // columns = "desc = ? "
    if(req.body.desc) {
        columns ? columns+=" desc = ?" : columns= "desc = ?"
    }
    let query = `update notes set ${columns} where id = 1`
    res.json(query)
})

// jwt tokens
app.post('/login', (req, res) => {
    // querying is done. "Hanish" // login is ok 
    const token = generateToken(req.body.user)
    res.json({status: 1, token})
})

app.post('/uploadImage', upload.single('image'), function (req, res, next) {
    console.log("Req.file is:", req.file)
    res.json({status:1, "message" : "/uploadImage"})
  })

app.post('/uploadImages', upload.array('images', 12), function (req, res, next) {
    console.log("Req.file is:", req.files)
    res.json({status:1, "message" : "/uploadImages"})
  })