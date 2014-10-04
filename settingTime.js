
var myDataRef = new Firebase('https://tt1gfbgrp6u.firebaseio-demo.com/');
var drugNum = 0;
//myDataRef.remove();

myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.time);
});

function displayChatMessage(name, time) {
    $('<div/>').text(time).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    //$('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

ng.ready( function() {
	$('.my_timepicker_input').each(function () {
    var my_timepicker = new ng.TimePicker({
        input:'my_timepicker_input'
    });
    console.log(ng.get('my_timepicker_input'));
    console.log(my_timepicker);
	});
    
});

$(function() {
    $("#save").click( function()
    {
			var pushObj = [];
			for(var i =1; i<=drugNum; i++) {
				var timeArr = [];
				var tempDrug = $("input.drugname"+i).val();
				$(".time"+i).each(function() {
					console.log($(this));
					console.log($(this).val());
					timeArr.push($(this).val());
				});
				pushObj.push({"drugname": tempDrug, "time": timeArr});
			}
			console.log(pushObj);
        }
    );
});

$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var drugwrapper     = $(".input_drugs_wrap"); //Fields wrapper
	
	    var drugnamewrapper     = $(".input_drugs_wrap_drugnames"); //Fields wrapper
    var drugtimewrapper     = $(".input_drugs_wrap_times"); //Fields wrapper

	
	var timewrapper     = $(".input_times_wrap"); //Fields wrapper
    var add_drug_button      = $(".add_drug_button"); //Add button ID
	var add_time_button      = $(".add_time_button"); //Add button ID
	var myClass;
    
    var x = 1; //initial drug count 
	var y = new Array();
	
	for(i=0;i<10;i++){
		y.push(0);
	}
	
	function makeTimeId () {
		
	}
	
	$(".add_drug_button").click(function(e){ //on add input button click
		e.preventDefault();  
		drugNum++;
		var myClass = "drugname"+drugNum;
		var timeClass = "time"+drugNum;
		$(drugnamewrapper).append('<div class =' + myClass + '><input type="text" class=' +myClass+' placeholder = "Drug Name"/><input type="text" class='+ timeClass +' placeholder="Time"><a href="#" class="remove_field">Remove</a></div>'); //add input box    
	});
	 
    $(".add_time_button").click(function(e){ //on add input button click
        e.preventDefault();
		myClass = "time"+drugNum;
	    $("div.drugname"+drugNum).append('<div><input type="text" class='+ myClass +'><a href="#" class="remove_field">Remove</a></div>'); //add input box
		
     });
	
    $(drugwrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});