var modeFlag = true,
		alarmSetFlag = false,
    alarmData = {
      hrs: 0,
      mins: 0,
      alarmSet: false
    };

// Functions
// display clock data
function display(hrs, mins) {
	if(!modeFlag && hrs > 12) {
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
function alarmLimiter(val) {
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

function setAlarm(toSet, text) {
	var $a = $('.alarm-display')
	alarmData.alarmSet = toSet;
	$('.alarm').text(text);
	console.log(alarmData);
	toSet ? $a.text('alarm set for ' + alarmData.hrs + ':' + alarmData.mins)
	: $a.text('no alarm set');
}

// Set interval timer that checks every second.
setInterval(setClock, 1000);


// Click events
$('.mode').click(function(){
	modeFlag ? $('.mode-display').text('am/pm clock') : $('.mode-display').text('24hr clock');
	modeFlag = !modeFlag;
});

$('.alarm').click(function(){
	if (alarmData.alarmSet) {
		setAlarm(false, 'set alarm');
	} else {
		$('ul').toggleClass('handle');
		$('.nums').toggleClass('flash');
		alarmSetFlag ? setAlarm(true, 'cancel alarm') : currentTime();
		alarmSetFlag = !alarmSetFlag;
	}
});

$('.control-hrs li').each(function(){
  $(this).click(function(){
    alarmControl('hrs', $(this).text());
  });
});

$('.control-mins li').each(function(){
  $(this).click(function(){
    alarmControl('mins', $(this).text());
  });
});
