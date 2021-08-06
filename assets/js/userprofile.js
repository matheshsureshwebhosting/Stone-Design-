userprofileid = localStorage.getItem("userprofileid")
console.log(userprofileid)
data()
async function data() {
    var data = await axios.get("/file/viewall").then((res) => { return res.data }).catch((error) => { return error.response.data })
    for (var i = 0; i < data.length; i++) {
        if (data[i].uploadid == userprofileid) {
            console.log(data[i], "if")
            document.getElementById("name").innerHTML=data[i].name
            document.getElementById("description").innerHTML=data[i].description
            document.getElementById("address").innerHTML=data[i].address
            document.getElementById("email").innerHTML=data[i].email
            document.getElementById("phone").innerHTML=data[i].phone
            document.getElementById("remark").innerHTML=`${data[i].remark=="" ? "Not Provide":data[i].remark}`
            document.getElementById("referral").innerHTML=`${data[i].referrals=="" ? "Not Provide":data[i].referrals}`
            document.getElementById("image").src=`${data[i].image}`
        }
    }
}

userinfo()
async function userinfo() {
    var userid = localStorage.getItem("userid")
    var userinfo = await axios.get(`/auth/single/${userid}`).then((res) => { return res.data }).catch((error) => { return error.response.data })
    if (userinfo.length == 0) return window.location.replace("/")
    if (userinfo[0].role != "admin") return window.location.replace("/upload")
}