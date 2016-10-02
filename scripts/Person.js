function Person (opt, stuff) { /* stuff = [age, mom, dad, lName, gender, fName] */
	var LOBN = ["Skip","Reginald","Davis","Elias","Big-T","Warren","Giuseppe","Robby","Sam","Ray","Junior","Sterling","Truman","Filiberto","Frederic","Edmund","Jonathan","Larry","Rodger","Andreas","Kennith","Darron","Dominic","Theodore","Damian","Bryce","Pasquale","Omer","Andy","Ben","Harvey","Arnold","Cedrick","Carson","Elliott","Shma-Shma","Kirk","Kip","Leigh","Von","Allan","Rolando","Carter","Daren","Nathan","Dewayne","Alton","Bruno","Frank","Jerrell","Stanford","Rodolfo","Dimble","Pedro","Pepo","Enrique","Justin","Leon","Eddie","Toby","Jim","Tomwell","Nick","Bradly","Bennet","Gank"];
	var LOGN = ["Tandra","Jennie","Sherise","Tomi","Corliss","Cinthia","Athena","Marylynn","Suanne","Judy","Alona","Verdell","Sheron","Caron","Lorilee","Huong","Alba","Branda","Gerri","Ranee","Chasity","Xochitl","Joy","Niki","Marcie","Camille","Nicolette","Belle","Marlana","Marisa","Milda","Astrid","Angelyn","Jenny","Tosha","Fernande","Iola","Tammera","Alessandra","Charita","Wen","Alexia","Taneka","Mayra","Nana","Winifred","Julianna","Daniela","Cristie","Leota","Hanna","Lindsy","Makenna","Jessica","Helga","Helen","Hermione","Luna","Lyra","Katniss","Kiki","Tealeaf","Yoshimi"];
	var SURNAMES = ["Eckleburg","Irving","Updike","Xavier","Zamorano","Byrne","Newton","Smith","Green","Johnson","Whitman","Potter","Fienstien","Frankinstien","Gregson","Portly","Jacobs","Stark","Jackson","Cyrus","Wiseman","GoodCheese","BadCheese","Tremain","Coglieatta","O\'dell","McDonald","MacDonald","Williams","Hawkings","O\'Brian","Lovett","Lambert","Jeffords","Hershey","Hitchcock","Goodall","Goodboots","Fitzgerald","Van Dike","DuBois","Clemmons","Cabbot","Card","Borne","Bolton","Banks","Babbit","Baggins","Adams","Astwood","Aspinwall","Alabaster","Grull","Prewn","Yippswitch","Oldhaven","McBride","Bridgeleap","Divesky","Lipsmacker","Laurence","Quiggly","Krusty","Lambchop","Cumbercuke","Griswald","Spoonfull","Soupfork","Badpants","Osmann","Quickstart","Bernardo","Krepsworth","Wolfgang","Personious","McGroober","McGuiver","Prince","Crimson","Rumplestiltskin","Kowakamo","Dancey","Danci","Sureflame","Dodgewood","Mercades","Winewind","Rincewind","Hally","Holly","Jobs","Gates","Rodgers","Malfoy","Columbus","Cherry","Pancake","Waffale","McMuffin","Biscut","Hufflepuff","Ravenclaw","Slitherin","Griffendoor","Pizzuti","Dunn","Drumm","Lawrence"];
	this.MAX_AGE = 105;
	this.MIN_AGE = 70;
	
	
	switch(opt){
	case 0:
		this.gender = parseInt(Math.random()*2);
		if(0 == this.gender){
			this.fName = LOGN[parseInt(Math.random()*LOGN.length)];
		}
		else{
			this.fName = LOBN[parseInt(Math.random()*LOBN.length)];
		}
		this.lName = SURNAMES[parseInt(Math.random()*SURNAMES.length)];
		this.mom = "";
		this.dad = "";
		this.age = parseInt(Math.random()*(this.MIN_AGE+5));
		break;
	case 1:
		this.gender = parseInt(Math.random()*2);
		if(0 == this.gender){
			this.fName = LOGN[parseInt(Math.random()*LOGN.length)];
		}
		else{
			this.fName = LOBN[parseInt(Math.random()*LOBN.length)];
		}
		this.age = parseInt(stuff[0]);
		this.mom = stuff[1];
		this.dad = stuff[2];
		this.lName = stuff[3];
		break;
	case 2:
		this.age = parseInt(stuff[0]);
		this.mom = stuff[1];
		this.dad = stuff[2];
		this.gender = stuff[4];
		this.fName = stuff[5];
		this.lName = stuff[3];
	}
	this.alive = true;
	this.job = "unemployed";
	this.special = false;
	
	this.fullName = function(){
		return this.fName + " " + this.lName;
	};
	this.get_older = function(){
		this.age+=5;
		if("unemployed" === this.job && this.age >= 16){
			var i = (Math.random()*116);
			if(i < 30)
				this.job = "Farmer";
			else if(i < 50)
				this.job = "Laborer";
			else if(i < 70)
				this.job = "Shopkeeper";
			else if(i < 75)
				this.job = "Blacksmith";
			else if(i < 80)
				this.job = "Doctor";
			else if(i < 85)
				this.job = "Priest";
			else if(i < 88)
				this.job = "Cobbler";
			else if(i < 90)
				this.job = "Carpenter";
			else if(i < 93)
				this.job = "Stone Mason";
			else if(i < 95)
				this.job = "Wizard";
			else if(i < 96)
				this.job = "Goldsmith";
			else if(i < 97)
				this.job = "Mystic";
			else if(i < 98)
				this.job = "Athlete";
			else if(i < 107)
				this.job = "Soldier";
			else if(i < 112)
				this.job = "Fisherman";
			else if(i < 116)
				this.job = "Messenger";
		}
	};
	this.toString = function(){ return this.lName+", "+this.fName+": "+this.age; }
	this.information = function(){ return this.fullName()+" the "+job+"\n";}
}