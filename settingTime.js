
var myList = [
    {"name": "john", "time": "1:00"},
    {"name": "pete", "time": "1:00"},
    {"name": "will", "time": "1:00"},
    {"name": "josh", "time": "1:00"}
];

var myDataRef = new Firebase('https://pill-reminder.firebaseio.com/');
var drugNum = 0;
var pageName;
myDataRef.remove();

$(function() {
    $("#save").click( function()
    {
			var pushObj = [];
			var name = $("#nameHeader").text()
			var childDataRef = myDataRef.child(name)
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
            childDataRef.set({ name:name, drugs: pushObj});
        }
    );
});

function getName(hi) {
    location.href = 'file:///A:/Cameron/Documents/GitHub/HackMizzou2014Web/index.html?'+$(hi).text().toUpperCase();

    console.log($(hi).text());
    pageName = $(hi).text();
    console.log('heeeeer');
    console.log('here');
    $( document ).ready( readyFn );
}

function readyFn () {
    $("#userName").prepend('<div>Name</div>');
}

$(document).ready(function() {

	$("#nameHeader").html("<b>"+window.location.href.split('?')[1]+"</b>");

	var name = $("#nameHeader").text();
	
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
		$(drugnamewrapper).append('<div class =' + myClass + '><input type="text" class="' +myClass+' inputMargin form-control inline" placeholder = "Drug Name"/><input type="text" class="'+ timeClass +' inputMargin form-control inline" placeholder="Time"><a href="#" class="remove_field">Remove</a></div>'); //add input box    
	});
	 
    $(".add_time_button").click(function(e){ //on add input button click
        e.preventDefault();
		myClass = "time"+drugNum;
	    $("div.drugname"+drugNum).append('<div class="indent"><input type="text" class="'+ myClass +' inputMargin form-control inline" placeholder="Time"><a href="#" class="remove_field">Remove</a></div>'); //add input box
		
     });
	
    $(drugwrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    });    

    for(var i = 0; i<myList.length; i++){
        $(".list").append('<tr><td class="centerText" href="#" onclick="getName(this)"><h4>'+ myList[i].name +'</h4></td></tr>');
    }

    myDataRef.on('value', function (snapshot) {
    console.log(snapshot.val());
    var newArray = [];
    for(var key in snapshot.val()) {
        if(snapshot.val().hasOwnProperty(key)) {
            newArray.push(snapshot.val()[key]);
        }
    }
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });
});