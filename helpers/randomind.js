const rendomno = require("random-number")
const {v4:uuidv4}=require("uuid")
module.exports.randomId = async () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}

module.exports.randomNo = async () => {
    var options ={
        min: 1000,
        max:9999,
        integer: true
    }
    return rendomno(options)
}
module.exports.Uuids=async()=>{    
    return await uuidv4()
}