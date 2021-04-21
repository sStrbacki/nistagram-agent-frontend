function setJwt(jwtToken){
    localStorage.setItem('jwtToken', jwtToken)
}
function getJwt(){
    return localStorage.getItem('jwtToken')
}
function clearJwt(){
    localStorage.removeItem('jwtToken')
}

function isAuthenticated(){
    return localStorage.getItem('jwtToken') != null
}

export { setJwt, getJwt, isAuthenticated, clearJwt }