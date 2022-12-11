// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    var now = dayjs().format('dddd: MMM D, YYYY; h:mm A')
    document.getElementById("currentDay").innerHTML = now;
    var init = false;
    let kiefer24 = dayjs().format('H');
    let chiwetel12 = dayjs().format('h');
    if (init) {
        kiefer24 = 13;
        chiwetel12 = 1;
    }
    var cal = new Date();
    var currentHour = cal.getHours();

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
$('.saveBtn').click(function () {
        var hr9 = document.getElementById('9').value;
        localStorage.setItem('text9', hr9);
});
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    for (var i = 9; i < 18; i++) {
        if (i < currentHour) {
            document.getElementById(i.toString()).classList.add('past');
        } else if (i === currentHour) {
            document.getElementById(i.toString()).classList.add('present');
        } else if (i > currentHour){
            document.getElementById(i.toString()).classList.add('future');
        }
    }
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    var saved9 = localStorage.getItem('text9');
    document.getElementById('9').value = saved9;
    // TODO: Add code to display the current date in the header of the page.
  });