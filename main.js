
//ship variables
var mothership = {name:"Mother Ship",currentsize:0,max:0,facilities:[1000,900,650,650,650,650,500,500,500]};
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
var generatorsmax = 1000; //increases maximum energy, index = 0
var quartersmax = 900; //housing for crew, index = 1
var autominersmax = 650; //increases resources/second, index = 2
var lifesupportmax = 650; //increases oxygen supplies, index = 3
var farmsmax = 650; //increases food supplies, index = 4
var refineriesmax = 650; //turns ice into water, index = 5
var researchlabsmax = 500; //research facility for new technology, index = 6
var combatmax = 500; //combat capabilities of your fleet, index = 7
var storagemax = 500; //storage capacity of your fleet, index = 8


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
}
//functions to display ships
function displayShips()
{
	mothership.currentsize = quarters + autominers + lifesupport + farms + refineries + storage + researchlabs;
	document.getElementById('shipNameMothership').innerHTML = mothership.name;  
    document.getElementById('shipSizeMothership').innerHTML = mothership.currentsize + "/" + mothership.max;  
    
}

function addShip(size)
{	//facilities array is as follows: generators, quarters, miners, oxygen, food, refineries, research, combat, storage
	var newShip;
	if(size === "Small")
	{	 
		newShip = {shipName:"Small Ship " + shipList.length, currentsize:0,max:250, facilities:[250,0,0,0,0,0,0,0,0]}
		newShip.facilities[1] = document.getElementById('smallShipQuarters').innerHTML;
		shipList.push(newShip);
		
	}	
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
	metals += autominers;
	metalsbonus += autominers;
	
	ice += autominers;
	icebonus += autominers;
	
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

//update all progress bars
function updateBars()
{
	//population bar
	var totalPop = workers + population;
	
	if(totalPop == populationmax)
	{
		replaceAllClassesonElement("workerprogressbar","progress-bar progress-bar-danger");
		replaceAllClassesonElement("populationprogressbar","progress-bar progress-bar-warning");
	}
	if( totalPop != populationmax)
	{
		replaceAllClassesonElement("workerprogressbar","progress-bar progress-bar-info");
		replaceAllClassesonElement("populationprogressbar","progress-bar");
		replaceAllClassesonElement("populationleftprogressbar","progress-bar progress-bar-success");
	}
	document.getElementById("population").innerHTML = population;
	document.getElementById("workers").innerHTML = workers;
	document.getElementById("populationleft").innerHTML = populationmax - totalPop;
	document.getElementById('workerprogressbar').setAttribute("style", "width:" + Math.ceil((workers/populationmax) * 100) + "%;");
	document.getElementById('populationprogressbar').setAttribute("style", "width:" + Math.ceil((population/populationmax) * 100) + "%;");
	document.getElementById('populationleftprogressbar').setAttribute("style", "width:" + Math.ceil(((populationmax - totalPop)/populationmax) * 100) + "%;");
	
	//energy bar
	if(energy == energymax)
	{
		replaceAllClassesonElement("energyprogressbar", "progress-bar progress-bar-danger")
	}
	if(energy != energymax)
	{
		replaceAllClassesonElement("energyprogressbar", "progress-bar progress-bar-info")
	}
	document.getElementById("energy").innerHTML = energy;
	document.getElementById('energyprogressbar').setAttribute("style", "width:" + Math.floor((energy/energymax) * 100) + "%;");
	document.getElementById("energyleft").innerHTML = energymax - energy;
	document.getElementById('energyleftprogressbar').setAttribute("style", "width:" + Math.ceil(((energymax - energy)/energymax) * 100) + "%;");

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

function setMaximumFacilities(facilities)
{
	mothership.max = calcSizeOfShip(facilities);
	generatorsmax = facilities[0];
	quartersmax = facilities[1];
	autominersmax = facilities[2];
	lifesupportmax = facilities[3];
	farmsmax = facilities[4];
	refineriesmax = facilities[5];
	researchlabsmax = facilities[6];
	combatmax = facilities[7];
	storagemax = facilities[8];
	
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
   addShip("Small");
});

//handling the sliders
//small ship sliders
$("#smallShipQuartersSliderBar").on('slide', function() {
	$('#smallShipQuarters').html($('#smallShipQuartersSliderBar').val());
});
$("#smallShipMinersSliderBar").on('slide', function() {
	$('#smallShipMiners').html($('#smallShipMinersSliderBar').val());
});

//game loop
window.setInterval(function(){newDay();}, 1000);

//On page load
$(document).ready ( function(){
	setMaximumFacilities(mothership.facilities);
})