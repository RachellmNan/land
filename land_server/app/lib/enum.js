const LoginType = {
    USER_MINI_PROGRAM: 100,
    USER_EMAIL: 101,
    USER_MOBILE: 102,
    ADMIN_EMAIL: 200,
    isThisType
}

function isThisType(val){
    for(let key in this){
        if(val == this[key]){
            return true
        }
    }
    return false
}

module.exports = {
    LoginType
}