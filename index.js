const express = require("express")
const morgan = require("morgan")
const path = require("path")
const port = 1000 || process.env.PORT
var app = express()

app.set("view engine", "ejs")

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/assets", express.static(path.join(__dirname + "/assets")))


app.use(morgan("dev"))
app.use("/mail", (require("./router/mail")))
app.use("/auth", (require("./router/auth")))
app.use("/file", (require("./router/upload")))

app.get("/", (req, res) => {
    return res.render("index")
})
app.get("/upload", (req, res) => {
    return res.render("upload")
})
app.get("/forget", (req, res) => {
    return res.render("forget")
})
app.get("/dashboard", (req, res) => {
    return res.render("admin")
})
app.get("/registeruser", (req, res) => {
    return res.render("registeruser")
})
app.get("/usertable", (req, res) => {
    return res.render("usertable")
})
app.get("/userprofile", (req, res) => {
    return res.render("userprofile")
})
app.get("/admin", (req, res) => {
    return res.render("adminreg")
})
app.get("/uploadfile", (req, res) => {
    return res.render("uploadfile")
})
app.get("/myprofile", (req, res) => {
    return res.render("myprofile")
})


app.listen(port, () => { console.log(`App Running on http://localhost:${port}`) })