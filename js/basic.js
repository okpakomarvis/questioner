// JavaScript Document
function openNav(){
  document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

var modal4 = document.getElementById('createMeetupModal');
var btn4 = document.getElementById("createMeetupBtn");
var span4 = document.getElementById("close-4");
var span3= document.getElementById("cancel");

btn4.onclick = function() {
  modal4.style.display = "block";
};
span4.onclick = function() {
  modal4.style.display = "none";
};
span3.onclick = function() {
  modal4.style.display = "none";
};
