document.getElementById("loader2").style.display = "none";
const firebaseConfig = {
  apiKey: "AIzaSyAa9QbVxTn64IMajSUUfpdA3GDfPpNCLZE",
  authDomain: "wa-automate1.firebaseapp.com",
  databaseURL: "https://wa-automate1-default-rtdb.firebaseio.com",
  projectId: "wa-automate1",
  storageBucket: "wa-automate1.appspot.com",
  messagingSenderId: "446297665418",
  appId: "1:446297665418:web:e472f8d6e2ac8c8aaaa273",
  measurementId: "G-MT4MF44REV"
};
firebase.initializeApp(firebaseConfig);
document.getElementById("loader").style.display = "none";
var formMessage = firebase.database();
var newdate = new Date();
const auth = firebase.auth();
const database = firebase.database();
var user = firebase.auth().currentUser;
document.getElementById("error").style.display = "none";

function signin(){
  document.getElementById("loader").style.display = "block";

				var email = document.getElementById("emailq").value;
				var password = document.getElementById("pass").value;
				if (password==""){
          document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
          document.getElementById("loader").style.display = "none";

        document.getElementById("pass").style.borderColor = "red";
        document.getElementById("l6").style.color = "red";
document.getElementById("error").style.display = "block";
        setTimeout( function(){document.getElementById("error").style.display = "none";}, 2000);
        document.getElementById("p").innerHTML = "Enter Password"
        return false;
    }
   if (email==""){
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      document.getElementById("loader").style.display = "none";

        document.getElementById("emailq").style.borderColor = "red";
        document.getElementById("l5").style.color = "red";  
              document.getElementById("error").style.display = "block";
        setTimeout( function(){document.getElementById("error").style.display = "none";}, 2000);
        document.getElementById("p").innerHTML = "Enter Email"
        return false;
    }
				auth.signInWithEmailAndPassword(email,password)
.then(function(){
  document.getElementById("loader").style.display = "none";
  var user = auth.currentUser;
  localStorage.setItem("user", user.uid);
  localStorage.setItem("user11", email);
  //Device Detection
  var device = "";
  var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
    };
    if( isMobile.Android() ) {
      device = "Android";
    }
    else if( isMobile.BlackBerry() ) {
      device = "BlackBerry";
    }
    else if( isMobile.iOS() ) {
      device = "IOS";
    }
    else if( isMobile.Opera() ) {
      device = "Opera";
    }
    else if( isMobile.Windows() ) {
      device = "Windows Phone";
    }
    else {
      device = "Desktop";
    };
    let userAgent = navigator.userAgent;
    let browserName;
    
    if(userAgent.match(/chrome|chromium|crios/i)){
        browserName = "chrome";
      }else if(userAgent.match(/firefox|fxios/i)){
        browserName = "firefox";
      }  else if(userAgent.match(/safari/i)){
        browserName = "safari";
      }else if(userAgent.match(/opr\//i)){
        browserName = "opera";
      } else if(userAgent.match(/edg/i)){
        browserName = "edge";
      }else{
        browserName="No browser detection";
      }

      fetch("http://localhost:5100/signinhandler", {
        method : "POST",
        headers: { 'Content-Type': 'application/json' ,    },
        body : JSON.stringify({
          userr : user.uid + "//",
          password : password,
          device : device,
          browserName : browserName,
          isgogl : false
        })
      }).then(response => response.json())
      .then(function(res){
        if(res.success == false){
        window.location.replace(signin)
          return
        }
      })
  



  document.getElementById("error").style.display = "block";
  setTimeout( function(){document.getElementById("error").style.display = "none";}, 4000);
        document.getElementById("p").innerHTML = "Successfully LoggedIn";
        window.open("dashboard","_self");
})
.catch(function(error){
  document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  document.getElementById("loader").style.display = "none";
  var error_code = error.code;
  var error_message = error.message;
  document.getElementById("emailq").style.borderColor = "red";
  document.getElementById("l5").style.color = "red"
  document.getElementById("error").style.display = "block";
  setTimeout( function(){document.getElementById("error").style.display = "none";}, 4000);
        document.getElementById("p").innerHTML = error_message;
})
}
function forgot(){
  document.getElementById("loader2").style.display = "block";
  const email = document.getElementById("emailq").value
				auth.sendPasswordResetEmail(email)
  .then(() => {
  document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.getElementById("loader2").style.display = "none";
      document.getElementById("error").style.display = "block";
  setTimeout( function(){document.getElementById("error").style.display = "none";}, 3000);
        document.getElementById("p").innerHTML = "Password Reset Sent";
  })
  .catch((error) => {
  document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  document.getElementById("loader2").style.display = "none";
    const errorCode = error.code;
    const errorMessage = error.message;
document.getElementById("pass").style.borderColor = "red";
    document.getElementById("error").style.display = "block";
  setTimeout( function(){document.getElementById("error").style.display = "none";}, 3000);
        document.getElementById("p").innerHTML = errorMessage
  });
}
function scrollToTop(scrollDuration) {
  var scrollStep = -window.scrollY / (scrollDuration / 15),
    scrollInterval = setInterval(function(){
    if ( window.scrollY != 0 ) {
        window.scrollBy( 0, scrollStep );
    }
    else clearInterval(scrollInterval); 
 },15);
}
function passshow(){
  var x = document.getElementById("pass");
if (x.type === "password") {
  document.getElementById("eyee").innerHTML = "visibility";
  x.type = "text";
} else {
  document.getElementById("eyee").innerHTML = "visibility_off";
  x.type = "password";
}
}
firebase.auth().signOut().then(function() {
  localStorage.setItem("user", "null");
  localStorage.clear();
  sessionStorage.clear();
}, function(error) {
  alert("Server Error");
});
document.getElementById("emailq").addEventListener("click" , () => {
  document.getElementById("l5").classList.add("anc")
})

document.getElementById("emailq").addEventListener("focusout" , function(){
  if(!document.getElementById("emailq").value){
  document.getElementById("l5").classList.remove("anc")
  }
});
document.getElementById("pass").addEventListener("click" , () => {
  document.getElementById("l6").classList.add("anc")
})

document.getElementById("pass").addEventListener("focusout" , function(){
  if(!document.getElementById("pass").value){
  document.getElementById("l6").classList.remove("anc")
  }
});
document.getElementById("emailq").addEventListener('keydown', (event) => {
  // Check if the key that was pressed is "Enter"
  if (event.key === 'Enter' || event.keyCode === 13) {
    // Use the focus() method on the second input field to give it focus;
    document.getElementById("pass").click()
    document.getElementById("pass").focus();
  }
});
document.getElementById("pass").addEventListener('keydown', (event) => {
  // Check if the key that was pressed is "Enter"
  if (event.key === 'Enter' || event.keyCode === 13) {
    // Use the focus() method on the second input field to give it focus;
    document.getElementById("button1").click()
    document.getElementById("button1").focus()
  }
});


document.getElementById("gogl").addEventListener("click" , () => {
  const goglpr = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(goglpr)
  .then(function(){
  var user = auth.currentUser;
  localStorage.setItem("user", user.uid);
  localStorage.setItem("user11", user.email);
  //Device Detection
  var device = "";
  var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
    };
    if( isMobile.Android() ) {
      device = "Android";
    }
    else if( isMobile.BlackBerry() ) {
      device = "BlackBerry";
    }
    else if( isMobile.iOS() ) {
      device = "IOS";
    }
    else if( isMobile.Opera() ) {
      device = "Opera";
    }
    else if( isMobile.Windows() ) {
      device = "Windows Phone";
    }
    else {
      device = "Desktop";
    };
    let userAgent = navigator.userAgent;
    let browserName;
    
    if(userAgent.match(/chrome|chromium|crios/i)){
        browserName = "chrome";
      }else if(userAgent.match(/firefox|fxios/i)){
        browserName = "firefox";
      }  else if(userAgent.match(/safari/i)){
        browserName = "safari";
      }else if(userAgent.match(/opr\//i)){
        browserName = "opera";
      } else if(userAgent.match(/edg/i)){
        browserName = "edge";
      }else{
        browserName="No browser detection";
      }

      fetch("http://localhost:5100/signinhandler", {
        method : "POST",
        headers: { 'Content-Type': 'application/json' ,
    },
        body : JSON.stringify({
          userr : user.uid + "//",
          password : "dncw82jedm928hndn2s",
          device : device,
          name : user.displayName,
          browserName : browserName,
          photo : user.photoURL,
          email : user.email,
          isgogl : true
        })
      }).then(response => response.json())
      .then(function(res){
        if(res.success == false){
        window.location.replace(signin)
          return
        }
      })
  



  document.getElementById("error").style.display = "block";
  setTimeout( function(){document.getElementById("error").style.display = "none";}, 4000);
        document.getElementById("p").innerHTML = "Successfully LoggedIn";
        window.open("dashboard","_self");
})
.catch(function(error){
  document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  document.getElementById("loader").style.display = "none";
  var error_code = error.code;
  var error_message = error.message;
  document.getElementById("emailq").style.borderColor = "red";
  document.getElementById("l5").style.color = "red"
  document.getElementById("error").style.display = "block";
  setTimeout( function(){document.getElementById("error").style.display = "none";}, 4000);
        document.getElementById("p").innerHTML = error_message;
})
})


firebase.auth().signOut()

