const bcrypt = require("bcryptjs")

module.exports.hashGenerator = async (password) => {
    console.log(password)
    try {
        const salt = await bcrypt.genSaltSync(10)
        const hashpwd = await bcrypt.hashSync(password, salt)
        return hashpwd
    } catch (error) {
        console.log(error.message)
        if (error) return false
    }
}

module.exports.hashVerify = async (password, hashpwd) => {
    try {
        const hashVerify = await bcrypt.compare(password, hashpwd)
        return hashVerify
    } catch (error) {
        if (error) return false
    }

}