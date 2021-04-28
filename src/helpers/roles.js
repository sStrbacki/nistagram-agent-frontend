function setRole(role){
    localStorage.setItem('role', role)
}
function getRole(){
    return localStorage.getItem('role')
}
function clearRole(){
    localStorage.removeItem('role')
}

export { setRole, getRole, clearRole }