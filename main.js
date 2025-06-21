// decarations

var ancor = document.getElementById('ancor');
var form =document.querySelector('.form');
var emailInput = document.getElementById('signinEmail');
var passwordInput = document.getElementById('signinPassword');
var button = document.getElementById('btn')
var body = document.getElementById('body');
var message = document.getElementById('warning-message');
var icons = document.getElementById('icons');
var allRequired = document.getElementById('allRequired');
var usersList = [] ;

// check if their are data in local storage
if(localStorage.getItem('usersList')!=null){
    usersList = JSON.parse(localStorage.getItem('usersList'));
}


// Events

// display icon when foucs the input
passwordInput.addEventListener('focus',function(){
    icons.classList.replace('d-none','d-block');
})

// change type of inputPassword when click on icon
icons.addEventListener('click',function(){
    if(passwordInput.getAttribute('type')==='password'){
        passwordInput.setAttribute('type','text');
        icons.classList.replace('fa-eye','fa-eye-slash')
    }

    else{
        passwordInput.setAttribute('type','password');
        icons.classList.replace('fa-eye-slash','fa-eye');
    }
})

// check if the email and password found in the array
button.addEventListener('click',function(e){
    e.preventDefault();
    if(emailInput.value===''||passwordInput.value==='')
        {
            allRequired.classList.replace('d-none','d-block'); 
        }

        else{
            if(allRequired.classList.contains('d-block')){
                allRequired.classList.replace('d-block','d-none');
            }
            checkIfFound();
        }
})

// change the page to sign up 
ancor.addEventListener('click',function(e){
    e.preventDefault();
    displaySignUp();
   
})



// Functions


// add a new user in array
function add(){

    var NameInput = document.getElementById('signinName');
    var emailInput2 = document.getElementById('signinEmail2');
    var passwordInput2 = document.getElementById('signinPassword2');
    var alreadyExist = document.getElementById('alreadyExist');
    var doneSign = document.getElementById('doneSign');
    allRequired = document.getElementById('allRequired');

    if(NameInput.value===''||emailInput2.value===''||passwordInput2.value===''){
        allRequired.classList.replace('d-none','d-block');
        if(doneSign.classList.contains('d-block'))
        {
            doneSign.classList.replace('d-block','d-none');
        }
    }
    
    else{
    var users = {
             Name: NameInput.value ,
             Email: emailInput2.value ,
             Password : passwordInput2.value 
       }
       

    for(var i = 0 ; i<usersList.length ; i++){
        if(emailInput2.value===usersList[i].Email){
            alreadyExist.classList.replace('d-none','d-block');
            return ;
        }
    }

     usersList.push(users);
     if(allRequired.classList.contains('d-block'))
    {
        allRequired.classList.replace('d-block','d-none');
    }

    doneSign.classList.replace('d-none','d-block');
     localStorage.setItem ('usersList',JSON.stringify(usersList));
    }
    


}
    
// display the page of sign up
function displaySignUp (){
    
  form.innerHTML = `<div class="contaner w-80 m-auto">
            <h2 class="main-color mb-3">Smart Login System</h2>

         <input id="signinName" class="form-control my-3" placeholder="Enter your name" type="text">

         <input id="signinEmail2" class="form-control my-3" placeholder="Enter your email" type="email">

         <div class="position-relative">
         <input id="signinPassword2" class="form-control my-3" placeholder="Enter your Password" type="password">
         <i id="icons" class="fa-solid fa-eye position-absolute icons"></i>
         </div>

         <p id="alreadyExist" class="text-danger d-none text-center">email already exists</p>
         <p id="doneSign" class="text-green d-none text-center">Sucess</p>
         <p id="allRequired" class="text-danger d-none text-center">All inputs is required</p>

         <button id="btn2" class="rounded-2 my-3">Sign Up</button>
         <span class="text-white">Don’t have an account? <a href="">Sign in</a></span>
        </div>` ;

        define();

}

// define the button (signUp) 
function define(){
     var button2 = document.getElementById('btn2');
        button2.addEventListener('click',function(e){
    e.preventDefault();
    add();
})
}


// check if the email and password found in the array
function checkIfFound(){
    for(var i=0;i<usersList.length;i++)
    {
        if(emailInput.value===usersList[i].Email && passwordInput.value===usersList[i].Password){
            body.innerHTML = `<nav class="navbar navbar-expand-lg px-5 shadow bg-body-tertiary">
         <div class="container-fluid">
             <a class="navbar-brand text-white" href="#">SMART LOGIN</a>
             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                 <i class="fa-solid fa-bars nav-icon"></i>
             </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
             <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                 <li class="nav-item">
                      <a id='logout' class="nav-link text-white-50 rounded-2 active" aria-current="page" href="">Log Out</a>
                 </li> 
            </ul>
            </div>
         </div>
       </nav>

      
        <div class="mx-auto welcome text-center py-5">
          <h2>Welcome ${usersList[i].Name}</h2>
        </div>`;
         var logOut = document.getElementById('logout');
         logOut.addEventListener('click',function(){
             returnToMainPage();
         })
        }

        else{
            message.classList.replace('d-none','d-block') ;
        }

    }

    clearFormSignin();
}

// return to the main page (sign in)
function returnToMainPage(){
    form.innerHTML = `<div class="contaner w-80 m-auto">
            <h2 class="main-color mb-3">Smart Login System</h2>
        
         <input id="signinEmail" class="form-control my-3" placeholder="Enter your email" type="email">

         <input id="signinPassword" class="form-control my-3" placeholder="Enter your Password" type="password">

         <button  id="btn" class="rounded-2 my-3">Login</button>
         <span class="text-white">Don’t have an account? <a href="" id="ancor">Sign up</a></span>
        </div>`;
}

// clear the inputs from data
function clearFormSignin(){
    emailInput.value = null ;
    passwordInput.value = null ;
}