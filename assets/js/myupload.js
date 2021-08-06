
var userid = localStorage.getItem("userid")
submituser()

async function submituser() {
    var submitcount = await axios.get("/file/viewall").then((res) => { return res.data }).catch((error) => { return error.response.data })
    var data = []
    for (var i = 0; i < submitcount.length; i++) {
        console.log(submitcount[i])
        if (userid == submitcount[i].userid) {
            data.push(submitcount[i])
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
    console.log(data.length)
    if (data.length == 0) {
        document.getElementById("notification").style.display = "block"

    } else {
        document.getElementById("notification").style.display = "none"
    }
}

function viewuser(e) {
    console.log(e.id)
    localStorage.setItem("userprofileid", e.id)
    window.location.replace("/myprofile")
}

async function deleteuser(e) {
    console.log(e.id);
    var userinfo = await axios.get(`/file/delete/${e.id}`).then((res) => { return res.data }).catch((error) => { return error.response.data })
    console.log(userinfo);
      if(userinfo==true) return window.location.reload()
}