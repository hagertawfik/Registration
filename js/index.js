"use strict"
let signUpname = document.querySelector("#signUpname")
let signUpemail = document.querySelector("#signUpemail")
let signUppass = document.querySelector("#signUppass")
let signInemail = document.querySelector("#signInemail")
let signInpass = document.querySelector("#signInpass")
let alertMessag = document.querySelector("#alertMessag")
let singInMessage = document.querySelector("#singInMessage")
let buttonLink = document.querySelector("#buttonLink")
let welcomMessage = document.querySelector("#welcomMessage")
let logoutBtn = document.querySelector("#logoutBtn")

let users = [];
if(localStorage.getItem("Ourusers")==null){
    users =[];
}else{
    users= JSON.parse(localStorage.getItem("Ourusers"));
}
function matchName(){
    let regex =/^[A-Za-z]+[0-9]{1,4}$/
    if(regex.test(signUpname.value)==true){
        return true
    }
    else{
        return false
    }
   
  }
function matchEmail(){
    let regex =/^[A-Za-z]{1,15}[0-9]{1,6}@(gmail|yahoo)\.com$/
    if(regex.test(signUpemail.value)==true){
        return true
    }
    else{
        return false
    }
   
  }
function matchPass(){
    let regex =/^[A-Za-z]{1,15}[!@#$&_]?[0-9]{1,8}$/
    if(regex.test(signUppass.value)==true){
        return true
    }
    else{
        return false
    }
   
  }
 
function signUp(){
    if(EmptySingUpInput() == 0){
        alertMessag.innerHTML ='<span class="text-danger">All inputs is Required</span>'
        return 0
    }
    if(matchName()==false){
        alertMessag.innerHTML ='<span class="text-danger">incorrect Name please enter any charchter then any digit from 1 digit upto 4 digit</span>'
        return false
    }
    if(matchEmail()==false){
        alertMessag.innerHTML ='<span class="text-danger">incorrect Email  please enter any charchter from 1char upto 15char then any digit from 1 digit upto 6 digit and @gmail or @yahoo .com</span>'
        return false
    }
    if(matchPass()==false){
        alertMessag.innerHTML ='<span class="text-danger">incorrect password  please enter any charchter from 1char upto 15char then any symbol of these !@#$&_ if you want then any digit from 1 digit upto 6 digit</span>'
        return false
    }
    let user ={
        name:signUpname.value,
        email:signUpemail.value,
        pass:signUppass.value,
    }
    //فى البدايه عشان لو الاراى كان فاضى
    if(users.length == 0){
        users.push(user)
        localStorage.setItem("Ourusers",JSON.stringify(users))
        alertMessag.innerHTML ='<span class="text-success">Success</span>'
       return 0 
    }
    if(userExisted() == -1){
        alertMessag.innerHTML ='<span class="text-danger">email already exists try another Email</span>'
       
    }
    else{
        users.push(user)
        localStorage.setItem("Ourusers",JSON.stringify(users))
        alertMessag.innerHTML ='<span class="text-success">Success</span>'
    }
    
}

function EmptySingUpInput(){
    if(signUpname.value=="" ||signUpemail.value=="" ||signUppass.value==""){ 
        return 0
    }
    else{
        return -1
    }
}

function userExisted(){
for (let index = 0; index < users.length; index++) {
    if( users[index].email.toLowerCase() == signUpemail.value.toLowerCase() ){
                return -1
             } 
}
}

/// login page

function signIn(){
 
    if(EmptySingInInput() == -1){
        singInMessage.innerHTML ='<span class="text-danger">All inputs is Required</span>'
        return -1
    }
    
 for (let index = 0; index < users.length; index++) {
    if(signInemail.value.toLowerCase() == users[index].email.toLowerCase() && signInpass.value.toLowerCase() == users[index].pass.toLowerCase()  ){
      localStorage.setItem("currentName",users[index].name);
        buttonLink.setAttribute("href","smartLogin.html")
        return 0
      
    }
    else{
        singInMessage.innerHTML = '<span class="text-danger">incorrect Email or password</span>'
    }
  
   
 }

}

function EmptySingInInput(){
    if(signInemail.value=="" ||signInpass.value==""){ 
        return -1
    }
    else{
        return 0
    }
}

let welcomeName = localStorage.getItem("currentName");
if(welcomeName != null){
    welcomMessage.innerHTML = `Welcome ${welcomeName}` 
}

function logOut(){
    localStorage.removeItem("currentName")
}
