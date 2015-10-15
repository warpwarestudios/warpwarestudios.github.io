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
var workers = 3100;
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
var generators = 1000; //increases maximum energy
var quarters = 900; //housing for crew
var autominers = 650; //increases resources/second
var lifesupport = 650; //increases oxygen supplies
var farms = 650; //increases food supplies
var refineries = 650; //turns ice into water
var researchlabs = 500; //research facility for new technology
var combat = 0;
var storage = 500; 

//maximum allowed of each building
var generatorsmax = 1000; //increases maximum energy
var quartersmax = 900; //housing for crew
var autominersmax = 650; //increases resources/second
var lifesupportmax = 650; //increases oxygen supplies
var farmsmax = 650; //increases food supplies
var refineriesmax = 650; //turns ice into water
var researchlabsmax = 500; //research facility for new technology
var combatmax = 500; 
var storagemax = 500;


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

	document.getElementById('quarters').innerHTML = quarters + "/" + quartersmax;  
    document.getElementById('generators').innerHTML = generators + "/" + generatorsmax;  
    document.getElementById('miners').innerHTML = autominers + "/" + autominersmax;  
    document.getElementById('lifesupport').innerHTML = lifesupport + "/" + lifesupportmax;  
    document.getElementById('hydroponics').innerHTML = farms + "/" + farmsmax;  
    document.getElementById('refineries').innerHTML = refineries + "/" + refineriesmax;  
    document.getElementById('storage').innerHTML = storage + "/" + storagemax;  
    document.getElementById('labs').innerHTML = researchlabs + "/" + researchlabsmax; 
    document.getElementById('combat').innerHTML = combat + "/" + combatmax; 
    
    var recruitCost = Math.floor(1 * Math.pow(1.01,(population + workers)));
    	
	document.getElementById('recruitCost').setAttribute("title", "Oxygen: "  + recruitCost + " Food: " + recruitCost + " Water: " + recruitCost + " Credits: " + recruitCost);
    

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
	var recruitCost = Math.floor(1 * Math.pow(1.01,(population + workers)));
    if(oxygen >= recruitCost && water >= recruitCost && food >= recruitCost && credits >= recruitCost && population + workers < populationmax){                               
		
		oxygen = oxygen - recruitCost;
		food = food - recruitCost;
		water = water - recruitCost;
		credits = credits - recruitCost;
		population = population + 1;
		updateCrew();                                          
    };
    var nextCost = Math.floor(1 * Math.pow(1.01,(population + workers)));
    document.getElementById('recruitCost').setAttribute("title", "Oxygen: "  + nextCost + " Food: " + nextCost + " Water: " + nextCost + " Credits: " + nextCost);
    updateCrew();                                          
    
}

function buyCrewQuarters()
{
	var qCost = Math.floor(10 + (quarters/3));
    if(metals >= qCost && quarters < quartersmax){                               
        quarters = quarters + 1;                                   
    	metals = metals - qCost;                        
        document.getElementById('quarters').innerHTML = quarters + "/" + quartersmax;  
       	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(10 + (quarters/3));
    document.getElementById('qsCost').innerHTML = nextCost;
    updateCrew();
}

function buyGenerator(){
    var genCost = 25;
    if(metals >= genCost && generators < generatorsmax){                               
        generators = generators + 1;                                   
    	metals = metals - genCost;                        
        document.getElementById('generators').innerHTML = generators + "/" + generatorsmax;  
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = 25;
    document.getElementById('genCost').innerHTML = nextCost;
};

function buyMiner(){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var minerCost = Math.floor(15 + (autominers/3));
    if(metals >= minerCost && energy < energymax && population > 0 && autominers < autominersmax){
    	population = population - 1; 
    	workers = workers + 1;                               
        autominers = autominers + 1;                                   
    	metals = metals - minerCost;                        
        document.getElementById('miners').innerHTML = autominers + "/" + autominersmax;  
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(15 + (autominers/3));
    document.getElementById('minerCost').innerHTML = nextCost;
};

function buyLifeSupport(){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var lsCost = Math.floor(15 + (lifesupport/3));
    if(metals >= lsCost && energy < energymax && population > 0 && lifesupport < lifesupportmax){                               
        population = population - 1; 
    	workers = workers + 1;                               
        lifesupport = lifesupport + 1;                                   
    	metals = metals - lsCost;                        
        document.getElementById('lifesupport').innerHTML = lifesupport + "/" + lifesupportmax;  
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(15 + (lifesupport/3));
    document.getElementById('lsCost').innerHTML = nextCost;
};

function buyHydroponics(){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var farmCost = Math.floor(15 + (farms/3));
    if(metals >= farmCost && energy < energymax && population > 0 && farms < farmsmax){                               
        population = population - 1; 
    	workers = workers + 1;                               
        farms = farms + 1;                                   
    	metals = metals - farmCost;                        
        document.getElementById('hydroponics').innerHTML = farms + "/" + farmsmax;  
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(15 + (farms/3));
    document.getElementById('hydroponicsCost').innerHTML = nextCost;
};

function buyRefinery(){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var refCost = Math.floor(15 + (refineries/3));
    if(metals >= refCost && energy < energymax && population > 0 && refineries < refineriesmax){                               
        population = population - 1; 
    	workers = workers + 1;                               
        refineries = refineries + 1;                                   
    	metals = metals - refCost;                        
        document.getElementById('refineries').innerHTML = refineries + "/" + refineriesmax;  
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(15 + (refineries/3));
    document.getElementById('IceRefineryCost').innerHTML = nextCost;
};

function buyStorage(){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var mStoreCost = 50;
    if(metals >= mStoreCost && storage < storagemax){                               
        storage = storage + 1;                                   
    	metals = metals - mStoreCost;                        
        storageamttotal = storage * storageamt;
		document.getElementById('storage').innerHTML = storage + "/" + storagemax;  
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = 50;
    document.getElementById('StorageCost').innerHTML = nextCost;
};

function buyResearchLab(){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var labCost = 100;
    if(metals >= labCost && energy < energymax && population > 0 && researchlabs < researchlabsmax){                               
        population = population - 1; 
    	workers = workers + 1;                               
        researchlabs = researchlabs + 1;                                   
    	metals = metals - labCost;                        
        document.getElementById('labs').innerHTML = researchlabs + "/" + researchlabsmax; 
    	var metalsTotal = metals + "/" + storageamttotal;
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
	storageamttotal = storage * storageamt;

	//for each automated miner generate either ice or metal
	//if max, only generate the other one, because your miners
	//are intelligent
	if(metals == storageamttotal)
	{
		ice = ice + Math.floor(autominers * (1 + (0.05 * advancedmining)));
		icebonus = icebonus + Math.floor(autominers * (1 + (0.05 * advancedmining)));
	}
	else if (ice == storageamttotal || ice == storageamttotal - icecost)
	{
		totalminers = Math.floor(autominers * (1 + (0.05 * advancedmining)));
		//put ice equal to cost into ice
		ice = ice + icecost;
		icebonus = icecost;
		//put the rest into metals
		metals = metals + totalminers - icecost;
		metalsbonus = metalsbonus + totalminers - icecost;
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
	var metalsTotal = metals + "/" + storageamttotal + " (+" + metalsbonus + ")";
	document.getElementById("metals").innerHTML = metalsTotal;
	//put ice in the html
	var bonustotal = icebonus - icecost;

	var iceTotal;
	document.getElementById("ice").innerHTML = iceTotal;

	if(icebonus > icecost)
	{
		replaceAllClassesonElement("icerow","success")
		iceTotal = ice + "/" + storageamttotal + " (+" + bonustotal + ")";
		document.getElementById("ice").innerHTML = iceTotal;
	}
	else if(icebonus < icecost)
	{
		replaceAllClassesonElement("icerow", "danger")
		iceTotal = ice + "/" + storageamttotal + " (" + bonustotal + ")";
		document.getElementById("ice").innerHTML = iceTotal;
	}
	else if (icebonus == icecost)
	{
		replaceAllClassesonElement("icerow", "")	
		iceTotal = ice + "/" + storageamttotal + " (+" + bonustotal + ")";
		document.getElementById("ice").innerHTML = iceTotal;
	}
	else
	{
		replaceAllClassesonElement("icerow", "")	
		iceTotal = ice + "/" + storageamttotal;
		document.getElementById("ice").innerHTML = iceTotal;
	}
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
	var oxygenTotal;
	
	var bonustotal = oxygenbonus - oxygencost;
	
	if(oxygenbonus > oxygencost)
	{
		replaceAllClassesonElement("oxygenrow","success");
	    oxygenTotal = oxygen + "/" + storageamttotal + " (+" + bonustotal + ")";
	}
	else if(oxygenbonus < oxygencost)
	{
		replaceAllClassesonElement("oxygenrow", "danger");
		var oxygenTotal = oxygen + "/" + storageamttotal + " (" + bonustotal + ")";
	}
	else if (oxygenbonus == oxygencost)
	{
		replaceAllClassesonElement("oxygenrow", "");	
	    oxygenTotal = oxygen + "/" + storageamttotal + " (+" + bonustotal + ")";
	}

	document.getElementById("oxygen").innerHTML = oxygenTotal;
	
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
	var foodTotal;
	var bonustotal = foodbonus - foodcost
	
	if(foodbonus > foodcost)
	{
		replaceAllClassesonElement("foodrow","success");
		foodTotal = food + "/" + storageamttotal  + " (+" + bonustotal + ")";
	}
	else if(foodbonus < foodcost)
	{
		replaceAllClassesonElement("foodrow", "danger");
		foodTotal = food + "/" + storageamttotal  + " (" + bonustotal + ")";
	}
	else if (foodbonus == foodcost)
	{
		replaceAllClassesonElement("foodrow", "");	
		foodTotal = food + "/" + storageamttotal  + " (+" + bonustotal + ")";
	}

	document.getElementById("food").innerHTML = foodTotal;
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
	var waterTotal;
	var bonustotal = waterbonus - watercost;
	
	if(waterbonus > watercost)
	{
		replaceAllClassesonElement("waterrow","success");
		waterTotal = water + "/" + storageamttotal  + " (+"+ bonustotal + ")";
	}
	else if(waterbonus < watercost)
	{
		replaceAllClassesonElement("waterrow", "danger");
		waterTotal = water + "/" + storageamttotal  + " ("+ bonustotal + ")";
	}
	else if (waterbonus == watercost)
	{
		replaceAllClassesonElement("waterrow", "");	
		waterTotal = water + "/" + storageamttotal  + " (+"+ bonustotal + ")";
	}

	document.getElementById("water").innerHTML = waterTotal;
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
    	var nextCost =  Math.floor(baseCost * Math.pow(1.75,advancedfarming)) - (Math.floor(baseCost * Math.pow(1.75,advancedfarming)) % 5);
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