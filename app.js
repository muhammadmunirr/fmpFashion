

var firebaseConfig = {
    
    apiKey: "AIzaSyDP__mgGBg6u1LMD03ykCjSLEi8n30bdRI",
    authDomain: "login-9685e.firebaseapp.com",
    databaseURL: "https://login-9685e-default-rtdb.firebaseio.com",
    projectId: "login-9685e",
    storageBucket: "login-9685e.appspot.com",
    messagingSenderId: "725107724424",
    appId: "1:725107724424:web:71803e8f9d106cc9550f3d"
 
};


firebase.initializeApp(firebaseConfig);
var userId;


function onAuthChg(){
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  console.log(user);
  userId=user.uid
  } else {
    console.log("onAuth");
    userId=undefined
  }
});
}


function singup(){
var email = document.getElementById("email");
var pass = document.getElementById("pass");
app.auth().createUserWithEmailAndPassword(email.value,pass.value)
.then(function(success){
  console.log(success);
  var userObj={
      email:email.value,
      pass:pass.value,
      key:success.user.uid
  }
  app.database().ref('/').child('/usersData').push(userObj)
})
.catch(function(error){
  console.log(error)
})
}


function login(){
var email = document.getElementById("emailLg");
var pass = document.getElementById("passLg");
app.auth().signInWithEmailAndPassword(email.value,pass.value)
.then(function(success){
  console.log(success);

})
.catch(function(error){
  console.log(error)
})
}

function addPro(){
var title = document.getElementById("title");
var price = document.getElementById("price");
var desc = document.getElementById("desc");
var imgPro = document.getElementById("imgPro");
var proObj={
title:title.value,
price:price.value,
desc:desc.value,
imgPro:imgPro.value,
};
app.database().ref('/products').push(proObj)
}

function addToCart(eleThis){
console.log(eleThis);
if(userId){
var proObj={
title:eleThis.parentNode.childNodes[0].innerHTML,
desc:eleThis.parentNode.childNodes[1].innerHTML,
price:eleThis.parentNode.childNodes[2].innerHTML,
imgUrl:eleThis.parentNode.childNodes[3].src,
}

app.database().ref("/usersData").on("child_added",function(data){

if(userId == data.val().key){
app.database().ref('/usersData').child(data.key).child("addProList").push(proObj)
}

})

}
else{
alert("please login first")
}
}

function getAllPost(){
app.database().ref('/products').on("child_added",function(data){
console.log(data.val());

var divProList = document.getElementById('proList');
var divEle = document.createElement("div");
divEle.setAttribute("class","proDiv");

var proTitle = document.createElement("p");
proTitle.innerHTML= data.val().title;
var proDesc = document.createElement("p");
proDesc.innerHTML= data.val().desc;
var proPrice = document.createElement("p");
proPrice.innerHTML= data.val().price;
var proImg = document.createElement("img");
proImg.setAttribute("src",data.val().imgPro);
proImg.setAttribute("width","50px");
proImg.setAttribute("height","50px");
var probtn = document.createElement("button");
probtn.innerHTML="Add To Cart"
probtn.setAttribute("onclick","addToCart(this)")
divEle.appendChild(proTitle);
divEle.appendChild(proDesc);
divEle.appendChild(proPrice);
divEle.appendChild(proImg);
divEle.appendChild(probtn);
divProList.appendChild(divEle);
})
}


function logout() {
firebase.auth().signOut()
.then(function(res){
  console.log(res)
}).catch((error) => {
  console.log(error)
  // An error happened.
});
}

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

//   Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// setup our register function
function register(){
    // get all input fields
    email = document.getElementById('email').value
    pass = document.getElementById('pass').value
    confpass = document.getElementById('conf pass').value


}

// validat input fields
if(validate_email(email) == false || validate_passward(pass) == false || validate_field(confpass)){
    alert('Email or Passward is Outta Line!!')
    return
}


// Move on with auth
auth.createUserWithEmailAndPassward(email,pass)
    .then(function(){
        var user = auth.currentUser

        // Add this user to firebase
        var database_ref = database.ref()

        // Create User data
        var user_data = {
            email : email,
            pass : pass,
            last_login : Date.now()  
        }

        database_ref.child('users/' + user.uid).set(user_data)









        alert('User Created')


    })
    .catch(function(error){
        var error_code = error.code
        var error_message = error.message

        alert(error_message)
    })

function validate_email(email){
    expression = /^[^@]+@\w+(\.\w+)+\w$/
if(expression.test(email) == true){
    return  true
}
    else{
        return false
    }
}


function validate_passward(passward){
    if(passward < 6){
        return false
    }
        else{
            return true
        }
}

function validate_field(field){
    if(field == null){
        return false
    }
    else{
        return true
    }
}


// // const product = [
// //     {
// //         id: 0,
// //         image: 'image/topcard1.png',
// //         title: 'Smart Watch',
// //         price: $200,
// //     },
// //     {
// //         id: 1,
// //         image: 'image/topcard2.png',
// //         title: 'Nike Shoes',
// //         price: $150,
// //     },
// //     {
// //         id: 2,
// //         image: 'image/topcard3.png',
// //         title: 'Bag',
// //         price: $50,
// //     },
// //     {
// //         id: 3,
// //         image: 'image/p16.png',
// //         title: 'Men Jacket',
// //         price: $100,
// //     }
// // ];

// // const categories = [...new Set(product.map((item) =>
// //     {return item}))]
// //     let i=0;
// // document.getElementById('root').innerHTML = categories.map((item) =>
// // {
// //     var{image, title, price} = item;
// //     return(
// //         `<div class='box'>
// //             <div class='img-box'>
// //                 <img class='images' src= ${image}></img>
// //             </div>
// //         <div class='bottom'>
// //         <p>${title}</p>
// //         <h2>$ ${price}.00</h2>`+
// //         "<button onclick='addtocart("+(i++)+")'>Add to Cart</button>"+
// //         `<div>
// //         </div>`
// //     )
// // }).join('')