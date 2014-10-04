
var myDataRef = new Firebase('https://tt1gfbgrp6u.firebaseio-demo.com/');
//myDataRef.remove();
$('#messageInput').keypress(function (e) {
if (e.keyCode == 13) {
    var name = $('#name').val();
    var text = $('#messageInput').val();
    myDataRef.push({name: name, text: text});
    $('#messageInput').val('');
}
});

myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
});

function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

ng.ready( function() {
    var my_timepicker = new ng.TimePicker({
        input:'my_timepicker_input'
    });
    console.log(ng.get('my_timepicker_input'));
    console.log(my_timepicker);
    
});

$(function() {
    $("#save").click( function()
        {
            console.log();
            console.log(ng.get('my_timepicker_input'));
            console.log(ng.get('my_timepicker_input').value);
            console.log(document.getElementById('my_timepicker_input').value);
        }
    );
});