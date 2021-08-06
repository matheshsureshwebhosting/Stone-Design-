const router = require("express").Router()
const firebase = require("../database/firebase")
const db = firebase.firestore()

router.post("/upload", async (req, res) => {
    const { image, name, remark, userid ,date,email,phone,address,referrals,description} = req.body

    try {
        if (userid == 0) return res.status(401).send("Please Register..")
        const docid=Date.now().toString()
        await db.collection("uploads").doc(docid).set({
            image: image,
            remark: remark,
            name: name,
            userid: userid,
            uploadid:docid,
            date: date,
            email: email,
            phone: phone,
            address: address,
            referrals: referrals,
            description: description
        }).then(() => {
            return res.json({uploadid:docid})
        }).catch((error) => {
            return res.send(false)
        })
    } catch (error) {
        console.log(error.status)
    }

})


router.get("/viewall", async (req, res) => {
    try {
        await db.collection("uploads").get().then((snap) => {
            var data = []
            snap.forEach((doc) => {
                if (doc.data() != undefined) {
                    data.push(doc.data())
                }
            })
            return res.send(data)
        })
    } catch (error) {
        console.log(error.status)
    }
})

router.get("/single/:uploadid", async (req, res) => {
    const { uploadid } = req.params
    try {
        var data = []
        await db.collection("uploads").doc(uploadid).get().then((doc) => {
            data.push(doc.data())
        })
        return res.send(data)
    } catch (error) {
        console.log(error.status)
    }
})

router.get("/delete/:uploadid", async (req, res) => {
    const { uploadid } = req.params    
    console.log(uploadid);
    try {
        await db.collection("uploads").doc(uploadid).delete().then((doc) => {
            return res.send(true)
        }).catch((error)=>{return res.send(false)})
    } catch (error) {
        console.log(error.status)
    }
})


module.exports = router