//holding variables
var energy = 0;
var energymax = 0;
var oxygen = 100;
var materials = 100;
var food = 100;
var water = 100;
var ice = 0;
var metals = 100;
var date = 0;
var population = 1;
var populationmax = 10;
var storagemax = 100;

//storage
var storage = 1;


//buildings
var generators = 1; //increases maximum energy
var autominers = 0; //increases resources/second
var lifesupport = 0; //increases oxygen supplies
var farms = 0; //increases food supplies
var refineries = 0; //turns ice into water

function newDay(){
	updateEnergy();
	updateOxygen();
	updateMaterials();
	updateWater();
	updateFood();
	updatePopulation();
}

function awakenPerson()
{
	if(population < populationmax)
	{
		population = population + 1;
	}
}

function buyGenerator(){
    var genCost = Math.floor(10 * Math.pow(1.1,generators));
    if(metals >= genCost){                               
        generators = generators + 1;                                   
    	metals = metals - genCost;                        
        document.getElementById('generators').innerHTML = generators;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,generators));
    document.getElementById('genCost').innerHTML = nextCost;
};

function buyMiner(){
	updateEnergy(); //calculate current energy
    var minerCost = Math.floor(10 * Math.pow(1.1,autominers));
    if(metals >= minerCost && energy < energymax){                               
        autominers = autominers + 1;                                   
    	metals = metals - minerCost;                        
        document.getElementById('miners').innerHTML = autominers;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,autominers));
    document.getElementById('minerCost').innerHTML = nextCost;
};

function buyLifeSupport(){
	updateEnergy(); //calculate current energy
    var lsCost = Math.floor(10 * Math.pow(1.1,lifesupport));
    if(metals >= lsCost && energy < energymax){                               
        lifesupport = lifesupport + 1;                                   
    	metals = metals - lsCost;                        
        document.getElementById('lifesupport').innerHTML = lifesupport;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,lifesupport));
    document.getElementById('lsCost').innerHTML = nextCost;
};

function buyHydroponics(){
	updateEnergy(); //calculate current energy
    var farmCost = Math.floor(10 * Math.pow(1.1,farms));
    if(metals >= farmCost && energy < energymax){                               
        farms = farms + 1;                                   
    	metals = metals - farmCost;                        
        document.getElementById('hydroponics').innerHTML = farms;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1, farms));
    document.getElementById('hydroponicsCost').innerHTML = nextCost;
};

function buyRefinery(){
	updateEnergy(); //calculate current energy
    var refCost = Math.floor(10 * Math.pow(1.1,refineries));
    if(metals >= refCost && energy < energymax){                               
        refineries = refineries + 1;                                   
    	metals = metals - refCost;                        
        document.getElementById('refineries').innerHTML = refineries;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1, refineries));
    document.getElementById('IceRefineryCost').innerHTML = nextCost;
};

function buyStorage(){
	updateEnergy(); //calculate current energy
    var mStoreCost = Math.floor(10 * Math.pow(1.1,storage));
    if(metals >= mStoreCost && energy < energymax){                               
        storage = storage + 1;                                   
    	metals = metals - mStoreCost;                        
        storagemax = storage * 100;
		document.getElementById('storage').innerHTML = storage;  
       	var metalsTotal = metals + "/" + storagemax;
		document.getElementById("metals").innerHTML = metalsTotal;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1, storage));
    document.getElementById('StorageCost').innerHTML = nextCost;
};


function updateEnergy(){
	energy = autominers + lifesupport + farms + storage;
	energymax = 50 * generators;
	var energyTotal = energy + "/" + energymax;
	
	document.getElementById("energy").innerHTML = energyTotal;
}
function updateMaterials(){
	var random;
	
	//calculate maximum storage
	storagemax = storage * 100;

	//for each automated miner generate either ice or metal
	//if max, only generate the other one, because your miners
	//are intelligent
	if(metals == storagemax)
	{
		ice = ice + autominers;
	}
	else if (ice == storagemax)
	{
		metals = metals + autominers;
	}
	else
	{
		for(i=0; i < autominers; i++)
		{	
			random = Math.random() * 100;
			if(random > 50)
			{
				metals = metals + 1;
			}
			else
			{
				ice = ice + 1;
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
	var metalsTotal = metals + "/" + storagemax;
	document.getElementById("metals").innerHTML = metalsTotal;
	//put ice in the html
	var iceTotal = ice + "/" + storagemax;
	document.getElementById("ice").innerHTML = iceTotal;
}

function updateOxygen(){
	oxygen = oxygen - population;
	storagemax = storage * 100;
	
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
		//not enough supplies means people die
		population = population - 1;
		if (population < 1)
		{
			population = 1;
		}
	}		
	var oxygenTotal = oxygen + "/" + storagemax;
	
	document.getElementById("oxygen").innerHTML = oxygenTotal;
}

function updateFood(){
	
	food = food - population;
	storagemax = storage * 100;
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
		//not enough supplies means people die
		population = population - 1;
		if (population < 1)
		{
			population = 1;
		}
	}		
	var foodTotal = food + "/" + storagemax;
	
	document.getElementById("food").innerHTML = foodTotal;
}

function updateWater(){
	water = water - population;
	storagemax = storage * 100;
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
		//not enough supplies means people die
		population = population - 1;
		if (population < 1)
		{
			population = 1;
		}
	}		
	var waterTotal = water + "/" + storagemax;
	
	document.getElementById("water").innerHTML = waterTotal;
}


//melt ice to create water
function generateWater()
{
	//if there isn't enough ice, take what there is
	if (ice < refineries)
	{
		water = water + ice;
		ice = 0;
	}
	//otherwise ice is equal or greater than the melters
	else
	{
		water = water + refineries;
		ice = ice - refineries;
	}
}

//generate oxygen using water
function generateOxygen()
{
	//if there isn't enough water, take what there is
	if (water < lifesupport)
	{
		oxygen = oxygen + water;
		water = 0;
	}
	//otherwise water is equal or greater than the lifesupport
	else
	{
		oxygen = oxygen + lifesupport;
		water = water - lifesupport;
	}
}

//generate food using water
function generateFood()
{
	//if there isn't enough water, take what there is
	if (water < farms)
	{
		food = food + water;
		water = 0;
	}
	//otherwise water is equal or greater than the hydroponics
	else
	{
		food = food + farms;
		water = water - farms;
	}
}

function updatePopulation(){
			
	var popTotal = population + "/" + populationmax;
	
	document.getElementById("population").innerHTML = popTotal;
}

window.setInterval(function(){newDay();}, 1000);