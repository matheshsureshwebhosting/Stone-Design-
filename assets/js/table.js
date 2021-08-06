

submituser()

async function submituser() {
    var submitcount = await axios.get("/file/viewall").then((res) => { return res.data }).catch((error) => { return error.response.data })    
    for (var i = 0; i < submitcount.length; i++) {        
        document.getElementById("reguserlist").innerHTML += `
        <tr>
            <td>${submitcount[i].name}</td>
            <td>${submitcount[i].date}</td>
            <td>${submitcount[i].email}</td>
            <td>${submitcount[i].phone}</td>
            <td><button class="btn btn-info" id="${submitcount[i].uploadid}" onclick="viewuser(this)">View</button><button style='margin-left: 10px;' class="btn btn-danger" id="${submitcount[i].uploadid}" onclick="deleteuser(this)">Delete</button></td>

        </tr>

        `
    }
}


function viewuser(e) {
    console.log(e.id)
    localStorage.setItem("userprofileid", e.id)
    window.location.replace("/userprofile")
}

async function deleteuser(e) {
    console.log(e.id);
    var userinfo = await axios.get(`/file/delete/${e.id}`).then((res) => { return res.data }).catch((error) => { return error.response.data })
    console.log(userinfo);
      if(userinfo==true) return window.location.reload()
}

userinfo()
async function userinfo() {
    var userid = localStorage.getItem("userid")
    var userinfo = await axios.get(`/auth/single/${userid}`).then((res) => { return res.data }).catch((error) => { return error.response.data })
    if (userinfo.length == 0) return window.location.replace("/")
    if (userinfo[0].role != "admin") return window.location.replace("/upload")
}