const router = require("express").Router()
const firebase = require("../database/firebase")
const db = firebase.firestore()
const hash = require("../helpers/bcrypt")

router.post("/signup", async (req, res) => {
    const { email, password, name } = req.body
    try {
        var newuser = req.body
        var checkaccount = await checkAccount(email)
        if (checkaccount.length != 0) return res.status(401).send("Already Register..")
        const pwdHash = await hash.hashGenerator(password)
        newuser["password"] = pwdHash
        newuser["userid"] = Date.now().toString()
        await db.collection("users").doc().set(newuser).then(() => {
            return res.send(newuser)
        }).catch((error) => {
            return res.send(false)
        })
    } catch (error) {
        console.log(error.status)
    }

})


router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        var checkaccount = await checkAccount(email)
        if (checkaccount.length == 0) return res.status(401).send("User Not Register..")
        var hashpwd = checkaccount[0].password
        var checkpassword = await hash.hashVerify(password, hashpwd)
        if (checkpassword == false) return res.status(401).send("Invalid Password..")
        return res.send(checkaccount)
    } catch (error) {
        console.log(error.status)
    }

})
router.get("/", async (req, res) => {
    db.collection("users").get().then((snap) => {
        var data = []
        var dataid = []
        snap.forEach((doc) => {
            if (doc.data() != undefined) {
                data.push(doc.data())
                dataid.push(doc.id)
            }
        })
        return res.json({datas:data,dataid:dataid})
    })
})

checkAccount = async (email) => {
    var checkaccount = new Promise(async (resolve, reject) => {
        await db.collection("users").where("email", "==", email).get().then((snap) => {
            var data = []
            snap.forEach((doc) => {
                if (doc.data() != undefined) {
                    data.push(doc.data())
                }
            })
            return resolve(data)
        })
    })
    return await checkaccount
}

router.get("/single/:userid", async (req, res) => {
    const {userid}=req.params
    var userdata = new Promise(async (resolve, reject) => {
        await db.collection("users").where("userid", "==", userid).get().then((snap) => {
            var data = []
            snap.forEach((doc) => {
                if (doc.data() != undefined) {
                    data.push(doc.data())
                }
            })
            return resolve(data)
        })
    })
    const user=await userdata
    return res.send(user)
})
router.get("/delete/:userid", async (req, res) => {
    const { userid } = req.params    
    console.log(userid);
    try {
        await db.collection("users").doc(userid).delete().then((doc) => {
            return res.send(true)
        }).catch((error)=>{return res.send(false)})
    } catch (error) {
        console.log(error.status)
    }
})



router.post("/updatepswd", async (req, res) => {
const { email, password } =req.body
const pwdHash = await hash.hashGenerator(password)
try {
    await db.collection("users").where("email", "==", email).get().then((snap) => {
      
        snap.forEach((doc) => {
            if (doc.data() != undefined) {
                db.collection("users").doc(doc.id).update({password:pwdHash}).then(() => {
                    return res.send(true)
                }).catch((error) => {
                    return res.send(false)
                }) 
               
            }else{
                return res.send(false)
            }
        })
       
    })
} catch (error) {
    console.log(error.status)
}
})

module.exports = router