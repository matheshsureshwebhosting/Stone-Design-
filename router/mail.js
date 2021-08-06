const router = require("express").Router()
const nodemailer = require('nodemailer')
const mails = require('../helpers/randomind')
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch')


var smtpTransport = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    auth: { user: 'info@stonedesigncountertop.com', pass: 'Help#90Std212#' },
    secure: true
});


router.post("/forget", async function (req, res) {
    const {
        forgetemail,
    } = req.body
    var prdata = await mails.randomNo()
    localStorage.setItem("serverOTP", prdata)
    var html = `Your Otp is <b>${prdata}</b> Don't Share Otp to anyone.. This is Valid Only 30 Mins..`
    try {
        mailOptions = {
            from: 'info@stonedesigncountertop.com', //notification@merchantox.com
            to: forgetemail,
            subject: "Password Reset Otp",
            text: "Hello world?",
            html: html,
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                return res.send(error.message)
            } else {
                return res.send(true)
            }
        });
    } catch (error) {
        console.log(error.message)
        return res.send(error.message)
    }
})
router.post("/verify", async (req, res) => {
    const { OTP } = req.body
    try {

        const serverOTP = localStorage.getItem("serverOTP")
        console.log(serverOTP, OTP)
        if (Number(serverOTP) == Number(OTP)) return res.send(true)
        return res.send("Incorrect OTP")
    } catch (error) {
        return res.send(error)
    }
})

module.exports = router