usercount()
async function usercount() {
    var count = await axios.get("/auth").then((res) => { return res.data }).catch((error) => { return error.response.data })
    document.getElementById("reguser").innerHTML = count.datas.length
}

submituser()

async function submituser() {
    var submitcount = await axios.get("/file/viewall").then((res) => { return res.data }).catch((error) => { return error.response.data })

    document.getElementById("submitreg").innerHTML = submitcount.length
}

userinfo()
async function userinfo() {
    var userid = localStorage.getItem("userid")
    var userinfo = await axios.get(`/auth/single/${userid}`).then((res) => { return res.data }).catch((error) => { return error.response.data })
    if (userinfo.length == 0) return window.location.replace("/")
    if (userinfo[0].role != "admin") return window.location.replace("/upload")
}