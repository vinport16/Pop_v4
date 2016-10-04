disable_buttons = function(){
	next.disabled = true;
	loop.disabled = true;
	add_p.disabled = true;
	add_1p.disabled = true;
	rem_p.disabled = true;
	rem_1p.disabled = true;
}

enable_buttons = function(){
	next.disabled = false;
	loop.disabled = false;
	add_p.disabled = false;
	add_1p.disabled = false;
	rem_p.disabled = false;
	rem_1p.disabled = false;
}

var thisTown = new Town(parseInt(Math.random()*7)+50);

//Get the context of the canvas element we want to select
var ctx = document.getElementById("myChart").getContext("2d");

var data = {
	labels : ["Year -30","Year -25","Year -20","Year -15","Year -10","Year -5","Year 0"],
	datasets : [
		{
			fillColor : "rgba(151,187,111,0.5)",
			strokeColor : "rgba(151,187,202,1)",
			pointColor : "rgba(151,187,202,1)",
			pointStrokeColor : "#fff",
			data : [0,0,0,0,0,0,thisTown.pop.length]
		}
	]
}

var theChart = new Chart(ctx).Line(data);

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$("#next").click(function() { thisTown.five_years_pass()});

$('#add_1p').click(function() {
	$('#add_person').modal("show");
});

$("#done_add_person").click(function() {
	if( undefined === $('input[name="gender"]:checked').val() || "" === $("#fn").val() || "" === $("#ln").val() || "" == $("#age").val()){
		add_person_warning.innerHTML = "Make sure to complete all fields."
	}
	else{
		var sammy = new Person(2, [$("#age").val(), "", "", $("#ln").val().capitalize(), $('input[name="gender"]:checked').val(), $("#fn").val().capitalize()]);
		if(special.checked){
			sammy.special = true;
		}
		thisTown.pop.push(sammy);
		thisTown.pop.sort();
		thisTown.disp();
		$("#add_person").modal("hide");
	}
});

$('#add_p').click(function() {
	$('#add_people').modal("show");
});

$("#done_add_people").click(function() {
	if( "" == $("#num_add").val()){
		add_people_warning.innerHTML = "How many people do you want to add?"
	}
	else{
		for(var i = 0; i < $("#num_add").val(); i++){
			thisTown.pop.push(new Person(0, []));
		}
		thisTown.pop.sort();
		thisTown.disp();
		$("#add_people").modal("hide");
	}
});

$('#rem_p').click(function() {
	$('#remove_people').modal("show");
});

$("#done_remove_people").click(function() {
	if( "" == $("#num_remove").val()){
		remove_people_warning.innerHTML = "How many people do you want to remove?"
	}
	else{
		for(var i = 0; i < $("#num_remove").val() && thisTown.pop.length > 0; i++){
			thisTown.pop.splice(parseInt(Math.random()*thisTown.pop.length), 1);
		}
		thisTown.disp();
		$("#remove_people").modal("hide");
	}
});

$(function() {
	var timeout = 250;
	var timer;
	var i = 0;
	$("#loop").click(function() {
		timer = $.timer(timeout, function() {
			progress.setAttribute("style", "width: "+(parseInt(((++i)/$("#loops").val())*100))+"%");
			thisTown.five_years_pass();
			thisTown.disp();
		});
	});
	$('#stop').click(function() {
		timer.stop();
	});
	
});


$('#b4chart').click(function() {
	var data = {
		labels : [],
		datasets : [
			{
				fillColor : "rgba(151,187,111,0.5)",
				strokeColor : "rgba(151,187,202,1)",
				pointColor : "rgba(151,187,202,1)",
				pointStrokeColor : "#fff",
				data : thisTown.popData.alll
			},
			{
				fillColor : "#ff7777",
				strokeColor : "#ff0000",
				pointColor : "#ff0000",
				pointStrokeColor : "#fff",
				data : thisTown.popData.special
			}
		]
	}
	
	for(var i = 0; i < data.datasets[0].data.length; i++){
		data.labels[i] = i*5+"";
	}
	var x=window.open();
	x.document.open();
	x.document.write("<canvas id='fullChart' width='1000' height='500'></canvas>");
	var ctx = x.document.getElementById("fullChart").getContext("2d");
	var theChart = new Chart(ctx).Line(data);
	x.document.close();
	
});
