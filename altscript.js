var now = dayjs().format('dddd: MMM D, YYYY; h:mm A')
document.getElementById("currentDay").innerHTML = now;
class TimeblockObj {
  constructor(hour, todo) {
    this.hour = hour;
    this.todo = todo;
  }
}
$(function () {
    const presentTimeSlot = getPresentTimeSlot();
    const presentTime = dayjs();
    displayTimeSlots(presentTime);
    document.querySelector('.container-lg')
      .addEventListener('click', function(event) {
        containerClicked(event, presentTimeSlot);
      });
      setTimeSlotText(presentTimeSlot);
      });

    function getPresentTimeSlot() {
      const presentTimeSlot = localStorage.getItem('displayTime');
      return presentTimeSlot ? JSON.parse(presentTimeSlot) : [];
    }
    
    function displayTimeSlots(presentTime) {
      const presentHour = presentTime.hour();
      for(let i=9; i<=17; i ++) {
        const timeBlock = createTimeBlockRow(i);
        const hourCol = createCol(createHourDiv(i), 1);
        const textArea = createCol(createTextArea(i, presentHour), 10);
        const saveBtn = createCol(createSaveBtn(i), 1);
        appendTimeBlockColumns(timeBlock, hourCol, textArea, saveBtn);
        document.querySelector('.container-lg').appendChild(timeBlock);
      }
    }

    function createTimeBlockRow(hourId) {
      const timeBlock =document.createElement('div');
      timeBlock.classList.add('row');
      timeBlock.id = `timeblock-${hourId}'`;
      return timeBlock;
    }

    function createCol(element, colSize) {
      const col = document.createElement('div');
      col.classList.add(`col-${colSize}`, 'p-0');
      col.appendChild(element);
      return col;
    }

    function createHourDiv(hour) {
      const hourCol = document.createElement('div');
      hourCol.classList.add('hour');
      hourCol.textContent = formatHour(hour);
      return hourCol;
    }

    function formatHour(hour) {
      const hourString = String(hour);
      return dayjs(hourString, 'h').format('h A');
    }
    function createTextArea(hour, presentHour) {
      const textArea = document.createElement('textArea');
      textArea.classList.add(getTextAreaBackgroundClass(hour, presentHour));
      return textArea;
    }

    function getTextAreaBackgroundClass(hour, presentHour) {
      return hour < presentHour ? 'past'
      :hour === presentHour ? 'present'
      : 'future';
    }

    function createSaveBtn(hour) {
      const saveBtn = document.createElement('button');
      saveBtn.classList.add('saveBtn');
      saveBtn.innerHTML = '<i class="fas fa-save"></i>';
      saveBtn.setAttribute('data-hour', hour);
      return saveBtn;
    }

    function appendTimeBlockColumns(timeBlockRow, hourCol, textAreaCol, saveBtnCol) {
      const innerCols = [hourCol, textAreaCol, saveBtnCol];
      for (let col of innerCols) {
        timeBlockRow.appendChild(col);
      }
    }

    function containerClicked(event, timeBlockList) {
      if (isSaveButton(event)) {
        const timeBlockHour = getTimeBlockHour(event);
        const textAreaValue  = getTextAreaValue(timeBlockHour);
        placeTimeBlockInList(new TimeblockObj(timeBlockHour, textAreaValue), timeBlockList);
        saveTimeBlockList(timeBlockList);
      }
    }

    function isSaveButton(event) {
      return event.target.matches('button') || event.target.matches('.fa-save');
    }

    function getTimeBlockHour(event) {
      return event.target.matches('.fa-save') ? event.target.parentElement.dataset.hour : event.target.dataset.hour;
    }
    function getTextAreaValue(timeBlockHour) {
      return document.querySelector(`#timeblock-${timeBlockHour} textarea`);
    }
    function placeTimeBlockInList(newTimeBlockObj, timeBlockList){
      if (timeBlockList.length>0) {
        for (let savedTimeBlock of timeBlockList) {
          if(savedTimeBlock.hour === newTimeBlockObj.hour) {
            savedTimeBlock.todo = newTimeBlockObj.todo;
            return;
          }
        }
      }
      timeBlockList.push(newTimeBlockObj);
      return;
    }
    function saveTimeBlockList(timeBlockList) {
      localStorage.setItem('displayTime', JSON.stringify(timeBlockList));
    }
    function setTimeSlotText(timeBlockList) {
      if (timeBlockList.length === 0) {
        return;
      } else {
        for (let timeBlock of timeBlockList) {
          document.querySelector(`#timeblock-${timeBlock.hour} textarea`)= timeBlock.todo;
        }
      }
    }
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

