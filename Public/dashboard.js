var user = localStorage.getItem("user") + "//";
  if (user == "null//"){
  window.location.replace("main")
  }
  const firebaseConfig = {
    apiKey: "AIzaSyBfa2tPHyp9J8UjCp110ZyYtrcPXZvoeTQ",
    authDomain: "datanodesofficial.firebaseapp.com",
    databaseURL: "https://datanodesofficial-default-rtdb.firebaseio.com",
    projectId: "datanodesofficial",
    storageBucket: "datanodesofficial.appspot.com",
    messagingSenderId: "240462745481",
    appId: "1:240462745481:web:5c19b467a863d1aa101b58",
    measurementId: "G-EWBT52EW12"
  };
  firebase.initializeApp(firebaseConfig);
document.getElementById("all").style.display = "none";
document.getElementById("loader1").style.display = "none";

document.getElementById("popp").style.display = "none"
document.getElementById("oneabnd").addEventListener("click", () => {
    
    document.getElementById("sidebar").classList.add("anc")
   }) 
   document.getElementById("exita").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("anc")
   })
   document.addEventListener("click", function(event) {
    if (document.getElementById("sidebar").classList.contains("anc") && !document.getElementById("sidebar").contains(event.target) && event.target != document.getElementById("oneabnd")) {
      document.getElementById("sidebar").classList.remove("anc");
    }
  });
      // document.getElementById("input1").addEventListener("click" , () => {
      //   document.getElementById("lab2").classList.add("anc")
      // })
      // document.getElementById("input1").addEventListener("blur" , () => {
      //   if(document.getElementById("input1").value == ""){
      //   document.getElementById("lab2").classList.remove("anc")
      //   }
      // })
      
       document.getElementById("li1").addEventListener("click" , ()=>{
        

        window.location.href = "usermain"
      })
      // document.getElementById("li2").addEventListener("click" , ()=>{
        

      //   window.location.href = "index"
      // })
      
      // document.getElementById("li3").addEventListener("click" , ()=>{
        

      //   window.location.href = "orderhistory"
      // })
      
      // document.getElementById("li4").addEventListener("click" , ()=>{
        

      //   window.location.href = "Analytics"
      // })
      
      document.getElementById("li5").addEventListener("click" , ()=>{
        

        window.location.href = "ratecalculator"
      })
      
      document.getElementById("li6").addEventListener("click" , ()=>{
        

        window.location.href = "apigeneration"
      })
      document.getElementById("li7").addEventListener("click" , ()=>{
        

        window.location.href = "signin"
      })
      document.getElementById("a1").addEventListener("click" , ()=>{
        

      })

//////////NOW MAIN FUNCTION START

document.getElementById("box3").style.display = "none"
function crossshow(chats){
if(chats === 0){
toshowhide("box1" , "box2", "flex")
}
else if(chats >= 1){
  toshowhide("box2" , "box1", "flex")
}
}
firebase.database().ref("user/" + user).once("value").then((snapshot) => {
  if(snapshot.exists()){
    if(snapshot.val().ready){
      document.getElementById("box3").style.display = "block"
      document.getElementById("box2").style.display = "none"
      document.getElementById("box1").style.display = "none"
    }
  }
}) 

function toshowhide(a,b,c){
  document.getElementById(a).style.display = c;
  document.getElementById(b).style.display = "none";
}

fetch("http://localhost:5100/showthelimit" , ({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user : user,
        })
        
    })).then(response => response.json())
    .then(res => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("all").style.display = "block";
      document.getElementById("all").hidden = false;

        if(res.success == true){
          crossshow(res.message)
        }
        else if(res.success === false){
            if(res.message.includes("Credits")){
               crossshow(0)
            }
        }
    })
document.getElementById("btn2").onclick = () =>{
  document.getElementById("child1").classList.add("animate-left")

  clearInterval(aa)
  document.getElementById("child1").classList.add("blur");
  document.getElementById("popp").style.display = "block"
}
document.getElementById("sd").onclick = () =>{
  clearInterval(aa)
  document.getElementById("child1").classList.remove("animate-left")

  document.getElementById("child1").classList.remove("blur");
  document.getElementById("popp").style.display = "none"
}
var qrcode = new QRCode(document.getElementById("qrcode"), {
  text: "Qr will be shown here donot scan 🦴",
  width:  190,
  height: 190
});
function updateQRCode(value) {
  var newText = value;
  qrcode.clear();
  qrcode.makeCode(newText);
}
var aa = ""
document.getElementById("qrcode").classList.add("blur")
document.getElementById("btn3").addEventListener("click", function() {
  this.disabled = true;
  this.style.opacity = "0.5";
  document.getElementById("loader1").style.display = "block";

  interv();
  //aa = setInterval(interv , 20000)
})

function interv(){
  fetch("http://localhost:5100/qrcode" , ({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user : user,
        })
        
    })).then(response => response.json())
    .then(res => {
      document.getElementById("loader1").style.display = "none";
      //document.getElementById("btn3").disabled = false;
      //document.getElementById("btn3").style.opacity = 1
      if(res.success === true){ 
        firebase.database().ref("user/" + user).on("value" , (snapshot) => {
          if(snapshot.exists()){
            updateQRCode(snapshot.val().qr)
          }
        })
    
      document.getElementById("qrcode").classList.remove("blur")
      }
    })
    firebase.database().ref("user/" + user).on("value" , (snapshot) => {
        if(snapshot.val().ready){
          location.reload();
          ui("session").value = snapshot.val().session;
          ui("date").innerHTML = snapshot.val().date
        }
      
    })
}
document.getElementById("popp2").style.display = "none"
document.getElementById("btn4").addEventListener("click" , () => {
  document.getElementById("popp2").style.display = "block"
  document.getElementById("popp2").classList.add("vi")
  document.getElementById("box3").classList.add("blur")
  document.getElementById("newsec").classList.add("blur")

})
document.getElementById("sd1").addEventListener("click" , () => {
  document.getElementById("popp2").style.display = "none"

  document.getElementById("box3").classList.remove("blur")
  document.getElementById("newsec").classList.remove("blur")

})

document.getElementById("inp1a").onclick = () => {
  ui("inp1a").style.borderColor = "dodgerblue"
  ui("p3a").classList.add("anc");
  
}
ui("inp1a").addEventListener("blur" , function(){
  if(ui("inp1a").value == ""){
  this.style.borderColor = "gray";
  ui("p3a").classList.remove("anc")
  }
})
document.getElementById("inp2a").onclick = () => {
  ui("inp2a").style.borderColor = "dodgerblue"
  ui("p4a").classList.add("amc");
  
}
ui("inp2a").addEventListener("blur" , function(){
  if(ui("inp2a").value == ""){
  this.style.borderColor = "gray";
  ui("p4a").classList.remove("amc")
  }
})
ui("inp1a").click()
function ui(a){
  return document.getElementById(a)
}

ui("btn5").onclick = () => {
  if(ui("inp1a").value !== "" && ui("inp2a").value !== ""){
   
  fetch("http://localhost:5100/api/addtheKEY" , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        user : user,
        keyword : ui("inp1a").value,
        reply : ui("inp2a").value
    })
  })
  .then(response => response.json())
  .then((res) => {
    ui("inp1a").value = ""
    ui("inp1a").blur()
    ui("inp2a").blur()
    ui("inp2a").value = ""
    if(res.success === true){
      alert("Success")
    }
  })
}
else{
  alert("Fill all")
}
}
ui("dd3").style.display = "none"
firebase.database().ref("user/" + user).on("value" , (snapshot) => {
  
  ui("pq").innerHTML = snapshot.val().status
  ui("btn1").innerHTML = snapshot.val().status
})
ui("btn1").addEventListener("click" ,() => {
  ui("dd3").style.display = "flex";
  ui("dd3").style.flexDirection = "column"
  ui("dd3").style.justifyContent = "center"
  ui("dd3").style.alignItems = "center"
  ui("btn1").style.display = "none";
  fetch("http://localhost:5100/api/start" , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        user : user,
        forr : ui("btn1").innerHTML
    })
  })
  .then(response => response.json())
  .then((res) => {
    ui("dd3").style.display = "none";
  ui("btn1").style.display = "block";
    if(res.success === true){
      
    }
  }).catch((err) => {

  })
})
firebase.database().ref("user/" + user).on("value" , (snapshot) => {
  if(snapshot.val().ready){
    ui("session").innerHTML = snapshot.val().session;
    ui("date").innerHTML = snapshot.val().date
  }

})