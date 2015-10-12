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
var workers = 4;
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
var autominers = 1; //increases resources/second
var lifesupport = 1; //increases oxygen supplies
var farms = 1; //increases food supplies
var refineries = 1; //turns ice into water
var researchlabs = 0; //research facility for new technology
var combat = 0; 

//research levels
var baseCost = 100;
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

	document.getElementById('quarters').innerHTML = quarters;  
    document.getElementById('generators').innerHTML = generators;  
    document.getElementById('miners').innerHTML = autominers;  
    document.getElementById('lifesupport').innerHTML = lifesupport;  
    document.getElementById('hydroponics').innerHTML = farms;  
    document.getElementById('refineries').innerHTML = refineries;  
    document.getElementById('storage').innerHTML = storage;  
    document.getElementById('labs').innerHTML = researchlabs; 
       	


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
		updateCrew();                                          
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
    updateCrew();
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
	if(energy == energymax && !document.getElementById("energyrow").className.match(/(?:^|\s)danger(?!\S)/))
	{
		addClasstoElement("energyrow","danger")
	}
	if(energy != energymax)
	{
		replaceAllClassesonElement("energyrow", "")
	}
	document.getElementById("energy").innerHTML = energyTotal;
	
	
}
function updateMaterials(){
	var random;
	
	metalsbonus = 0;
	icebonus = 0;

	//calculate maximum storage
	storagemax = storage * 50;

	//for each automated miner generate either ice or metal
	//if max, only generate the other one, because your miners
	//are intelligent
	if(metals == storagemax)
	{
		ice = ice + Math.floor(autominers * (1 + (0.05 * advancedmining)));
		icebonus = icebonus + Math.floor(autominers * (1 + (0.05 * advancedmining)));
	}
	else if (ice == storagemax || ice == storagemax - icecost)
	{
		//put ice equal to cost into ice
		ice = ice + Math.floor(icecost * (1 + (0.05 * advancedmining)));
		icebonus = Math.floor(icecost * (1 + (0.05 * advancedmining)));
		//put the rest into metals
		metals = metals + Math.floor((autominers - icecost) * (1 + (0.05 * advancedmining)));
		metalsbonus = metalsbonus + Math.floor((autominers - icecost) * (1 + (0.05 * advancedmining)));
	}
	else
	{
		for(i=0; i < autominers; i++)
		{	
			random = Math.random() * 100;
			if(random > 50)
			{
				metalsbonus = metalsbonus + 1;
			}
			else
			{
				icebonus = icebonus + 1;
			}
		}	

		metals = metals + Math.floor(metalsbonus * (1 + (0.05 * advancedmining)));
		metalsbonus = Math.floor(metalsbonus * (1 + (0.05 * advancedmining)));

		ice = ice + Math.floor(icebonus * (1 + (0.05 * advancedmining)));
		icebonus = Math.floor(icebonus * (1 + (0.05 * advancedmining)));
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

	if(icebonus > icecost && !document.getElementById("icerow").className.match(/(?:^|\s)success(?!\S)/))
	{
		replaceAllClassesonElement("icerow","success")
	}
	else if(icebonus < icecost && !document.getElementById("icerow").className.match(/(?:^|\s)danger(?!\S)/))
	{
		replaceAllClassesonElement("icerow", "danger")
	}
	else if (icebonus == icecost)
	{
		replaceAllClassesonElement("icerow", "")	
	}
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

	if(oxygenbonus > oxygencost && !document.getElementById("oxygenrow").className.match(/(?:^|\s)success(?!\S)/))
	{
		replaceAllClassesonElement("oxygenrow","success");
	}
	else if(oxygenbonus < oxygencost && !document.getElementById("oxygenrow").className.match(/(?:^|\s)danger(?!\S)/))
	{
		replaceAllClassesonElement("oxygenrow", "danger");
	}
	else if (oxygenbonus == oxygencost)
	{
		replaceAllClassesonElement("oxygenrow", "");	
	}
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

	if(foodbonus > foodcost && !document.getElementById("foodrow").className.match(/(?:^|\s)success(?!\S)/))
	{
		replaceAllClassesonElement("foodrow","success");
	}
	else if(foodbonus < foodcost && !document.getElementById("foodrow").className.match(/(?:^|\s)danger(?!\S)/))
	{
		replaceAllClassesonElement("foodrow", "danger");
	}
	else if (foodbonus == foodcost)
	{
		replaceAllClassesonElement("foodrow", "");	
	}
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

	if(waterbonus > watercost && !document.getElementById("waterrow").className.match(/(?:^|\s)success(?!\S)/))
	{
		replaceAllClassesonElement("waterrow","success");
	}
	else if(waterbonus < watercost && !document.getElementById("waterrow").className.match(/(?:^|\s)danger(?!\S)/))
	{
		replaceAllClassesonElement("waterrow", "danger");
	}
	else if (waterbonus == watercost)
	{
		replaceAllClassesonElement("waterrow", "");	
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

	var popTotal = workers + "/" + population + "/" + populationmax;
	
	var taxablePop = workers + population;
	creditsbonus = creditsbonus + Math.floor(taxablePop * (1 + (0.05 * advancedincome)));
	//add tax to current credits
	credits = credits + Math.floor(taxablePop * (1 + (0.05 * advancedincome)));
	var creditsTotal = credits + " (+" + creditsbonus + ")";

	if(taxablePop == populationmax && !document.getElementById("populationrow").className.match(/(?:^|\s)danger(?!\S)/))
	{
		addClasstoElement("populationrow","danger")
	}
	if( taxablePop != populationmax)
	{
		replaceAllClassesonElement("populationrow", "")
	}

	document.getElementById("population").innerHTML = popTotal;
	document.getElementById("credits").innerHTML = creditsTotal;


}

function updateResearch(){
	//add 1 point per number of research labs
	researchpoints = researchpoints + Math.floor(researchlabs * (1 + (0.05 * advancedresearch)));
	researchbonus = researchbonus + Math.floor(researchlabs * (1 + (0.05 * advancedresearch)));
	var researchTotal = researchpoints + " (+" + researchbonus + ")";
	document.getElementById("researchpoints").innerHTML = researchTotal;
}

//functions to buy research levels
function researchAdvMining()
{
	var upgradeCost = Math.floor(baseCost * Math.pow(1.75,advancedmining)) - (Math.floor(baseCost * Math.pow(1.75,advancedmining)) % 5);
    if(researchpoints >= upgradeCost && advancedmining < 10){                               
        advancedmining = advancedmining + 1;
        researchpoints = researchpoints - upgradeCost;

        document.getElementById('advmininglevel').innerHTML = advancedmining;  
       	document.getElementById("researchpoints").innerHTML = researchpoints;
    };
    if(advancedmining < 10)
    {
    	var nextCost =  Math.floor(baseCost * Math.pow(1.75,advancedmining)) - (Math.floor(baseCost * Math.pow(1.75,advancedmining)) % 5);
    }
    else
    {
    	nextCost = "";
    }
    document.getElementById('advminingcost').innerHTML = nextCost;
}

function researchAdvOxygen()
{
	var upgradeCost = Math.floor(baseCost * Math.pow(1.75,advancedoxygen)) - (Math.floor(baseCost * Math.pow(1.75,advancedoxygen)) % 5);
    if(researchpoints >= upgradeCost && advancedoxygen < 10){                               
        advancedoxygen = advancedoxygen + 1;
        researchpoints = researchpoints - upgradeCost;

        document.getElementById('advoxygenlevel').innerHTML = advancedoxygen;  
       	document.getElementById("researchpoints").innerHTML = researchpoints;
    };
    if(advancedoxygen < 10)
    {
    	var nextCost =  Math.floor(baseCost * Math.pow(1.75,advancedoxygen)) - (Math.floor(baseCost * Math.pow(1.75,advancedoxygen)) % 5);
    }
    else
    {
    	nextCost = "";
    }
    document.getElementById('advoxygencost').innerHTML = nextCost;
}

function researchAdvWater()
{
	var upgradeCost = Math.floor(baseCost * Math.pow(1.75,advancedwater)) - (Math.floor(baseCost * Math.pow(1.75,advancedwater)) % 5);
    if(researchpoints >= upgradeCost && advancedwater < 10){                               
        advancedwater = advancedwater + 1;
        researchpoints = researchpoints - upgradeCost;

        document.getElementById('advwaterlevel').innerHTML = advancedwater;  
       	document.getElementById("researchpoints").innerHTML = researchpoints;
    };
    if(advancedwater < 10)
    {
    	var nextCost =  Math.floor(baseCost * Math.pow(1.75,advancedwater)) - (Math.floor(baseCost * Math.pow(1.75,advancedwater)) % 5);
    }
    else
    {
    	nextCost = "";
    }
    document.getElementById('advwatercost').innerHTML = nextCost;
}

function researchAdvFarming()
{
	var upgradeCost = Math.floor(baseCost * Math.pow(1.75,advancedfarming)) - (Math.floor(baseCost * Math.pow(1.75,advancedfarming)) % 5);
    if(researchpoints >= upgradeCost && advancedfarming < 10){                               
        advancedfarming = advancedfarming + 1;
        researchpoints = researchpoints - upgradeCost;

        document.getElementById('advfarminglevel').innerHTML = advancedfarming;  
       	document.getElementById("researchpoints").innerHTML = researchpoints;
    };
    if(advancedfarming < 10)
    {
    	var nextCost =  Math.floor(baseCost * Math.pow(1.75,advancefarming)) - (Math.floor(baseCost * Math.pow(1.75,advancedfarming)) % 5);
    }
    else
    {
    	nextCost = "";
    }
    document.getElementById('advfarmingcost').innerHTML = nextCost;
}

function researchAdvResearch()
{
	var upgradeCost = Math.floor(baseCost * Math.pow(1.75,advancedresearch)) - (Math.floor(baseCost * Math.pow(1.75,advancedresearch)) % 5);
    if(researchpoints >= upgradeCost && advancedresearch < 10){                               
        advancedresearch = advancedresearch + 1;
        researchpoints = researchpoints - upgradeCost;

        document.getElementById('advresearchlevel').innerHTML = advancedresearch;  
       	document.getElementById("researchpoints").innerHTML = researchpoints;
    };
    if(advancedresearch < 10)
    {
    	var nextCost =  Math.floor(baseCost * Math.pow(1.75,advancedresearch)) - (Math.floor(baseCost * Math.pow(1.75,advancedresearch)) % 5);
    }
    else
    {
    	nextCost = "";
    }
    document.getElementById('advresearchcost').innerHTML = nextCost;
}

function researchAdvEconomy()
{
	var upgradeCost = Math.floor(baseCost * Math.pow(1.75,advancedincome)) - (Math.floor(baseCost * Math.pow(1.75,advancedincome)) % 5);
    if(researchpoints >= upgradeCost && advancedincome < 10){                               
        advancedincome = advancedincome + 1;
        researchpoints = researchpoints - upgradeCost;

        document.getElementById('adveconomylevel').innerHTML = advancedincome;  
       	document.getElementById("researchpoints").innerHTML = researchpoints;
    };
    if(advancedincome < 10)
    {
    	var nextCost =  Math.floor(baseCost * Math.pow(1.75,advancedincome)) - (Math.floor(baseCost * Math.pow(1.75,advancedincome)) % 5);
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

//game loop
window.setInterval(function(){newDay();}, 1000);