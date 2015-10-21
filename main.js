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
    document.getElementById('lifesupport').innerHTML = lifesupport + "/" + lifesupportmax;  
    document.getElementById('hydroponics').innerHTML = farms + "/" + farmsmax;  
    document.getElementById('refineries').innerHTML = refineries + "/" + refineriesmax;  
    document.getElementById('storage').innerHTML = storage + "/" + storagemax;  
    document.getElementById('labs').innerHTML = researchlabs + "/" + researchlabsmax; 
    document.getElementById('combat').innerHTML = combat + "/" + combatmax; 
    
    
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
	updateResearch();
}


function Recruit(numToBuy)
{
	var recruitCost = 1 * numToBuy;
    if(oxygen >= recruitCost && water >= recruitCost && food >= recruitCost && credits >= recruitCost && population + workers < populationmax && numToBuy > 0) {                               
		
		oxygen = oxygen - recruitCost;
		food = food - recruitCost;
		water = water - recruitCost;
		credits = credits - recruitCost;
		population = population + 1;
		updateCrew();                                          
    };
    var nextCostx1 = 1 * 1;
    var nextCostx10 = 1 * 10;
    var nextCostx100 = 1 * 100;

    document.getElementById('recruitCostx1').setAttribute("title", "Oxygen: "  + nextCostx1 + " Food: " + nextCostx1 + " Water: " + nextCostx1 + " Credits: " + nextCostx1);
    document.getElementById('recruitCostx10').setAttribute("title", "Oxygen: "  + nextCostx10 + " Food: " + nextCostx10 + " Water: " + nextCostx10 + " Credits: " + nextCostx10);
    document.getElementById('recruitCostx100').setAttribute("title", "Oxygen: "  + nextCostx100 + " Food: " + nextCostx100 + " Water: " + nextCostx100 + " Credits: " + nextCostx100);
    updateCrew();                                          
    
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

};

function buyMiner(numToBuy){
	var baseCost = 15;
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew

    var minerCost = calculateLinearCost(numToBuy, baseCost, autominers);
    if(metals >= minerCost && energy < energymax && population > 0 && autominers < autominersmax  && numToBuy > 0){
    	population = population - 1; 
    	workers = workers + 1;                               
        autominers = autominers + 1;                                   
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

	//update metals progress bar
	document.getElementById('metalsprogressbar').setAttribute("aria-valuenow", metals);
    document.getElementById('metalsprogressbar').setAttribute("aria-valuemax", storageamttotal);
    document.getElementById('metalsprogressbar').setAttribute("style", "width:" + Math.floor((metals/storageamttotal) * 100) + "%;");
};

function buyLifeSupport(numToBuy){
	var baseCost = 15;
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var lsCost = calculateLinearCost(numToBuy, baseCost, lifesupport);
    if(metals >= lsCost && energy < energymax && population > 0 && lifesupport < lifesupportmax && numToBuy > 0){                               
        population = population - 1; 
    	workers = workers + 1;                               
        lifesupport = lifesupport + 1;                                   
    	metals = metals - lsCost;                        
        document.getElementById('lifesupport').innerHTML = lifesupport + "/" + lifesupportmax;  
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCostx1 = calculateLinearCost(1, baseCost, lifesupport);
    var nextCostx10 = calculateLinearCost(10, baseCost, lifesupport);
    var nextCostx100 = calculateLinearCost(100, baseCost, lifesupport);
    
	document.getElementById('lsCostx1').innerHTML = nextCostx1;
	document.getElementById('lsCostx10').innerHTML = nextCostx10;
	document.getElementById('lsCostx100').innerHTML = nextCostx100;
};

function buyHydroponics(numToBuy){
	var baseCost = 15;
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var farmCost = calculateLinearCost(numToBuy, baseCost, farms);
    if(metals >= farmCost && energy < energymax && population > 0 && farms < farmsmax && numToBuy > 0){                               
        population = population - 1; 
    	workers = workers + 1;                               
        farms = farms + 1;                                   
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
};

function buyRefinery(numToBuy){
	var baseCost = 15;
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var refCost = calculateLinearCost(numToBuy, baseCost, refineries);
    if(metals >= refCost && energy < energymax && population > 0 && refineries < refineriesmax && numToBuy > 0){                               
        population = population - 1; 
    	workers = workers + 1;                               
        refineries = refineries + 1;                                   
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
    
    document.getElementById('StorageCostx1').innerHTML = nextCostx1;
	document.getElementById('StorageCostx10').innerHTML = nextCostx10;
    document.getElementById('StorageCostx100').innerHTML = nextCostx100;
};

function buyResearchLab(numToBuy){
	updateEnergy(); //calculate current energy
	updateCrew(); // calculate current crew
    var labCost = 100 ;
    if(metals >= labCost && energy < energymax && population > 0 && researchlabs < researchlabsmax && numToBuy > 0){                               
        population = population - 1; 
    	workers = workers + 1;                               
        researchlabs = researchlabs + 1;                                   
    	metals = metals - labCost;                        
        document.getElementById('labs').innerHTML = researchlabs + "/" + researchlabsmax; 
    	var metalsTotal = metals + "/" + storageamttotal;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCostx1 = 100 * 1;
    var nextCostx10 = 100 * 10;
    var nextCostx100 = 100 * 100;
    
	document.getElementById('ResearchLabsCostx1').innerHTML = nextCostx1;
	document.getElementById('ResearchLabsCostx10').innerHTML = nextCostx10;
	document.getElementById('ResearchLabsCostx100').innerHTML = nextCostx100;
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
	document.getElementById('metalsprogressbar').setAttribute("aria-valuenow", metals);
    document.getElementById('metalsprogressbar').setAttribute("aria-valuemax", storageamttotal);
    document.getElementById('metalsprogressbar').setAttribute("style", "width:" + Math.floor((metals/storageamttotal) * 100) + "%;");

    
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

//game loop
window.setInterval(function(){newDay();}, 1000);