//holding variables
var energy = 0;
var energymax = 0;
var oxygen = 100;
var materials = 100;
var food = 100;
var water = 100;
var ice = 100;
var metals = 100;
var date = 0;
var workers = 0;
var population = 0;
var populationmax = 1;
var storagemax = 100;
var credits = 0;
var researchpoints = 0;

//storage
var storage = 1;

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
var autominers = 0; //increases resources/second
var lifesupport = 0; //increases oxygen supplies
var farms = 0; //increases food supplies
var refineries = 0; //turns ice into water
var researchlabs = 0; //research facility for new technology
var combat = 0; 

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


	updateEnergy();
	updateOxygen();
	updateFood();
	updateWater();
	updateMaterials();
	updateCrew();
	updateResearch();
}


function Recruit()
{
	var genCost = 1;
    if(oxygen >= genCost && water >= genCost && food >= genCost && population + workers < populationmax){                               
		
		oxygen = oxygen - genCost;
		food = food - genCost;
		water = water - genCost;
		population = population + 1;                                          
    };
}

function buyCrewQuarters()
{
	var genCost = Math.floor(10 + (quarters/3));
    if(metals >= genCost){                               
        quarters = quarters + 1;                                   
    	metals = metals - genCost;                        
        document.getElementById('quarters').innerHTML = quarters;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(10 + (quarters/3));
    document.getElementById('qsCost').innerHTML = nextCost;
}

function buyGenerator(){
    var genCost = 25;
    if(metals >= genCost){                               
        generators = generators + 1;                                   
    	metals = metals - genCost;                        
        document.getElementById('generators').innerHTML = generators;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = 25;
    document.getElementById('genCost').innerHTML = nextCost;
};

function buyMiner(){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var minerCost = Math.floor(15 + (autominers/3));
    if(metals >= minerCost && energy < energymax && population > 0){
    	population = population - 1; 
    	workers = workers + 1;                               
        autominers = autominers + 1;                                   
    	metals = metals - minerCost;                        
        document.getElementById('miners').innerHTML = autominers;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(15 + (autominers/3));
    document.getElementById('minerCost').innerHTML = nextCost;
};

function buyLifeSupport(){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var lsCost = Math.floor(15 + (lifesupport/3));
    if(metals >= lsCost && energy < energymax && population > 0){                               
        population = population - 1; 
    	workers = workers + 1;                               
        lifesupport = lifesupport + 1;                                   
    	metals = metals - lsCost;                        
        document.getElementById('lifesupport').innerHTML = lifesupport;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(15 + (lifesupport/3));
    document.getElementById('lsCost').innerHTML = nextCost;
};

function buyHydroponics(){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var farmCost = Math.floor(15 + (farms/3));
    if(metals >= farmCost && energy < energymax && population > 0){                               
        population = population - 1; 
    	workers = workers + 1;                               
        farms = farms + 1;                                   
    	metals = metals - farmCost;                        
        document.getElementById('hydroponics').innerHTML = farms;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(15 + (farms/3));
    document.getElementById('hydroponicsCost').innerHTML = nextCost;
};

function buyRefinery(){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var refCost = Math.floor(15 + (refineries/3));
    if(metals >= refCost && energy < energymax && population > 0){                               
        population = population - 1; 
    	workers = workers + 1;                               
        refineries = refineries + 1;                                   
    	metals = metals - refCost;                        
        document.getElementById('refineries').innerHTML = refineries;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(15 + (refineries/3));
    document.getElementById('IceRefineryCost').innerHTML = nextCost;
};

function buyStorage(){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var mStoreCost = 50;
    if(metals >= mStoreCost){                               
        storage = storage + 1;                                   
    	metals = metals - mStoreCost;                        
        storagemax = storage * 50;
		document.getElementById('storage').innerHTML = storage;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = 50;
    document.getElementById('StorageCost').innerHTML = nextCost;
};

function buyResearchLab(){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var labCost = 100;
    if(metals >= labCost && energy < energymax && population > 0){                               
        population = population - 1; 
    	workers = workers + 1;                               
        researchlabs = researchlabs + 1;                                   
    	metals = metals - labCost;                        
        document.getElementById('labs').innerHTML = researchlabs;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = 100;
    document.getElementById('ResearchLabsCost').innerHTML = nextCost;
};

function updateEnergy(){
	energy = autominers + lifesupport + farms + refineries + researchlabs;
	energymax = 5 * generators;
	var energyTotal = energy + "/" + energymax;
	
	document.getElementById("energy").innerHTML = energyTotal;
}
function updateMaterials(){
	var random;
	
	//calculate maximum storage
	storagemax = storage * 50;

	//for each automated miner generate either ice or metal
	//if max, only generate the other one, because your miners
	//are intelligent
	if(metals == storagemax)
	{
		ice = ice + autominers;
		icebonus = icebonus + autominers;
	}
	else if (ice == storagemax)
	{
		metals = metals + autominers;
		metalsbonus = metalsbonus + autominers;
	}
	else
	{
		for(i=0; i < autominers; i++)
		{	
			random = Math.random() * 100;
			if(random > 50)
			{
				metals = metals + 1;
				metalsbonus = metalsbonus + 1;
			}
			else
			{
				ice = ice + 1;
				icebonus = icebonus + 1;
			}
		}	
	}
	
	//check maximum and minimum
	if(metals > storagemax)
	{
		metals = storagemax;
	}
	if(metals < 0)
	{
		metals = 0;
	}
	if(ice > storagemax)
	{
		ice = storagemax;
	}
	if(ice < 0)
	{
		ice = 0;
	}
	//put metals in the html
	var metalsTotal = metals + "/" + storagemax + " (+" + metalsbonus + ")";
	document.getElementById("metals").innerHTML = metalsTotal;
	//put ice in the html
	var iceTotal = ice + "/" + storagemax + " (+" + icebonus + ")"+ " (-" + icecost + ")";
	document.getElementById("ice").innerHTML = iceTotal;
}

function updateOxygen(){
	oxygen = oxygen - (population + workers);
	oxygencost = oxygencost + population + workers;
	storagemax = storage * 50;
	
	if(oxygen < storagemax)
	{
		generateOxygen();
	}
	if(oxygen > storagemax)
	{
		oxygen = storagemax;
	}
	if (oxygen < 0)
	{
		oxygen = 0;
	}		
	var oxygenTotal = oxygen + "/" + storagemax + " (+" + oxygenbonus + ")"+ " (-" + oxygencost + ")";
	
	document.getElementById("oxygen").innerHTML = oxygenTotal;
}

function updateFood(){
	
	food = food - (population + workers);
	foodcost = foodcost + population + workers;
	storagemax = storage * 50;
	if(food < storagemax)
	{
		generateFood();
	}
	if(food > storagemax)
	{
		food = storagemax;
	}
	if(food < 0)
	{
		food = 0;
	}		
	var foodTotal = food + "/" + storagemax  + " (+" + foodbonus + ")"+ " (-" + foodcost + ")";
	
	document.getElementById("food").innerHTML = foodTotal;
}

function updateWater(){
	water = water - (population + workers);
	watercost = watercost + population + workers;
	storagemax = storage * 50;
	if(water < storagemax)
	{
		generateWater();
	}
	if(water > storagemax)
	{
		water = storagemax;
	}
	if (water < 0)
	{
		water = 0;
	}		
	var waterTotal = water + "/" + storagemax  + " (+"+ waterbonus + ")"+ " (-" + watercost + ")";
	
	document.getElementById("water").innerHTML = waterTotal;
}


//melt ice to create water
function generateWater()
{
	//if there isn't enough ice, take what there is
	if (ice < refineries)
	{
		water = water + (ice * 7);
		waterbonus = waterbonus + (ice * 7);
		icecost = icecost + ice;
		ice = 0;
	}
	//otherwise ice is equal or greater than the melters
	else
	{
		water = water + (refineries * 7);
		waterbonus = waterbonus + (refineries * 7);
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
		oxygen = oxygen + (water * 5);
		oxygenbonus = oxygenbonus + (water *5)
		watercost = watercost + water;
		water = 0;
	}
	//otherwise water is equal or greater than the lifesupport
	else
	{
		oxygen = oxygen + (lifesupport * 5);
		oxygenbonus = oxygenbonus + (lifesupport * 5);
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
		food = food + (water * 5);
		foodbonus = foodbonus + (water * 5);
		watercost = watercost + water;
		water = 0;
	}
	//otherwise water is equal or greater than the hydroponics
	else
	{
		food = food + (farms * 5);
		foodbonus = foodbonus + (farms * 5);
		water = water - farms;
		watercost = watercost + farms;
	}
}

function updateCrew(){

	
	populationmax = 5 * quarters;
	
	//check for not enough water/food/etc and kill off population
	//if worker is killed reduce efficiency of random resource until supplies are restored

	var popTotal = workers + "/" + population + "/" + populationmax;
	
	var taxes = workers + population;
	creditsbonus = creditsbonus + taxes;
	//add tax to current credits
	credits = credits + taxes;
	var creditsTotal = credits + " (+" + creditsbonus + ")";
	document.getElementById("population").innerHTML = popTotal;
	document.getElementById("credits").innerHTML = creditsTotal;


}

function updateResearch(){
	//add 1 point per number of research labs
	researchpoints = researchpoints + researchlabs;
	researchbonus = researchbonus + researchlabs;
	var researchTotal = researchpoints + " (+" + researchbonus + ")";
	document.getElementById("researchpoints").innerHTML = researchTotal;
}

window.setInterval(function(){newDay();}, 1000);