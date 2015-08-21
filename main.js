//holding variables
var energy = 0;
var energymax = 0;
var oxygen = 100;
var oxygenmax = 100;
var materials = 100;
var materialsmax = 100;
var food = 100;
var foodmax = 100;
var date = 0;
var population = 1;
var populationmax = 10;

//storage
var oxygenstorage = 1;
var foodstorage = 1;
var materialstorage = 1;


//buildings
var generators = 1; //increases maximum energy
var miners = 0; //increases resources/second
var lifesupport = 0; //increases oxygen supplies
var farms = 0; //increases food supplies


function newDay(){
	updateEnergy();
	date = date + 1;
	updateOxygen();
	updateMaterials();
	updateFood();
	updatePopulation();
	updateStorage();
	document.getElementById("date").innerHTML = date;
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
    if(materials >= genCost){                               
        generators = generators + 1;                                   
    	materials = materials - genCost;                        
        document.getElementById('generators').innerHTML = generators;  
       	var materialsTotal = materials + "/" + materialsmax;
		document.getElementById("materials").innerHTML = materialsTotal;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,generators));
    document.getElementById('genCost').innerHTML = nextCost;
};

function buyMiner(){
	updateEnergy(); //calculate current energy
    var minerCost = Math.floor(10 * Math.pow(1.1,miners));
    if(materials >= minerCost && energy < energymax){                               
        miners = miners + 1;                                   
    	materials = materials - minerCost;                        
        document.getElementById('miners').innerHTML = miners;  
       	var materialsTotal = materials + "/" + materialsmax;
		document.getElementById("materials").innerHTML = materialsTotal;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,miners));
    document.getElementById('minerCost').innerHTML = nextCost;
};

function buyLifeSupport(){
	updateEnergy(); //calculate current energy
    var lsCost = Math.floor(10 * Math.pow(1.1,lifesupport));
    if(materials >= lsCost && energy < energymax){                               
        lifesupport = lifesupport + 1;                                   
    	materials = materials - lsCost;                        
        document.getElementById('lifesupport').innerHTML = lifesupport;  
       	var materialsTotal = materials + "/" + materialsmax;
		document.getElementById("materials").innerHTML = materialsTotal;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,lifesupport));
    document.getElementById('lsCost').innerHTML = nextCost;
};

function buyFarm(){
	updateEnergy(); //calculate current energy
    var farmCost = Math.floor(10 * Math.pow(1.1,farms));
    if(materials >= farmCost && energy < energymax){                               
        farms = farms + 1;                                   
    	materials = materials - farmCost;                        
        document.getElementById('farms').innerHTML = farms;  
       	var materialsTotal = materials + "/" + materialsmax;
		document.getElementById("materials").innerHTML = materialsTotal;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1, farms));
    document.getElementById('farmCost').innerHTML = nextCost;
};

function buyMaterialStorage(){
	updateEnergy(); //calculate current energy
    var mStoreCost = Math.floor(10 * Math.pow(1.1,materialstorage));
    if(materials >= mStoreCost && energy < energymax){                               
        materialstorage = materialstorage + 1;                                   
    	materials = materials - mStoreCost;                        
        document.getElementById('materialStorage').innerHTML = materialstorage;  
       	materialsmax = materialstorage * 100;
		var materialsTotal = materials + "/" + materialsmax;
		document.getElementById("materials").innerHTML = materialsTotal;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1, materialstorage));
    document.getElementById('materialStorageCost').innerHTML = nextCost;
};

function buyOxygenStorage(){
	updateEnergy(); //calculate current energy
    var oStoreCost = Math.floor(10 * Math.pow(1.1,oxygenstorage));
    if(materials >= oStoreCost && energy < energymax){                               
        oxygenstorage = oxygenstorage + 1;                                   
    	materials = materials - oStoreCost;                        
        document.getElementById('oxygenStorage').innerHTML = oxygenstorage;  
       	oxygenmax = oxygenstorage * 100;
		var materialsTotal = materials + "/" + materialsmax;
		document.getElementById("materials").innerHTML = materialsTotal;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1, oxygenstorage));
    document.getElementById('oxygenStorageCost').innerHTML = nextCost;
};


function buyFoodStorage(){
	updateEnergy(); //calculate current energy
    var fStoreCost = Math.floor(10 * Math.pow(1.1,foodstorage));
    if(materials >= fStoreCost && energy < energymax){                               
        foodstorage = foodstorage + 1;                                   
    	materials = materials - fStoreCost;                        
        document.getElementById('foodStorage').innerHTML = foodstorage;  
		foodmax = foodstorage * 100;
		var materialsTotal = materials + "/" + materialsmax;
		document.getElementById("materials").innerHTML = materialsTotal;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1, foodstorage));
    document.getElementById('foodStorageCost').innerHTML = nextCost;
};


function updateEnergy(){
	energy = miners + lifesupport + farms + materialstorage + oxygenstorage + foodstorage;
	energymax = 5 * generators;
	var energyTotal = energy + "/" + energymax;
	
	document.getElementById("energy").innerHTML = energyTotal;
}
function updateOxygen(){
	oxygen = oxygen - population + lifesupport;
	oxygenmax = oxygenstorage * 100;
	if(oxygen > oxygenmax)
	{
		oxygen = oxygenmax;
	}		
	var oxygenTotal = oxygen + "/" + oxygenmax;
	
	document.getElementById("oxygen").innerHTML = oxygenTotal;
}
function updateMaterials(){
	materials = materials + miners;
	materialsmax = materialstorage * 100;
	if(materials > materialsmax)
	{
		materials = materialsmax;
	}		
	var materialsTotal = materials + "/" + materialsmax;
	
	document.getElementById("materials").innerHTML = materialsTotal;
}
function updateFood(){
	food = food - population + farms;
    foodmax = foodstorage * 100;
	if(food > foodmax)
	{
		food = foodmax;
	}		
	var foodTotal = food + "/" + foodmax;
	
	document.getElementById("food").innerHTML = foodTotal;
}

function updatePopulation(){
			
	var popTotal = population + "/" + populationmax;
	
	document.getElementById("population").innerHTML = popTotal;
}

window.setInterval(function(){newDay();}, 1000);