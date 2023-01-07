user_name = localStorage.getItem("username");
document.getElementById("user_name").innerHTML="Welcome " + user_name;


const firebaseConfig = {
    apiKey: "AIzaSyAKrz2o-s6f39n2E6f4GvcE2VHTvCRY734",
    authDomain: "lcwa-a5027.firebaseapp.com",
    projectId: "lcwa-a5027",
    storageBucket: "lcwa-a5027.appspot.com",
    messagingSenderId: "713079231169",
    appId: "1:713079231169:web:a6de0523195fb3bec1ba40"
  };
firebase.initializeApp(firebaseConfig);

function addRoom(){
roomname = document.getElementById("room_name").value;
firebase.database().ref("/").child(roomname).update({ purpose: "adding room" });
localStorage.setItem("room_name",roomname);
window.location="kwitter_page.html";
}

function getData(){
firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";
snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key;
Room_names = childKey;
//Start code
row = "<div onclick='RedirectToRoom(roomid)' class='room_name' id='"+ Room_names + "'>"+ Room_names + "</div><hr>";
document.getElementById("output").innerHTML+=row;
//End code
});});}
getData();

function RedirectToRoom(roomid){
  localStorage.setItem("room_name",roomid);
  window.location="kwitter_page.html";
}
