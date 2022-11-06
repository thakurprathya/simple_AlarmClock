var alarmString = null;
const alarmAudio = document.getElementById("alarm-audio");  // Select HTML5 Audio element
const createAlarm = document.querySelector(".create-alarm");  // Select DOM element with create-alarm id
const activeAlarm = document.getElementById("active-alarm");  // Select DOM element of active alarm container
const clearAlarm = document.getElementById("clear-alarm");
const alarmTextContainer = document.getElementById("alarm-text");  // Select DOM element of active alarm text

const alarmText = (time) => `Alarm set at time ${time}`;
alarmAudio.src = "http://soundbible.com/grab.php?id=1252&type=mp3";  // Initialize alarm sound
alarmAudio.load();

const handleSubmit = (event) => { // Handle Create Alarm submit
  event.preventDefault(); // Prevent default action of reloading the page
  const { hour, sec, min, zone } = document.forms[0];
  alarmString = getTimeString({
    hours: hour.value,
    seconds: sec.value,
    minutes: min.value,
    zone: zone.value
  });
  document.forms[0].reset();  // Reset form after submit
  createAlarm.style.display = "none";  // Hide create alarm
  activeAlarm.style.display = "block";  // show active alarm with text
  alarmTextContainer.innerHTML = alarmText(alarmString);
};

const handleClear = () => {
  alarmString = "";
  activeAlarm.style.display = "none";
  createAlarm.style.display = "block";
};

clearAlarm.addEventListener("click", handleClear); // Trigger handleClear on button click
document.forms[0].addEventListener("submit", handleSubmit); // Attach submit event to the form

const checkAlarm = (timeString) => { // Function to check if alarm needs to be triggered
  if(alarmString === timeString){ alarmAudio.play(); }
};

const getTimeString = ({ hours, minutes, seconds, zone }) => { // Function to convert time to string value
  if(minutes/10 < 1){ minutes = "0" + minutes; }
  if(seconds/10 < 1){ seconds = "0" + seconds; }
  return `${hours}:${minutes}:${seconds} ${zone}`;
};

const renderTime = () => { // Function to display current time on screen
  var currentTime = document.getElementById("current-time");
  const currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var zone = hours >= 12 ? "PM" : "AM";
  if(hours > 12){ hours = hours % 12; }
  const timeString = getTimeString({ hours, minutes, seconds, zone });
  checkAlarm(timeString);
  currentTime.innerHTML = timeString;
};
setInterval(renderTime, 1000); // Update time every second