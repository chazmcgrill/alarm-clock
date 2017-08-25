var typeFlag = true,
		alarmSetFlag = false,
    alarmData = {
      hrs: 0,
      mins: 0,
      alarmSet: false
    };

// Functions
// display clock data
function display(hrs, mins) {
	if(!typeFlag && hrs > 12) {
		hrs = hrs - 12;
	}
	if(hrs < 10) { hrs = '0' + hrs; }
	if(mins < 10) { mins = '0' + mins; }
	$('.hrs').text(hrs);
	$('.mins').text(mins);
}

// get javascript time data
function setClock() {
	if(!alarmSetFlag){
		var hrs = new Date().getHours(),
				mins = new Date().getMinutes();
		display(hrs, mins);
	}
}

// record current time
function currentTime() {
  alarmData.hrs = Number($('.hrs').text());
  alarmData.mins = Number($('.mins').text());
}

// update values after clicking on controls
function alarmControl(val, sym) {
  sym === '+' ? alarmData[val]++ : alarmData[val]--;
  alarmLimiter(val);
}

// dont allow above or below 24hrs or 60 secs
function alarmLimiter(val, time) {
  if (val === 'mins' && alarmData.mins > 59) {
    alarmData.mins -= 60;
  } else if (val === 'mins' && alarmData.mins < 0) {
    alarmData.mins += 60;
  } else if (val === 'hrs' && alarmData.hrs > 23) {
    alarmData.hrs -= 24;
  } else if (val === 'hrs' && alarmData.hrs < 0) {
    alarmData.hrs += 24;
  }
  display(alarmData.hrs, alarmData.mins);
}


// Set interval timer that checks every second.
setInterval(setClock, 1000);


// Click events
$('.type').click(function(){
	typeFlag ? $('.type').text('AM/PM') : $('.type').text('24HRS');
	typeFlag = !typeFlag;
});

$('.alarm').click(function(){
  if(alarmSetFlag) {
    $('ul').css('display', 'none');
  } else {
    $('ul').css('display', 'block');
    currentTime();
  }
  alarmSetFlag = !alarmSetFlag;
});

$('.control-hrs li').each(function(){
  $(this).click(function(){
    sym = $(this).text();
    alarmControl('hrs', sym);
  });
});

$('.control-mins li').each(function(){
  $(this).click(function(){
    sym = $(this).text();
    alarmControl('mins', sym);
  });
});


