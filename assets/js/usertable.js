submituser()

async function submituser() {
    var reguser = await axios.get("/auth/").then((res) => { return res.data }).catch((error) => { return error.response.data })    
   console.log(reguser.datas.length)
    for (var i = 0; i < reguser.datas.length; i++) {        
        document.getElementById("reguserlistdetails").innerHTML += `
        <tr>
            <td>${reguser.datas[i].name}</td>
            <td>${reguser.datas[i].email}</td>
            <td>${reguser.datas[i].role}</td>
            <td><button style='margin-left: 10px;' class="btn btn-danger" id="${reguser.dataid[i]}" onclick="deleteuser(this)">Delete</button></td>

        </tr>

        `
    }
}
async function deleteuser(e) {
    console.log(e.id);
    var userinfo = await axios.get(`/auth/delete/${e.id}`).then((res) => { return res.data }).catch((error) => { return error.response.data })
    console.log(userinfo);
      if(userinfo==true) return window.location.reload()
}