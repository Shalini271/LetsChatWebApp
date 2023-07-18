const firebaseConfig = {
    apiKey: "AIzaSyAKrz2o-s6f39n2E6f4GvcE2VHTvCRY734",
    authDomain: "lcwa-a5027.firebaseapp.com",
    databaseURL: "https://lcwa-a5027-default-rtdb.firebaseio.com",
    projectId: "lcwa-a5027",
    storageBucket: "lcwa-a5027.appspot.com",
    messagingSenderId: "713079231169",
    appId: "1:713079231169:web:a6de0523195fb3bec1ba40"
  };
  firebase.initializeApp(firebaseConfig);

  var roomname = localStorage.getItem("room_name");
var username = localStorage.getItem("username");

document.getElementById("room").innerHTML=roomname;

function getData() {
      firebase.database().ref("/" + roomname).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val();
                  if (childKey != "purpose") 
                  {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(message_data);
                        console.log(firebase_message_id);
                        name1=message_data["name"];
                        msg1=message_data["message"];
                        likes1=message_data["likes"]; 
                        name_html="<h4>" + name1 + "<img src='tick.png' class='user_tick'> </h4>";
                        message_html= "<h4 class='message_h4'>" + msg1 + "</h4>";
                        likes_html= "<button id='"+firebase_message_id+"' value='"+likes1+"' class='btn btn-primary' onclick='update(this.id)'>";
                        span_html= "<span class='glyphicon glyphicon-thumbs-up'> Likes:" + likes1 + "</button>";
                        document.getElementById("output").innerHTML+=name_html+message_html+likes_html+span_html;
                        //End code
                  }
            });
      });
}
getData();

function logout() {
      window.location = "index.html";
      // localStorage.clear();+
      localStorage.removeItem("room_name");
      localStorage.removeItem("username");
      //This clears the entire local storage
}

console.log(roomname);
console.log(username);
function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomname).push({ message: msg, name: username, likes: 0 });
      document.getElementById("msg").value="";
}

function update(msg_id){
likes=document.getElementById(msg_id).value;
updated_likes=Number(likes)+1;
firebase.database().ref(roomname).child(msg_id).update({likes:updated_likes});
}
      
