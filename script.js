$(function () {
  let currDay = document.getElementById("currentDay"); // Aligning the time clock with the currentDay id
  currDay.innerHTML = dayjs().format("ddd: MMM D, YYYY; h:mm A"); //Displays as Sunday: Dec 11, 2022; 4:27 PM or whatever time it is for you now. I don't judge

  let myFunction = () => {
    currDay.innerHTML = dayjs().format("ddd: MMM D, YYYY; h:mm A"); //Allows text to display in the "currentDay" element by id
  };
  window.setInterval(myFunction, 2000);

  var init = false;
  let kiefer24 = dayjs().format("H"); //Setting 24 hour clock
  let chiwetel12 = dayjs().format("h"); //Setting 12 hour clock
  if (init) {
    kiefer24 = 13;
    chiwetel12 = 1;
  }
  var cal = new Date();
  var currentHour = cal.getHours(); //Setting up the framework to determine if the current time is Past, present, or future

  $(".saveBtn").on("click", function () {
    //When you click the save button...
    var value = $(this).siblings(".description").val(); //Originally I had a save value for each individual time block... When a wonderful teacher showed me how to use sibling selectors to search through the DOM elements and construct a jQuery object from the matching elements
    var time = $(this).parent().attr("id"); //Stepping up one level for the parent in the DOM tree and finding the attribute "id"
    localStorage.setItem(time, value); // Setting the local storage values from the previous  variables of value and time
    //console.log(time, value); This was for testing. I'm leaving it because this is where I broke the most.

    // Do you like confetti?
    confetti({
      // This is how you call the confetti function. My life is empty but I can make confetti appear at the click of a button, so I've got that going for me.
      angle: 300,
      spread: 700,
      particleCount: 500,
      origin: { y: 0.1 },
    });
    //Oh yeah I added an audio play on button click. Is it necessary? No. Is it useful? No. Should I have included it? Probably not.
    var clickAudio = new Audio("./assets/mixkit-fairy-arcade-sparkle-866.wav");
    clickAudio.play();
    return;
  });

  for (var i = 9; i < 18; i++) {
    if (i < currentHour) {
      document.getElementById(i.toString()).classList.add("past");
    } else if (i === currentHour) {
      document.getElementById(i.toString()).classList.add("present");
    } else if (i > currentHour) {
      document.getElementById(i.toString()).classList.add("future");
    }
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $("#hour9 .description").val(localStorage.getItem("hour9"));
  $("#hour10 .description").val(localStorage.getItem("hour10"));
  $("#hour11 .description").val(localStorage.getItem("hour11"));
  $("#hour12 .description").val(localStorage.getItem("hour12"));
  $("#hour13 .description").val(localStorage.getItem("hour13"));
  $("#hour14 .description").val(localStorage.getItem("hour14"));
  $("#hour15 .description").val(localStorage.getItem("hour15"));
  $("#hour16 .description").val(localStorage.getItem("hour16"));
  $("#hour17 .description").val(localStorage.getItem("hour17"));
  //$('#hour-10.description').val(localStorage.getItem('hour-10'));
  // $('#hour-11.description').val(localStorage.getItem('hour-11'));
  /*var saved9 = localStorage.getItem('text9');
    document.getElementById('9').value = saved9;*/
  // TODO: Add code to display the current date in the header of the page.
});
