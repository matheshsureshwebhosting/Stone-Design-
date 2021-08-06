signup = async (e) => {
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var emailreg = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    if (name.trim().length === 0) {
        document.getElementById("fbname").style.display = "block"
        return false
    }
    else if (!emailreg.test(email)) {
        document.getElementById("fbemail").style.display = "block"
        return false
    } else if (password.trim().length === 0) {
        document.getElementById("fbpassword").style.display = "block"
        return false
    } else {

        document.getElementById("signupsubmitbtn").style.display = "none"
        document.getElementById("signupbtn").style.display = "block"
        document.getElementById("fbname").style.display = "none"
        document.getElementById("fbemail").style.display = "none"
        document.getElementById("fbpassword").style.display = "none"
        var newUsers = {
            name: name,
            email: email,
            password: password,
            role: "user"
        }
        var reguser = await axios.post("/auth/signup", newUsers).then((res) => { return res.data }).catch((error) => { return error.response.data })
        if (reguser.userid == undefined) return alert(reguser)
        localStorage.setItem("userid", reguser.userid)
        return window.location.replace("/upload")
    }
}

login = async () => {
    var email = document.getElementById("lemail").value
    var password = document.getElementById("lpassword").value
    var emailreg = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    if (!emailreg.test(email)) {
        document.getElementById("fblemail").style.display = "block"
        return false
    } else if (password.trim().length === 0) {
        document.getElementById("fblpassword").style.display = "block"
        return false
    } else {
        document.getElementById("loginsubmitbtn").style.display = "none"
        document.getElementById("loginbtn").style.display = "block"
        document.getElementById("fblemail").style.display = "none"
        document.getElementById("fblpassword").style.display = "none"
        var loginUser = {
            email: email,
            password: password
        }
        var reguser = await axios.post("/auth/login", loginUser).then((res) => { return res.data }).catch((error) => { return error.response.data })
        if (reguser[0].userid == undefined) return alert(reguser)
        if (reguser[0].role == "user") {
            localStorage.setItem("role", reguser[0].role)
            localStorage.setItem("userid", reguser[0].userid)
            return window.location.replace("/upload")
        } else {
            alert("You Are Not Valid User..")
        }
    }

}