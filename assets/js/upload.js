var userid = localStorage.getItem("userid")
upload = async () => {
    var file = document.getElementById("file").files[0]
    var name = document.getElementById("name").value
    var date = document.getElementById("date").value
    var email = document.getElementById("email").value
    var phone = document.getElementById("phone").value
    var address = document.getElementById("address").value
    var referrals = document.getElementById("referrals").value
    var description = document.getElementById("description").value
    var remark = document.getElementById("remark").value
    if (file == null) {
        alert("please Upload Image")
    } else {
        document.getElementById("submitbtn").style.display = "none"
        document.getElementById("uploadbtn").style.display = "block"
        var imageupload = await imageUpload(file)
        var newUpload = {
            image: imageupload,
            name: name,
            remark: remark,
            userid: userid,
            date: date,
            email: email,
            phone: phone,
            address: address,
            referrals: referrals,
            description: description

        }
        console.log(newUpload)
        var Upload = await axios.post("/file/upload", newUpload).then((res) => { return res.data }).catch((error) => { return error.response.data })
        console.log(Upload)
        window.location.reload()
    }

}

imageUpload = async (file) => {
    var imageUpload = new Promise(async (resolve, reject) => {
        var path = "uploads/"
        var filename = `${Date.now().toString()}.jpeg`
        var storageRef = firebase.storage().ref(path + filename);
        await storageRef.put(file).then(function (snapshot) {
            console.log('Uploaded a blob or file!');
            storageRef.getDownloadURL().then(function (url) {
                resolve(url)
            })
        });
    })
    return await imageUpload
}
userinfo()
async function userinfo() {
    var userid = localStorage.getItem("userid")
    var userinfo = await axios.get(`/auth/single/${userid}`).then((res) => { return res.data }).catch((error) => { return error.response.data })
    if (userinfo.length == 0) return window.location.replace("/")
    document.getElementById("name").value = userinfo[0].name
    document.getElementById("email").value = userinfo[0].email
    console.log(userinfo[0].role)
    if (userinfo[0].role == "admin") {
        document.getElementById("dashboard").style.display = "block"
    } else {
        document.getElementById("dashboard").style.display = "none"
    }
}
