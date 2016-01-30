// Parameters
// These are variables which tell you about the current state of the town.
var p_death = 0;
var p_birth = 0;
var p_healing = 0;
var p_peace = 0;
var p_war = 0;
var p_construction = 0;
var p_destruction = 0;
var p_honor = 0;
var p_mischief = 0;


// Jobs
// Activities that 'people' will do.
var j_brewery = 0;
var j_apothecary = 0;
var j_raid = 0;
var j_build = 0;
var j_worship = 0;

var j_woodcutter  = 0;
var j_stoneMason = 0;
var j_farmer = 0;


// Resources
var r_wood =0;
var r_stone =0;
var r_food =0;


// Population / Year
var population=2;
var population_CAP = 10;
var year = 0;


// Constants
var FOOD_COST = 0.2; 
var GENERAL_SEXUAL_ACTIVITY = 0.1;
var HOUSE_WOOD_COST = 3;
var HOUSE_STONE_COST = 3;


function update() {
	updateParameters();
	updateGods();
	updateResources();
	updatePopulation();
	year += 1;
}

function updateParameters(){
	p_death = j_raid;
	p_birth = j_brewery;
	p_healing = j_apothecary - j_brewery;
	p_peace = j_worship - j_raid;
	p_war = j_raid - j_worship;
	p_construction = j_build;
	p_destruction = j_raid;
	p_honor = j_worship - j_brewery;
	p_mischief = j_brewery - j_worship;
}

function updateResources(){
	r_wood += j_woodcutter + j_raid;
	r_stone += j_stoneMason + j_raid;
	r_food += j_farmer - FOOD_COST;
}

function updatePopulation(){
	if ((r_wood >= HOUSE_WOOD_COST) && (r_wood >= HOUSE_STONE_COST)){
		population_CAP += 2;
		r_wood -= HOUSE_WOOD_COST;
		r_stone -= HOUSE_STONE_COST;
	}
	
	if (populaton <= population_CAP){
		population += p_birth - p_death + p_healing + GENERAL_SEXUAL_ACTIVITY;
	}
}

function updateGods(){
	// USING PARAMETERS.	
}