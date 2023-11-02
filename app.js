const express = require('express');
const admin = require("firebase-admin");
var FormData = require('form-data');
const moment = require('moment');
const razorpayapi = "rzp_test_JsfqpaYIoqiwri";
const app = express();
const crypto = require('crypto');
var error = ""
var success = ""
const CryptoJS = require('crypto-js');
const axios = require('axios');
const bodyParser = require('body-parser');
const request = require('request');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const uuid = require('uuid');
function randomkey(){
const randomUUID = uuid.v4();
return randomUUID
}
const path = require('path')
const cors = require('cors');
app.use(cors())
const serviceAccount = require(path.join(__dirname,"config","wa-automate1-firebase-adminsdk-vipee-aed7da9797.json"));
const serviceAccount1 = require(path.join(__dirname,"config","datanodesofficial-firebase-adminsdk-7mm5z-0fdae615b6.json"));

const firstconfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wa-automate1-default-rtdb.firebaseio.com/"
};
const secondconfig = {
  credential: admin.credential.cert(serviceAccount1),
  databaseURL: "https://datanodesofficial-default-rtdb.firebaseio.com/"
}
const first = admin.initializeApp(firstconfig, 'thirdy');
const second = admin.initializeApp(secondconfig, "fourthy")
const database = first.database()
const database1 = second.database()
app.use(bodyParser.json());
var client = ""
app.post("/addthelimit" , (req,res) => {
  try{
  const user = req.body.user;
  var limit = req.body.limit
  
    database.ref("user/" + user).once("value").then((snapshot) => {
      if(snapshot.exists()){
      var t = parseInt(CryptoJS.AES.decrypt(snapshot.val().limit, "gvdcghvsdrszszhku6756e453rdc!@#$%#@!%#1").toString(CryptoJS.enc.Utf8));
      var neww = parseInt(limit) + t
      database.ref("user/" + user).update({
       
        limit : CryptoJS.AES.encrypt(neww.toString(), "gvdcghvsdrszszhku6756e453rdc!@#$%#@!%#1").toString(),
       }).then(() => {
        res.json({
          success : true,
          message : "This is Free only till i want 💀"
        })
      }).catch((err) => {
        res.status(400).json({
          success : false,
          message: "I think you messed with database"
        })
       })
      }
      else{
        database.ref("user/" + user).update({
          limit : CryptoJS.AES.encrypt(limit, "gvdcghvsdrszszhku6756e453rdc!@#$%#@!%#1").toString(),
        }).then(() => {
          res.json({
            success : true,
            message : "This is Free only till i want 💀"
          })
        }).catch((err) => {
          res.status(400).json({
            success : false,
            message: "I think you messed with database"
          })
        })
      }
    }).catch((err) => {
      res.status(400).json({
        success : false,
        message: "I think you messed with database"
      })
    })
}
catch(err){
  res.status(400).json({
    success : false,
    message : "Idk what went wrong"
  })
}

})

app.post("/showthelimit" , (req,res) => {
  var user = req.body.user
  database.ref("user/" + user).once("value").then(function(snapshot){
    if(snapshot.exists() == true){
      res.status(200).json({
        success : true,
        message : parseInt(CryptoJS.AES.decrypt(snapshot.val().limit, "gvdcghvsdrszszhku6756e453rdc!@#$%#@!%#1").toString(CryptoJS.enc.Utf8))

      })
    }
    else{
      database.ref("user/" + user).update({
        limit : CryptoJS.AES.encrypt("0", "gvdcghvsdrszszhku6756e453rdc!@#$%#@!%#1").toString(),
      })
      res.status(400).json({
        success : true,
        message: "Add some Messages Credits"
      })
    }
  }).catch((err) => {
    database.ref("user/" + user).update({
      limit : CryptoJS.AES.encrypt("0", "gvdcghvsdrszszhku6756e453rdc!@#$%#@!%#1").toString(),
    })
    res.status(400).json({
      success : true,
      message: 0
    })
  })
})

app.post('/qrcode', async (req, res) => {
  const user = req.body.user;
  database.ref("user/" + user + "session/").once("value").then((snapshot) => {
    if(snapshot.exists()){
       client = new Client({
        puppeteer : {
          headless : true
        },
        authStrategy : new LocalAuth({
          clientId : CryptoJS.AES.decrypt(snapshot.val().key, "gvdcghvsdrszszhku6756e453rdc!@#$%#@!%#1").toString(CryptoJS.enc.Utf8)
        })
      })
    }
   else if(snapshot.exists() === false){
    const ab = randomkey()
    database.ref("user/" + user + "session/").set({
      key : CryptoJS.AES.encrypt(ab, "gvdcghvsdrszszhku6756e453rdc!@#$%#@!%#1").toString(),
    })
    client = new Client({
      puppeteer : {
        headless : true
      },
      authStrategy : new LocalAuth({
        clientId : ab
      })
    })
   }
   // Event handler to capture the QR code
  client.on('qr', (qr) => {
    
    database1.ref("user/" + user).update({
      ready : false,
      qr : qr
    }).then(() => {
      try
      {
        res.status(200).json({
          success: true
        });
      }catch(err){}
    })
    console.log("done")
  });
    client.on('authenticated', (session) => {    
     console.log("authenticated")
  });
    client.on("ready", () => {
      console.log("Ready")
      database1.ref("user/" + user).set({
        session : randomkey(),
        date: moment().format('DD MMM YYYY'),
        ready : true,
        status : "Start"
      }).then(() => {
        console.log(true)
        client.destroy()
      })
      
    })
 
   
    

    client.initialize();
  })

  
  });///////////////////////////END HERE//////////////////////////////////



app.post("/api/addtheKEY", (req,res) => {
  try{
  var user = req.body.user;
  if(user == "" || user == null){
    try{
    res.status(400).json({
      success : false,
      message : "WhicH User are you?"
    })
  }catch(err){}
  return false
  }
  var keyword = req.body.keyword;
  var reply = req.body.reply;

  ///////VALIDATION WILL BE DONE LATER
  if(keyword == "" || reply == ""){
    try{
    res.status(400).json({
      success : false,
      message : "What to set?"
    })}catch(err){}
    return false
  }
  database.ref("user/" + user + "case/").update({
    [keyword] : reply
  }).then(() => {
    res.status(200).json({
      success : true,
      message : "Doneeeeeeee"
    })
  })
  .catch((err) => {
    try{
    res.status(400).json({
      success : false,
      message : "BAD"
    })}catch(err){}
  })
}
catch(error){
  try{
  res.status(400).json({
    success : false,
    message : "IDK what goes wrong"
  })}catch(err){}
}
})









app.post("/api/start", function(req,res){
const user = req.body.user
const forr = req.body.forr
if(user == "" || forr == ""){
  try{
    res.status(400).send("Where is User?")
  }
  catch(err){}
  return;
}

  try{
const key = []
const child = []
  database.ref("user/" + user + "case/").once("value").then((snapshot) => {
    const data = snapshot.val()
    if(snapshot.val()){
      for(var keyy in data){
        key.push(keyy)
        child.push(data[keyy])
      }
      database.ref("user/" + user + "session/").once("value").then((snapshot) => {
        if(snapshot.exists()){
          
          if(forr == "Start"){
            database1.ref("user/" + user).update({
              status: "Processing.."
            })
            try{
           client = new Client({
            puppeteer : {
              headless : true
            },
            authStrategy : new LocalAuth({
              clientId : CryptoJS.AES.decrypt(snapshot.val().key, "gvdcghvsdrszszhku6756e453rdc!@#$%#@!%#1").toString(CryptoJS.enc.Utf8)
            })
          })
          database1.ref("user/" + user).update({
            status: "Authenticating.."
          })
          client.on("ready" , () => {
            console.log("startedff")
            try{
              database1.ref("user/" + user).update({
                status: "Stop"
              }).then(() => {  try{res.status(200).json({
                success:true,
                message: "Started"
              })}catch(err){}})

            
            }catch(err){}
          })
          client.on('message', message => {
            for(var i = 0 ; i < key.length; i++){
              if(message.body.includes(key[i])){
                message.reply(child[i])
              }
            }
        })
        client.initialize()
      } catch(error){}
      }
      else if(forr == "Stop"){
        client.destroy()
        try{
        
        try{
          database1.ref("user/" + user).update({
            status: "Start"
          }).then(() => {  try{res.status(200).json({
            success:true,
            message: "Stopped"
          })}catch(err){}})

        
        }catch(err){}
      }catch(error){}
      }
        
        }
      })

    }
  })
} catch(err){}

})

app.post("/signinhandler" , (req,res) => {
  const user = req.body.userr
  const password = req.body.password
  const device  = req.body.device
  const browsername = req.body.browserName
  const isgogl = req.body.isgogl
   if(isgogl === false){
    database1.ref("user/" + user).update({
      ready : false,
      status : "Start"
    })
    database.ref("user/" + user).update({
      password : password,
      device : device,
      browsername : browsername,
      lastlogin : moment().format('DD MMM YYYY'),
    }).then(() => {
      res.status(200).json({
        success : true,
        message : "Ok"
      })
    })
   }
   if (isgogl === false){
    database1.ref("user/" + user).update({
      ready : false,
      status : "Start"
    })
    database.ref("user/" + user).update({
      password : password,
      device : device,
      browsername : browsername,
      lastlogin : moment().format('DD MMM YYYY'),
    }).then(() => {
      res.status(200).json({
        success : true,
        message : "Ok"
      })
    })
   }
})
app.listen(5100 , () => {
    console.log("Server Started At 5100 " )
  })