function setLocalRole(role){
    localStorage.setItem('role', role)
}
function getLocalRole(){
    return localStorage.getItem('role')
}
function clearLocalRole(){
    localStorage.removeItem('role')
}

export { setLocalRole, getLocalRole, clearLocalRole }
