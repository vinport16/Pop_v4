function Town (residents){
	this.pop = [];
	this.townName = "Town";
	this.year = 0;
	for(var i = 0; i < residents; i++){
		this.pop.push(new Person(0, []));
	}
	this.popData = {alll : [0,this.pop.length],
					special : [0,0]};
	
	this.pop.sort();
	
	this.five_years_pass = function(){
		
		this.year += 5;
		
		var out="";
		
		for(var i = 0; i < this.pop.length; i++){
			if(this.pop[i].age >= this.pop[i].MIN_AGE && Math.random() > 0.6 || this.pop[i].age >= this.pop[i].MAX_AGE){
				this.pop[i].alive = false;
				if(this.pop[i].special){
					out = "<font color='red'>"+this.pop[i].fullName()+" died of old age at "+this.pop[i].age+"</font><br>"+out;
				}
				else{
					out = this.pop[i].fullName()+" died of old age at "+this.pop[i].age+"<br>"+out;
				}
			}
			else if(Math.random() < 0.01){
				this.pop[i].alive=false;
				if(this.pop[i].special){
					out = "<font color='red'>"+this.pop[i].fullName()+" died in an accident at "+this.pop[i].age+"</font><br>"+out;
				}
				else{
					out = this.pop[i].fullName()+" died in an accident at "+this.pop[i].age+"<br>"+out;
				}
			}
		}
		this.clear_dead();
		for(var i = 0; i < this.pop.length; i++){
			this.pop[i].get_older();
		}
		
		var muthrs = [];
		var fathrs = [];
		for(var i = 0; i < this.pop.length; i++){
			if(this.pop[i].age > 17 && this.pop[i].age < 50){
				if(this.pop[i].gender == 0){
					muthrs.push(this.pop[i]);
				}
				else{
					fathrs.push(this.pop[i]);
				}
			}
		}
		var mom = new Person(0, []);
		var dad = new Person(0, []);
		while(muthrs.length > 0 && fathrs.length > 0){
			mom = muthrs.splice(parseInt(Math.random()*muthrs.length), 1)[0];
			dad = fathrs.splice(parseInt(Math.random()*fathrs.length), 1)[0];
			if(Math.abs(mom.age - dad.age) <= 7 && Math.random() > 0.4 && mom.mom == "" || (mom.mom != dad.mom && mom.dad != dad.dad)){
				newBaby = new Person(1, [parseInt(Math.random()*5), mom.fullName(), dad.fullName(), dad.lName]);
				if(mom.special || dad.special){
					out += "<font color='red'>"+mom.fullName() + " and " + dad.fullName() + " had a child named " + newBaby.fullName()+"</font><br>";
					if(spChild.checked){
						newBaby.special=true;
					}
				}
				else{
					out += mom.fullName() + " and " + dad.fullName() + " had a child named " + newBaby.fullName()+"<br>";
				}
				this.pop.push(newBaby);
			}
		}
		
		if(this.pop.length > Math.random()*110+60 ){
			out = out+this.plague();
		}
		
		if(Math.random() > 0.8){
			out = out+this.flu();
		}
		
		if(Math.random() < 0.01 && this.pop.length < 30){
			out = out+this.immigrants();
		}
		
		if(Math.random() < 0.002){
			out = out+this.eruption();
		}
		
		if(Math.random() > 0.8){
			var newGuy = new Person(0, []);
			out = out + "<font color='blue'>"+newGuy.fullName()+" has moved into your town.</font><br>";
			this.pop.push(newGuy);
		}
		
		if(Math.random() > 0.8 && this.pop.length > 0){
			var getOut = this.pop.splice(parseInt(Math.random()*this.pop.length), 1)[0];
			if(getOut.special){
				out = out+"<font color='red'>"+getOut.fullName()+" has left your town.</font><br>";
				
			}
			else{
				out = out+"<font color='blue'>"+getOut.fullName()+" has left your town.</font><br>";
			}
		}
		
		
		out+="<font color='purple'>Year "+this.year+"<br>The population of "+this.townName+" is "+this.pop.length+"</font><br>";
		
		this.pop.sort();
		output.innerHTML = output.innerHTML + "-----------------------------------------------<br>" + out;
		output.scrollTop += Math.pow(2,30);
		this.popData.alll.push(this.pop.length);
		
		var tot = 0;
		for(var i = 0; i < this.pop.length; i++){
			if(this.pop[i].special){
				tot+=1;
			}
		}
		this.popData.special.push(tot);
		
		this.freshGraph();
		this.disp();
	}
	
	this.immigrants = function(){
		var demises = ["wiped out by the plague","overrun with dinosaurs","destroyed by a volcanic eruption","infiltrated by communists","torn apart by wild bears","burned down","demolished by our common enemy"];
		var num = parseInt(Math.random()*7+6);
		for(var i = 0; i < num; i++){
			this.pop.push(new Person(0, []));
		}
		return "<font color='blue'>A nearby town has been "+demises[parseInt(Math.random()*demises.length)]+".<br>The "+num+" survivors are now residing in "+this.townName+".</font><br>";
	}
	
	this.flu = function(){
		var ret = "";
		for(var i = 0; i < this.pop.length; i++){
			if(Math.random() > 0.85){
				if(this.pop[i].special){
					ret = "<font color='red'>"+this.pop[i].fullName()+" died of the flu</font><br>"+ret;
				}
				else{
					ret = this.pop[i].fullName()+" died of the flu<br>"+ret;
				}
				this.pop[i].alive = false;
			}
		}
		this.clear_dead();
		return ret;
	}
	
	this.plague = function(){
		var ret = "";
		for(var i = 0; i < this.pop.length; i++){
			if(Math.random() > 0.35){
				if(this.pop[i].special){
					ret = "<font color='red'>"+this.pop[i].fullName()+" died of the plague</font><br>"+ret;
				}
				else{
					ret = this.pop[i].fullName()+" died of the plague<br>"+ret;
				}
				this.pop[i].alive = false;
			}
		}
		this.clear_dead();
		return "<font color='blue'>The plague has come to your town!</font><br>" + ret;
	}
	
	this.eruption = function(){
		var ret = "";
		for(var i = 0; i < this.pop.length; i++){
			if(Math.random() > 0.5){
				if(this.pop[i].special){
					ret = "<font color='red'>"+this.pop[i].fullName()+" died in a volcanic eruption</font><br>"+ret;
				}
				else{
					ret = this.pop[i].fullName()+" died in a volcanic eruption<br>"+ret;
				}
				this.pop[i].alive = false;
			}
		}
		this.clear_dead();
		return ret;
	}
	
	this.clear_dead = function(){
		for(var i = this.pop.length-1; i >= 0; i--){
			if(!this.pop[i].alive){
				this.pop.splice(i, 1);
			}
		}
	}
	
	this.freshGraph = function(){
		for(var i = 0; i < data.labels.length-1; i++){
			data.labels[i] = data.labels[i+1];
			data.datasets[0].data[i] = data.datasets[0].data[i+1];
		}
		data.labels[data.labels.length-1] = "Year "+this.year;
		data.datasets[0].data[data.datasets[0].data.length-1] = this.pop.length;
		
		theChart = new Chart(ctx).Line(data);
		
	}
	
	this.disp = function(){
		var disp = "";
		
		for(var i = 0; i < this.pop.length; i++){
			if(this.pop[i].special){
				disp+="<tr><td><font color='red'>"+this.pop[i].lName+"</font></td><td><font color='red'>"+this.pop[i].fName+"</font></td><td><font color='red'>"+this.pop[i].job+"</font></td><td><font color = 'red'>"+this.pop[i].age+"</font></td></tr>";
			}
			else{
				disp+="<tr><td>"+this.pop[i].lName+"</td><td>"+this.pop[i].fName+"</td><td>"+this.pop[i].job+"</td><td>"+this.pop[i].age+"</td></tr>";
			}
		}
		
		pop_display.innerHTML = disp;
	}
	
}