var user = localStorage.getItem("user") + "//";
  if (user == "null//"){
  window.location.replace("main")
  }

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
      document.getElementById("li2").addEventListener("click" , ()=>{
        

        window.location.href = "index"
      })
      
      document.getElementById("li3").addEventListener("click" , ()=>{
        

        window.location.href = "orderhistory"
      })
      
      document.getElementById("li4").addEventListener("click" , ()=>{
        

        window.location.href = "Analytics"
      })
      
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

/////////////Main function from here//////////////////
document.getElementById("slider").addEventListener("input" , () => {
    document.getElementById("result").innerHTML = document.getElementById("slider").value
})
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
        if(res.success == true){
            document.getElementById("s2").innerHTML = res.message
        }
        else if(res.success === false){
            if(res.message.includes("Credits")){
                alert("Add some Messages Credits")
            }
        }
    })
btn1.addEventListener("click" , ()=>{
    fetch("http://localhost:5100/addthelimit" , ({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           limit : document.getElementById("slider").value, 
            user : user,
        })
        
    })).then(response => response.json())
    .then(res => {
        if(res.success == true){
           location.reload()
        }
        else if(res.success === false){
            if(res.message.includes("Credits")){
                alert("Add some Messages Credits")
            }
        }
    })
})