
//ship variables
var mothership = {shipName:"Mother Ship",currentsize:0,max:0,facilities:[1000,900,650,650,650,650,500,500,500]};
var shipList = new Array();

//holding variables
var energy = 0;
var energymax = 0;
var oxygen = 50000;
var materials = 50000;
var food = 50000;
var water = 50000;
var ice = 50000;
var metals = 50000;
var date = 0;
var workers = 4;
var population = 0;
var populationmax = 1;
var storageamt = 50; // amount of storage per storage build
var storageamttotal = 0;
var credits = 0;
var researchpoints = 0;

//calculate bonuses
var oxygenbonus = 0;
var waterbonus = 0;
var foodbonus = 0;
var metalsbonus = 0;
var icebonus = 0;
var researchbonus = 0;
var creditsbonus = 0;
var icecost = 0;
var foodcost = 0;
var watercost = 0;
var oxygencost = 0;

//buildings
var generators = 1; //increases maximum energy
var quarters = 1; //housing for crew
var autominers = 1; //increases resources/second
var lifesupport = 1; //increases oxygen supplies
var farms = 1; //increases food supplies
var refineries = 1; //turns ice into water
var researchlabs = 0; //research facility for new technology
var combat = 0;
var storage = 1; 

//maximum allowed of each building
var generatorsmax = 0; //increases maximum energy, index = 0
var quartersmax = 0; //housing for crew, index = 1
var autominersmax = 0; //increases resources/second, index = 2
var lifesupportmax = 0; //increases oxygen supplies, index = 3
var farmsmax = 0; //increases food supplies, index = 4
var refineriesmax = 0; //turns ice into water, index = 5
var researchlabsmax = 0; //research facility for new technology, index = 6
var combatmax = 0; //combat capabilities of your fleet, index = 7
var storagemax = 0; //storage capacity of your fleet, index = 8


//research levels
var baseResearchCost = 100;
var advancedmining = 0;
var advancedoxygen = 0;
var advancedwater = 0;
var advancedfarming = 0;
var advancedresearch = 0;
var advancedincome = 0;

function newDay(){
	//reset
	oxygenbonus = 0;
	waterbonus = 0;
 	foodbonus = 0;
	metalsbonus = 0;
	icebonus = 0;
	researchbonus = 0;
	creditsbonus = 0;
	icecost = 0;
	foodcost = 0;
	watercost = 0;
	oxygencost = 0;

	document.getElementById('quarters').innerHTML = quarters + "/" + quartersmax;  
    document.getElementById('generators').innerHTML = generators + "/" + generatorsmax;  
    document.getElementById('miners').innerHTML = autominers + "/" + autominersmax;  
    document.getElementById('oxygenGen').innerHTML = lifesupport + "/" + lifesupportmax;  
    document.getElementById('hydroponics').innerHTML = farms + "/" + farmsmax;  
    document.getElementById('refineries').innerHTML = refineries + "/" + refineriesmax;  
    document.getElementById('storage').innerHTML = storage + "/" + storagemax;  
    document.getElementById('labs').innerHTML = researchlabs + "/" + researchlabsmax; 
    //document.getElementById('combat').innerHTML = combat + "/" + combatmax; 
    
    
    //calculate costs every update
	buyCrewQuarters(0);
	buyResearchLab(0);
	buyGenerator(0);
	buyMiner(0);
	buyHydroponics(0);
	buyRefinery(0);
	buyStorage(0);
	buyLifeSupport(0);
	Recruit(0);

	updateEnergy();
	updateOxygen();
	updateFood();
	updateWater();
	updateMaterials();
	updateCrew();
	updateTaxes();
	updateResearch();
	updateBars();

	//display ships in list
	displayShips();

	//Jquery to update progress bar labels

	$('.progressbar-label').each(function(){
		//$(this).parent().css("min-width", "100%");
		if($(this).width() > $(this).parent().width()){
	    	 $(this).css("color","black");   
	    }
	    else	
	    {
	   		$(this).css("color","white");   
	    }
	});
}
//functions to display ships
function displayShips()
{
	mothership.currentsize = quarters + autominers + lifesupport + farms + refineries + storage + researchlabs;
	document.getElementById('shipList').innerHTML = "<li class='list-group-item'><span class='badge' id='shipSizeMothership'>" +  mothership.currentsize + "/" + mothership.max + "</span> <span id='shipNameMothership'>" + mothership.shipName +"</span> </li>";  
    for (i=0; i < shipList.length; i++)
    { 
    	document.getElementById('shipList').innerHTML += "<li class='list-group-item'><span class='badge' id='ship" + i +"'>" + + shipList[i].currentsize + "/" + shipList[i].max  + "</span> <span id='" + shipList[i].shipName +"'>" + shipList[i].shipName + "</span> </li>"
	
    }  
    
}

function addShip(size, facilitiesInput)
{	//facilities array is as follows: generators, quarters, miners, oxygen, food, refineries, research, combat, storage
	var newShip;

	if(size === "Small")
	{	
		console.log("Creating small ship");
		var name = $("#smallSName").val();
		if(name === "") 
		{
			name = "Small Ship " + shipList.length;
		}

		newShip = {shipName:name, currentsize:0,max:250, facilities:[50,0,0,0,0,0,0,0,0]}
		
		for(i = 0; i < facilitiesInput.length; i++)
		{
			console.log("Adding facility " + i);
			newShip.facilities[i] = facilitiesInput[i];
		}
		shipList.push(newShip);
	}	

	//reset and recalculate maximums
	generatorsmax = 0;
	quartersmax = 0;
	autominersmax = 0;
	lifesupportmax = 0;
	farmsmax = 0;
	refineriesmax = 0;
	researchlabsmax = 0;
	combatmax = 0;
	storagemax = 0;
	
	setMaximumFacilities(mothership);
	shipList.forEach(function(ship)
	{
    	setMaximumFacilities(ship);
	});
    
}

//functions to buy resources
function Recruit(numToBuy)
{
	var recruitCost = 1 * numToBuy;
    if(oxygen >= recruitCost && water >= recruitCost && food >= recruitCost && credits >= recruitCost && population + workers < populationmax && numToBuy > 0) {                               
		
		oxygen = oxygen - recruitCost;
		food = food - recruitCost;
		water = water - recruitCost;
		credits = credits - recruitCost;
		population = population + numToBuy;
		updateCrew();                                          
    };
    var nextCostx1 = 1 * 1;
    var nextCostx10 = 1 * 10;
    var nextCostx100 = 1 * 100;

    document.getElementById('recruitCostx1').setAttribute("title", "Oxygen: "  + nextCostx1 + " Food: " + nextCostx1 + " Water: " + nextCostx1 + " Credits: " + nextCostx1);
    document.getElementById('recruitCostx10').setAttribute("title", "Oxygen: "  + nextCostx10 + " Food: " + nextCostx10 + " Water: " + nextCostx10 + " Credits: " + nextCostx10);
    document.getElementById('recruitCostx100').setAttribute("title", "Oxygen: "  + nextCostx100 + " Food: " + nextCostx100 + " Water: " + nextCostx100 + " Credits: " + nextCostx100);
    updateCrew();                                          
    updateBars();
}

function buyCrewQuarters(numToBuy)
{
	var baseCost = 10;
	var qCost = calculateLinearCost(numToBuy, baseCost, quarters);
    if(metals >= qCost && quarters < quartersmax  && numToBuy > 0){                               
        quarters = quarters + numToBuy;                                   
    	metals = metals - qCost;                        
        document.getElementById('quarters').innerHTML = quarters + "/" + quartersmax;  
       	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCostx1 = calculateLinearCost(1, baseCost, quarters);
    var nextCostx10 = calculateLinearCost(10, baseCost, quarters);
    var nextCostx100 = calculateLinearCost(100, baseCost, quarters);
    
	document.getElementById('qsCostx1').innerHTML = nextCostx1;
    document.getElementById('qsCostx10').innerHTML = nextCostx10;
    document.getElementById('qsCostx100').innerHTML = nextCostx100;
    
    updateCrew();
    updateBars();
}

function buyGenerator(numToBuy){
    var genCost = 25 * numToBuy;
    if(metals >= genCost && generators < generatorsmax && numToBuy > 0){                               
        generators = generators + numToBuy;                                   
    	metals = metals - genCost;                        
        document.getElementById('generators').innerHTML = generators + "/" + generatorsmax;  
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    
    var nextCostx1 = 25 * 1;
	var nextCostx10 = 25 * 10;
	var nextCostx100 = 25 * 100;	

    document.getElementById('genCostx1').innerHTML = nextCostx1;
    document.getElementById('genCostx10').innerHTML = nextCostx10;
    document.getElementById('genCostx100').innerHTML = nextCostx100;
    updateBars();
};

function buyMiner(numToBuy){
	var baseCost = 15;
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew

    var minerCost = calculateLinearCost(numToBuy, baseCost, autominers);
    if(metals >= minerCost && energy < energymax && population >= numToBuy && autominers < autominersmax  && numToBuy > 0){
    	population = population - numToBuy; 
    	workers = workers + numToBuy;                               
        autominers = autominers + numToBuy;                                   
    	metals = metals - minerCost;                        
        document.getElementById('miners').innerHTML = autominers + "/" + autominersmax;  
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCostx1 = calculateLinearCost(1, baseCost, autominers);
    var nextCostx10 = calculateLinearCost(10, baseCost, autominers);
    var nextCostx100 = calculateLinearCost(100, baseCost, autominers);
    
	document.getElementById('minerCostx1').innerHTML = nextCostx1;
	document.getElementById('minerCostx10').innerHTML = nextCostx10;
	document.getElementById('minerCostx100').innerHTML = nextCostx100;

    updateBars();
};

function buyLifeSupport(numToBuy){
	var baseCost = 15;
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var lsCost = calculateLinearCost(numToBuy, baseCost, lifesupport);
    if(metals >= lsCost && energy < energymax && population >= numToBuy && lifesupport < lifesupportmax && numToBuy > 0){                               
        population = population - numToBuy; 
    	workers = workers + numToBuy;                               
        lifesupport = lifesupport + numToBuy;                                   
    	metals = metals - lsCost;                        
        document.getElementById('oxygenGen').innerHTML = lifesupport + "/" + lifesupportmax;  
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCostx1 = calculateLinearCost(1, baseCost, lifesupport);
    var nextCostx10 = calculateLinearCost(10, baseCost, lifesupport);
    var nextCostx100 = calculateLinearCost(100, baseCost, lifesupport);
    
	document.getElementById('oxyCostx1').innerHTML = nextCostx1;
	document.getElementById('oxyCostx10').innerHTML = nextCostx10;
	document.getElementById('oxyCostx100').innerHTML = nextCostx100;
    updateBars();
};

function buyHydroponics(numToBuy){
	var baseCost = 15;
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var farmCost = calculateLinearCost(numToBuy, baseCost, farms);
    if(metals >= farmCost && energy < energymax && population >= numToBuy && farms < farmsmax && numToBuy > 0){                               
        population = population - numToBuy; 
    	workers = workers + numToBuy;                               
        farms = farms + numToBuy;                                   
    	metals = metals - farmCost;                        
        document.getElementById('hydroponics').innerHTML = farms + "/" + farmsmax;  
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCostx1 = calculateLinearCost(1, baseCost, farms);
    var nextCostx10 = calculateLinearCost(10, baseCost, farms);
    var nextCostx100 = calculateLinearCost(100, baseCost, farms);
    
	document.getElementById('hydroponicsCostx1').innerHTML = nextCostx1;
	document.getElementById('hydroponicsCostx10').innerHTML = nextCostx10;
	document.getElementById('hydroponicsCostx100').innerHTML = nextCostx100;
    updateBars();
};

function buyRefinery(numToBuy){
	var baseCost = 15;
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var refCost = calculateLinearCost(numToBuy, baseCost, refineries);
    if(metals >= refCost && energy < energymax && population >= numToBuy && refineries < refineriesmax && numToBuy > 0){                               
        population = population - numToBuy; 
    	workers = workers + numToBuy;                               
        refineries = refineries + numToBuy;                                   
    	metals = metals - refCost;                        
        document.getElementById('refineries').innerHTML = refineries + "/" + refineriesmax;  
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCostx1 = calculateLinearCost(1, baseCost, refineries);
    var nextCostx10 = calculateLinearCost(10, baseCost, refineries);
    var nextCostx100 = calculateLinearCost(100, baseCost, refineries);
    
	document.getElementById('refCostx1').innerHTML = nextCostx1;
	document.getElementById('refCostx10').innerHTML = nextCostx10;
	document.getElementById('refCostx100').innerHTML = nextCostx100;
    updateBars();
};

function buyStorage(numToBuy){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var mStoreCost = 50 * numToBuy;
    if(metals >= mStoreCost && storage < storagemax && numToBuy > 0){                               
        storage = storage + numToBuy;                                   
    	metals = metals - mStoreCost;                        
        storageamttotal = storage * storageamt;
		document.getElementById('storage').innerHTML = storage + "/" + storagemax;  
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCostx1 = 50 * 1;
    var nextCostx10 = 50 * 10;
    var nextCostx100 = 50 * 100;
    
    document.getElementById('stoCostx1').innerHTML = nextCostx1;
	document.getElementById('stoCostx10').innerHTML = nextCostx10;
    document.getElementById('stoCostx100').innerHTML = nextCostx100;
    updateBars();
};

function buyResearchLab(numToBuy){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var labCost = 100 * numToBuy;
    if(metals >= labCost && energy < energymax && population >= numToBuy && researchlabs < researchlabsmax && numToBuy > 0){                               
        population = population - numToBuy; 
    	workers = workers + numToBuy;                               
        researchlabs = researchlabs + numToBuy;                                   
    	metals = metals - labCost;                        
        document.getElementById('labs').innerHTML = researchlabs + "/" + researchlabsmax; 
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCostx1 = 100 * 1;
    var nextCostx10 = 100 * 10;
    var nextCostx100 = 100 * 100;
    
	document.getElementById('labsCostx1').innerHTML = nextCostx1;
	document.getElementById('labsCostx10').innerHTML = nextCostx10;
	document.getElementById('labsCostx100').innerHTML = nextCostx100;
    updateBars();
};

function updateEnergy(){
	energy = autominers + lifesupport + farms + refineries + researchlabs;
	energymax = 5 * generators;
}
function updateMaterials(){
	var random;
	
	metalsbonus = 0;
	icebonus = 0;

	//calculate maximum storage
	storageamttotal = storage * storageamt;

	//for each automated miner generate ice and metal
	metals += Math.floor(autominers * (1 + (0.05 * advancedmining)));
	metalsbonus += Math.floor(autominers * (1 + (0.05 * advancedmining)));
	
	ice += Math.floor(autominers * (1 + (0.05 * advancedmining)));
	icebonus += Math.floor(autominers * (1 + (0.05 * advancedmining)));
	
	//check maximum and minimum
	if(metals > storageamttotal)
	{
		metals = storageamttotal;
	}
	if(metals < 0)
	{
		metals = 0;
	}
	if(ice > storageamttotal)
	{
		ice = storageamttotal;
	}
	if(ice < 0)
	{
		ice = 0;
	}
	//put metals in the html

	updateBars();
}

function updateOxygen(){
	oxygen = oxygen - (population + workers);
	oxygencost = oxygencost + population + workers;
	storageamttotal = storage * storageamt;
	
	if(oxygen < storageamttotal)
	{
		generateOxygen();
	}
	if(oxygen > storageamttotal)
	{
		oxygen = storageamttotal;
	}
	if (oxygen < 0)
	{
		oxygen = 0;
	}		
	
}

function updateFood(){
	
	food = food - (population + workers);
	foodcost = foodcost + population + workers;
	storageamttotal = storage * storageamt;
	if(food < storageamttotal)
	{
		generateFood();
	}
	if(food > storageamttotal)
	{
		food = storageamttotal;
	}
	if(food < 0)
	{
		food = 0;
	}		
}

function updateWater(){
	water = water - (population + workers);
	watercost = watercost + population + workers;
	storageamttotal = storage * storageamt;
	if(water < storageamttotal)
	{
		generateWater();
	}
	if(water > storageamttotal)
	{
		water = storageamttotal;
	}
	if (water < 0)
	{
		water = 0;
	}

}


//melt ice to create water
function generateWater()
{
	//if there isn't enough ice, take what there is
	if (ice < refineries)
	{
		water = water + Math.floor((ice * 7) * (1 + (0.05 * advancedwater)));
		waterbonus = waterbonus + Math.floor((ice * 7) * (1 + (0.05 * advancedwater)));
		icecost = icecost + ice;
		ice = 0;
	}
	//otherwise ice is equal or greater than the melters
	else
	{
		water = water + Math.floor((refineries * 7) * (1 + (0.05 * advancedwater)));
		waterbonus = waterbonus + Math.floor((refineries * 7) * (1 + (0.05 * advancedwater)));
		ice = ice - refineries;
		icecost = icecost + refineries;
	}
}

//generate oxygen using water
function generateOxygen()
{
	//if there isn't enough water, take what there is
	if (water < lifesupport)
	{
		oxygen = oxygen + Math.floor((water * 5) * (1 + (0.05 * advancedoxygen)));
		oxygenbonus = oxygenbonus + Math.floor((water * 5) * (1 + (0.05 * advancedoxygen)));
		watercost = watercost + water;
		water = 0;
	}
	//otherwise water is equal or greater than the lifesupport
	else
	{
		oxygen = oxygen + Math.floor((lifesupport * 5) * (1 + (0.05 * advancedoxygen)));
		oxygenbonus = oxygenbonus + Math.floor((lifesupport * 5) * (1 + (0.05 * advancedoxygen)));
		water = water - lifesupport;
		watercost = watercost + lifesupport;
	}
}

//generate food using water
function generateFood()
{
	//if there isn't enough water, take what there is
	if (water < farms)
	{
		food = food + Math.floor((water * 5) * (1 + (0.05 * advancedfarming)));
		foodbonus = foodbonus + Math.floor((water * 5) * (1 + (0.05 * advancedfarming)));
		watercost = watercost + water;
		water = 0;
	}
	//otherwise water is equal or greater than the hydroponics
	else
	{
		food = food + Math.floor((farms * 5) * (1 + (0.05 * advancedfarming)));
		foodbonus = foodbonus + Math.floor((farms * 5) * (1 + (0.05 * advancedfarming)));
		water = water - farms;
		watercost = watercost + farms;
	}
}

function updateCrew(){

	
	populationmax = 5 * quarters;
	
	//check for not enough water/food/etc and kill off population
	//if worker is killed reduce efficiency of random resource until supplies are restored

}

function updateTaxes()
{
	updateCrew();
	creditsbonus = 0;
	var taxablePop = workers + population;
	creditsbonus = creditsbonus + Math.floor(taxablePop * (1 + (0.05 * advancedincome)));
	//add tax to current credits
	credits = credits + Math.floor(taxablePop * (1 + (0.05 * advancedincome)));
	
}

function updateResearch(){
	//add 1 point per number of research labs
	researchpoints = researchpoints + Math.floor(researchlabs * (1 + (0.05 * advancedresearch)));
	researchbonus = researchbonus + Math.floor(researchlabs * (1 + (0.05 * advancedresearch)));
	
}
var popAlerted = false;
var energyAlerted = false;
//update all progress bars
function updateBars()
{
	//population bar
	var totalPop = workers + population;
	if(totalPop == populationmax)
	{
		if(!popAlerted)
		{
			addAlert("resourcealert","Maxiumum population reached! Build more crew quarters!!!");
			popAlerted = true;	
		}
		replaceAllClassesonElement("workerprogressbar","progress-bar progress-bar-danger");
		replaceAllClassesonElement("populationprogressbar","progress-bar progress-bar-warning");
	}
	if( totalPop != populationmax)
	{
		removeAlert("population");
		popAlerted = false;
		replaceAllClassesonElement("workerprogressbar","progress-bar progress-bar-info");
		replaceAllClassesonElement("populationprogressbar","progress-bar");
		replaceAllClassesonElement("populationleftprogressbar","progress-bar progress-bar-success");
	}
	document.getElementById("population").innerHTML = population;
	document.getElementById("workers").innerHTML = workers;
	document.getElementById("populationleft").innerHTML = populationmax - totalPop;
	document.getElementById('workerprogressbar').setAttribute("style", "width:" + Math.floor((workers/populationmax) * 100) + "%;");
	document.getElementById('populationprogressbar').setAttribute("style", "width:" + Math.ceil((population/populationmax) * 100) + "%;");
	document.getElementById('populationleftprogressbar').setAttribute("style", "width:" + Math.floor(((populationmax - totalPop)/populationmax) * 100) + "%;");
	
	//energy bar
	if(energy == energymax)
	{
		if(!energyAlerted)
		{
			addAlert("resourcealert","Maxiumum energy reached! Build more generators!!!");
			energyAlerted = true;	
		}
		replaceAllClassesonElement("energyprogressbar", "progress-bar progress-bar-danger")
	}
	if(energy != energymax)
	{
		removeAlert("energy");
		energyAlerted = false;
		replaceAllClassesonElement("energyprogressbar", "progress-bar progress-bar-info")
	}
	document.getElementById("energy").innerHTML = energy;
	document.getElementById('energyprogressbar').setAttribute("style", "width:" + Math.floor((energy/energymax) * 100) + "%;");
	document.getElementById("energyleft").innerHTML = energymax - energy;
	document.getElementById('energyleftprogressbar').setAttribute("style", "width:" + Math.floor(((energymax - energy)/energymax) * 100) + "%;");

	//metals/ice bar
	if (metalsbonus == 0 || metals == storageamttotal)
	{
		replaceAllClassesonElement("metalsprogressbar", "progress-bar progress-bar-info")	
		metalsTotal = metals + "/" + storageamttotal + " (+" + metalsbonus + ")";
	}
	else if(metalsbonus > 0)
	{
		replaceAllClassesonElement("metalsprogressbar", "progress-bar progress-bar-striped progress-bar-success active")
		metalsTotal = metals + "/" + storageamttotal + " (+" + metalsbonus + ")";
	}
	
	
	document.getElementById("metals").innerHTML = metalsTotal;
	document.getElementById('metalsprogressbar').setAttribute("style", "width:" + Math.ceil((metals/storageamttotal) * 100) + "%;");
    
	//put ice in the html
	var bonustotal = icebonus - icecost;

	var iceTotal;
	
	if (bonustotal == 0 || ice == storageamttotal)
	{
		replaceAllClassesonElement("iceprogressbar", "progress-bar progress-bar-info")	
		iceTotal = ice + "/" + storageamttotal + " (+" + bonustotal + ")";
	}
	else if(bonustotal > 0)
	{
		replaceAllClassesonElement("iceprogressbar","progress-bar progress-bar-striped progress-bar-success active")
		iceTotal = ice + "/" + storageamttotal + " (+" + bonustotal + ")";
	}
	else if(bonustotal < 0)
	{
		replaceAllClassesonElement("iceprogressbar", "progress-bar progress-bar-striped progress-bar-danger active")
		iceTotal = ice + "/" + storageamttotal + " (" + bonustotal + ")";
	}
	
	document.getElementById("ice").innerHTML = iceTotal;
	document.getElementById('iceprogressbar').setAttribute("style", "width:" + Math.ceil((ice/storageamttotal) * 100) + "%;");

	//oxygen bar
	var oxygenTotal;
	
	var bonustotal = oxygenbonus - oxygencost;
	
	if (oxygenbonus == oxygencost || oxygen == storageamttotal)
	{
		replaceAllClassesonElement("oxygenprogressbar", "progress-bar progress-bar-info");	
	    oxygenTotal = oxygen + "/" + storageamttotal + " (+" + bonustotal + ")";
	}
	else if(bonustotal > 0)
	{
		replaceAllClassesonElement("oxygenprogressbar","progress-bar progress-bar-striped progress-bar-success active");
	    oxygenTotal = oxygen + "/" + storageamttotal + " (+" + bonustotal + ")";
	}
	else if(bonustotal < 0)
	{
		replaceAllClassesonElement("oxygenprogressbar", "progress-bar progress-bar-striped progress-bar-danger active");
		var oxygenTotal = oxygen + "/" + storageamttotal + " (" + bonustotal + ")";
	}

	document.getElementById("oxygen").innerHTML = oxygenTotal;
	document.getElementById('oxygenprogressbar').setAttribute("style", "width:" + Math.ceil((oxygen/storageamttotal) * 100) + "%;");

	//food bar
	var foodTotal;
	var bonustotal = foodbonus - foodcost
	
	if (foodbonus == foodcost || food == storageamttotal)
	{
		replaceAllClassesonElement("foodprogressbar", "progress-bar progress-bar-info");	
		foodTotal = food + "/" + storageamttotal  + " (+" + bonustotal + ")";
	}
	else if(foodbonus > foodcost)
	{
		replaceAllClassesonElement("foodprogressbar","progress-bar progress-bar-striped progress-bar-success active");
		foodTotal = food + "/" + storageamttotal  + " (+" + bonustotal + ")";
	}
	else if(foodbonus < foodcost)
	{
		replaceAllClassesonElement("foodprogressbar", "progress-bar progress-bar-striped progress-bar-danger active");
		foodTotal = food + "/" + storageamttotal  + " (" + bonustotal + ")";
	}
	

	document.getElementById("food").innerHTML = foodTotal;
	document.getElementById('foodprogressbar').setAttribute("style", "width:" + Math.ceil((food/storageamttotal) * 100) + "%;");

	//water bar
	var waterTotal;
	var bonustotal = waterbonus - watercost;
	
		
	if (waterbonus == watercost || water == storageamttotal)
	{
		replaceAllClassesonElement("waterprogressbar", "progress-bar progress-bar-info");	
		waterTotal = water + "/" + storageamttotal  + " (+"+ bonustotal + ")";
	}
	else if(waterbonus > watercost)
	{
		replaceAllClassesonElement("waterprogressbar","progress-bar progress-bar-striped progress-bar-success active");
		waterTotal = water + "/" + storageamttotal  + " (+"+ bonustotal + ")";
	}
	else if(waterbonus < watercost)
	{
		replaceAllClassesonElement("waterprogressbar", "progress-bar progress-bar-striped progress-bar-danger active");
		waterTotal = water + "/" + storageamttotal  + " ("+ bonustotal + ")";
	}

	document.getElementById("water").innerHTML = waterTotal;
	document.getElementById('waterprogressbar').setAttribute("style", "width:" + Math.ceil((water/storageamttotal) * 100) + "%;");

	//research bar

	var researchTotal;

	if (researchbonus == 0)
	{
		replaceAllClassesonElement("researchprogressbar", "progress-bar progress-bar-info");	
		researchTotal = researchpoints;
	}
	else
	{
		replaceAllClassesonElement("researchprogressbar","progress-bar progress-bar-striped progress-bar-success active");
		researchTotal = researchpoints + " (+"+ researchbonus + ")";
	}

	document.getElementById("researchpoints").innerHTML = researchTotal;

	//credits bar

	var creditsTotal;
	if (creditsbonus == 0)
	{
		replaceAllClassesonElement("creditsprogressbar", "progress-bar progress-bar-info");	
		creditsTotal = credits;
	}
	else
	{
		replaceAllClassesonElement("creditsprogressbar","progress-bar progress-bar-striped progress-bar-success active");
		creditsTotal = credits + " (+"+ creditsbonus + ")";
	}

	document.getElementById("credits").innerHTML = creditsTotal;	
}

//functions to buy research levels
function researchAdvMining()
{
	var upgradeCost = Math.floor(baseResearchCost * Math.pow(1.75,advancedmining)) - (Math.floor(baseResearchCost * Math.pow(1.75,advancedmining)) % 5);
    if(researchpoints >= upgradeCost && advancedmining < 10){                               
        advancedmining = advancedmining + 1;
        researchpoints = researchpoints - upgradeCost;

        document.getElementById('advmininglevel').innerHTML = advancedmining;  
       	document.getElementById("researchpoints").innerHTML = researchpoints;
    };
    if(advancedmining < 10)
    {
    	var nextCost =  Math.floor(baseResearchCost * Math.pow(1.75,advancedmining)) - (Math.floor(baseResearchCost * Math.pow(1.75,advancedmining)) % 5);
    }
    else
    {
    	nextCost = "";
    }
    document.getElementById('advminingcost').innerHTML = nextCost;
}

function researchAdvOxygen()
{
	var upgradeCost = Math.floor(baseResearchCost * Math.pow(1.75,advancedoxygen)) - (Math.floor(baseResearchCost * Math.pow(1.75,advancedoxygen)) % 5);
    if(researchpoints >= upgradeCost && advancedoxygen < 10){                               
        advancedoxygen = advancedoxygen + 1;
        researchpoints = researchpoints - upgradeCost;

        document.getElementById('advoxygenlevel').innerHTML = advancedoxygen;  
       	document.getElementById("researchpoints").innerHTML = researchpoints;
    };
    if(advancedoxygen < 10)
    {
    	var nextCost =  Math.floor(baseResearchCost * Math.pow(1.75,advancedoxygen)) - (Math.floor(baseResearchCost * Math.pow(1.75,advancedoxygen)) % 5);
    }
    else
    {
    	nextCost = "";
    }
    document.getElementById('advoxygencost').innerHTML = nextCost;
}

function researchAdvWater()
{
	var upgradeCost = Math.floor(baseResearchCost * Math.pow(1.75,advancedwater)) - (Math.floor(baseResearchCost * Math.pow(1.75,advancedwater)) % 5);
    if(researchpoints >= upgradeCost && advancedwater < 10){                               
        advancedwater = advancedwater + 1;
        researchpoints = researchpoints - upgradeCost;

        document.getElementById('advwaterlevel').innerHTML = advancedwater;  
       	document.getElementById("researchpoints").innerHTML = researchpoints;
    };
    if(advancedwater < 10)
    {
    	var nextCost =  Math.floor(baseResearchCost * Math.pow(1.75,advancedwater)) - (Math.floor(baseResearchCost * Math.pow(1.75,advancedwater)) % 5);
    }
    else
    {
    	nextCost = "";
    }
    document.getElementById('advwatercost').innerHTML = nextCost;
}

function researchAdvFarming()
{
	var upgradeCost = Math.floor(baseResearchCost * Math.pow(1.75,advancedfarming)) - (Math.floor(baseResearchCost * Math.pow(1.75,advancedfarming)) % 5);
    if(researchpoints >= upgradeCost && advancedfarming < 10){                               
        advancedfarming = advancedfarming + 1;
        researchpoints = researchpoints - upgradeCost;

        document.getElementById('advfarminglevel').innerHTML = advancedfarming;  
       	document.getElementById("researchpoints").innerHTML = researchpoints;
    };
    if(advancedfarming < 10)
    {
    	var nextCost =  Math.floor(baseResearchCost * Math.pow(1.75,advancedfarming)) - (Math.floor(baseResearchCost * Math.pow(1.75,advancedfarming)) % 5);
    }
    else
    {
    	nextCost = "";
    }
    document.getElementById('advfarmingcost').innerHTML = nextCost;
}

function researchAdvResearch()
{
	var upgradeCost = Math.floor(baseResearchCost * Math.pow(1.75,advancedresearch)) - (Math.floor(baseResearchCost * Math.pow(1.75,advancedresearch)) % 5);
    if(researchpoints >= upgradeCost && advancedresearch < 10){                               
        advancedresearch = advancedresearch + 1;
        researchpoints = researchpoints - upgradeCost;

        document.getElementById('advresearchlevel').innerHTML = advancedresearch;  
       	document.getElementById("researchpoints").innerHTML = researchpoints;
    };
    if(advancedresearch < 10)
    {
    	var nextCost =  Math.floor(baseResearchCost * Math.pow(1.75,advancedresearch)) - (Math.floor(baseResearchCost * Math.pow(1.75,advancedresearch)) % 5);
    }
    else
    {
    	nextCost = "";
    }
    document.getElementById('advresearchcost').innerHTML = nextCost;
}

function researchAdvEconomy()
{
	var upgradeCost = Math.floor(baseResearchCost * Math.pow(1.75,advancedincome)) - (Math.floor(baseResearchCost * Math.pow(1.75,advancedincome)) % 5);
    if(researchpoints >= upgradeCost && advancedincome < 10){                               
        advancedincome = advancedincome + 1;
        researchpoints = researchpoints - upgradeCost;

        document.getElementById('adveconomylevel').innerHTML = advancedincome;  
       	document.getElementById("researchpoints").innerHTML = researchpoints;
    };
    if(advancedincome < 10)
    {
    	var nextCost =  Math.floor(baseResearchCost * Math.pow(1.75,advancedincome)) - (Math.floor(baseResearchCost * Math.pow(1.75,advancedincome)) % 5);
    }
    else
    {
    	nextCost = "";
    }
    document.getElementById('adveconomycost').innerHTML = nextCost;
}

//Utility functions

function addClasstoElement(id,myClass)
{
	document.getElementById(id).className += myClass

}

function removeClassfromElement(id,myClass)
{
	document.getElementById(id).className = 
	document.getElementById(id).className.replace
      ( /(?:^|\s)myClass(?!\S)/g , '' )
}
function replaceAllClassesonElement(id,myClass)
{
	document.getElementById(id).className = myClass;
}

function calculateLinearCost(numToBuy, baseCost, numOfBuildings)
{
	var totalCost = 0;
	for (i=0; i < numToBuy; i++)
	{
		totalCost += baseCost + Math.floor((numOfBuildings + i)/3)
	}
	return totalCost;
}

function setMaximumFacilities(ship)
{
	ship.max = calcSizeOfShip(ship.facilities);
	generatorsmax += ship.facilities[0];
	quartersmax += ship.facilities[1];
	autominersmax += ship.facilities[2];
	lifesupportmax += ship.facilities[3];
	farmsmax += ship.facilities[4];
	refineriesmax += ship.facilities[5];
	researchlabsmax += ship.facilities[6];
	combatmax += ship.facilities[7];
	storagemax += ship.facilities[8];
	
}

function calcSizeOfShip(facilities)
{
	var size = 0;
	for(i=1; i < facilities.length; i++)
	{
		size += facilities[i];
	}	
	return size;
}

function addAlert(id,message) {
    $('#' + id).append(
        '<div class="alert alert-danger fade in">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button>' + message + '</div>');
}

function removeAlert(message) {
    $('.alert').remove(":contains('" + message + "')");
}

//JQuery click captures

$("#recruitCostx1").on('click', function() {
   Recruit(1);
});
$("#recruitCostx10").on('click', function() {
	Recruit(10);
});
$("#recruitCostx100").on('click', function() {
	Recruit(100);
});

$("#qsBuyx1").on('click', function() {
   buyCrewQuarters(1);
});
$("#qsBuyx10").on('click', function() {
   buyCrewQuarters(10);
});
$("#qsBuyx100").on('click', function() {
   buyCrewQuarters(100);
});

$("#genBuyx1").on('click', function() {
   buyGenerator(1);
});
$("#genBuyx10").on('click', function() {
   buyGenerator(10);
});
$("#genBuyx100").on('click', function() {
   buyGenerator(100);
});

$("#minerBuyx1").on('click', function() {
   buyMiner(1);
});
$("#minerBuyx10").on('click', function() {
   buyMiner(10);
});
$("#minerBuyx100").on('click', function() {
   buyMiner(100);
});

$("#oxyBuyx1").on('click', function() {
   buyLifeSupport(1);
});
$("#oxyBuyx10").on('click', function() {
   buyLifeSupport(10);
});
$("#oxyBuyx100").on('click', function() {
   buyLifeSupport(100);
});

$("#hydroponicsBuyx1").on('click', function() {
   buyHydroponics(1);
});
$("#hydroponicsBuyx10").on('click', function() {
   buyHydroponics(10);
});
$("#hydroponicsBuyx100").on('click', function() {
   buyHydroponics(100);
});

$("#refBuyx1").on('click', function() {
   buyRefinery(1);
});
$("#refBuyx10").on('click', function() {
   buyRefinery(10);
});
$("#refBuyx100").on('click', function() {
   buyRefinery(100);
});

$("#labsBuyx1").on('click', function() {
   buyResearchLab(1);
});
$("#labsBuyx10").on('click', function() {
   buyResearchLab(10);
});
$("#labsBuyx100").on('click', function() {
   buyResearchLab(100);
});

$("#stoBuyx1").on('click', function() {
   buyStorage(1);
});
$("#stoBuyx10").on('click', function() {
   buyStorage(10);
});
$("#stoBuyx100").on('click', function() {
   buyStorage(100);
});

//ship construction Jquery
//ship building buttons
$("#buildSmallShip").on('click', function() {
   var facilitiesValues = new Array();
   $slider = $('input[id*="smallShip"]');
   //set generator value
   facilitiesValues.push(50);
   $.each($slider, function(i, $s) {
	   	if($s !== 'undefined' && $(this).val() !== "")
		{		
			facilitiesValues.push(parseInt($(this).slider('getValue')));
		}
	});
   addShip("Small",facilitiesValues);
});


$originalValue = 0; //holds starting slider value for calculations
$maxSmallShip = 250;
//handling the sliders

$('input[id*="Ship"]').on("slide", function(slideEvt) {
	$sliders = $('input[id*="Ship"]');
	//gets badge ID and then inputs value to reflect current value of slider
	$.each($sliders, function(i,$s){
		$badgeID = "#" + $(this).slider('getAttribute','id').slice(0,-6);
		$($badgeID).text($(this).slider('getValue'));
	});
});

$('input[id*="Ship"]').on("slideStop", function(slideEvt) {
	$sliders = $('input[id*="Ship"]');
	//gets badge ID and then inputs value to reflect current value of slider
	$.each($sliders, function(i,$s){
		$badgeID = "#" + $(this).slider('getAttribute','id').slice(0,-6);
		$($badgeID).text($(this).slider('getValue'));
	});
});

$('input[id*="Ship"]').on("slideStart", function(){
	$originalValue = 0;
	$originalValue = $(this).slider('getValue');
});
//small ship sliders

$('input[id*="smallShip"]').on("slideStop", function(){
	$totalVal = 0;
	//update total value and badge value
	$sliders = $('input[id*="smallShip"]');
	//get total value of all sliders
	$.each($sliders, function(i,$s){
		$totalVal += parseInt($(this).slider('getValue'));
	});
	

	$('#smallShipTotalValue').text($totalVal + "/" + $maxSmallShip);
	$('#smallshiptotalvalueprogressbar').css("width", Math.floor(($totalVal/$maxSmallShip) * 100) + "%");
});

$('input[id*="smallShip"]').on("slide", function(){
	$totalVal = 0;
	$sliders = $('input[id*="smallShip"]');
	//get total value of all sliders
	$.each($sliders, function(i,$s){
		$totalVal += parseInt($(this).slider('getValue'));
	});

	$('#smallShipTotalValue').text($totalVal + "/" + $maxSmallShip);
	$('#smallshiptotalvalueprogressbar').css("width", Math.floor(($totalVal/$maxSmallShip) * 100) + "%");

	//if total value is greater than 250, decrease random other slider value
	if($totalVal > 250)
	{
		//remove current slider
		$slidersToDecrease = $sliders.not($(this));
		//remove sliders without value
		$slidersLeft = $slidersToDecrease;
		$.each($slidersToDecrease, function(i,$s){
			if(parseInt($(this).slider('getValue')) == 0)
			{
				$slidersLeft = $slidersLeft.not($(this));
			}
		});	
		var randomnumber = Math.floor(Math.random() * $slidersLeft.length ) + 1;	

		var amountChanged = $(this).slider('getValue') - $originalValue;
		var newValue = $slidersLeft.eq(randomnumber-1).slider('getValue') - amountChanged;
		$slidersLeft.eq(randomnumber - 1).slider('setValue', newValue);
		$originalValue = $(this).slider('getValue');
	}
	

});

//game loop
window.setInterval(function(){newDay();}, 1000);

//On page load
$(document).ready ( function(){
	
	$smallShipSliders = $('input[id*="smallShip"]');

	$.each($smallShipSliders, function(i,$s){

		$(this).slider({
			min:0,
			max:250,
			step:1,
			value:0,
			selection:'before',
			tooltip:'always',
		});
	});
	$('#smallShipTotalValue').text( 0 + "/" + $maxSmallShip);

	setMaximumFacilities(mothership);
	
	$('[data-toggle="tooltip"]').tooltip(); 
	
});