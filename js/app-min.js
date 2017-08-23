var typeFlag = true,
		alarmSetFlag = false;

function display(hrs, mins) {
	if(!typeFlag && hrs > 12) {
		hrs = hrs - 12;
		// add am pm indicator
	}
	if(hrs < 10) { hrs = '0' + hrs; }
	if(mins < 10) { mins = '0' + mins; }
	$('.hrs').text(hrs);
	$('.mins').text(mins);
}

function setClock() {
	if(!alarmSetFlag){
		var hrs = new Date().getHours(),
				mins = new Date().getMinutes();
		display(hrs, mins);
	}
}

setInterval(setClock, 1000);

$('.type').click(function(){
	typeFlag ? $('.type').text('24HRS') : $('.type').text('AM/PM');
	typeFlag = !typeFlag;
});

$('.alarm').click(function(){
  alarmSetFlag ? $('ul').css('display', 'none') :
  $('ul').css('display', 'block');
  alarmSetFlag = !alarmSetFlag;
});


