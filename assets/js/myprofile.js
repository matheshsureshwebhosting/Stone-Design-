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
