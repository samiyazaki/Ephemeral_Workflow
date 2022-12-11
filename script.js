// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var now = dayjs().format("dddd: MMM D, YYYY; h:mm A");
  document.getElementById("currentDay").innerHTML = now;
  var init = false;
  let kiefer24 = dayjs().format("H");
  let chiwetel12 = dayjs().format("h");
  if (init) {
    kiefer24 = 13;
    chiwetel12 = 1;
  }
  var cal = new Date();
  var currentHour = cal.getHours();

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  confetti({
    angle: randomInRange(15, 300),
    spread: randomInRange(10, 700),
    particleCount: randomInRange(250, 500),
    origin: { y: 0.6 },
  });
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").on("click", function () {
    /* var hr9 = document.getElementById('9').value;
        localStorage.setItem('text9', hr9); */
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    localStorage.setItem(value, time);
    console.log(value, time);
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    confetti({
      angle: randomInRange(300, 300),
      spread: randomInRange(700, 700),
      particleCount: randomInRange(250, 500),
      origin: { y: 0.1 },
    });
    var clickAudio = new Audio("./assets/mixkit-fairy-arcade-sparkle-866.wav");
    clickAudio.play();
    return;
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
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
  let hour9 = localStorage.getItem("#hour-9.description");

  $('#hour-9.description').val(localStorage.getItem(hour9));
  //$('#hour-10.description').val(localStorage.getItem('hour-10'));
  // $('#hour-11.description').val(localStorage.getItem('hour-11'));
  console.log(hour9);
  /*var saved9 = localStorage.getItem('text9');
    document.getElementById('9').value = saved9;*/
  // TODO: Add code to display the current date in the header of the page.
});
