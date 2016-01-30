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
var j_worship = 0;

var j_woodcutter = 0;
var j_stoneMason = 0;
var j_farmer = 0;


// Resources
var r_wood = 0;
var r_stone = 0;
var r_food = 0;

//Gods
var g_Hades = 0;
var g_Cupid = 0;
var g_Loki = 0;
var g_Thor = 0;
var g_Athena = 0;

// Population / Year
var population = 2;
var population_CAP = 10;
var year = 0;


// Constants
var FOOD_COST = 0.1;
var GENERAL_SEXUAL_ACTIVITY = 0.1;
var HOUSE_WOOD_COST = 3;
var HOUSE_STONE_COST = 3;
var WOOD_LIMIT = 99;
var STONE_LIMIT = 99;
var FOOD_LIMIT = 99;


function update() {
	updateParameters();
	updateResources();
	updatePopulation();
	updateGods();
	year += 1;
}

function updateParameters() {
	p_death = j_raid;
	p_birth = j_brewery;
	p_healing = j_apothecary - j_brewery;
	p_peace = j_worship - j_raid;
	p_war = j_raid - j_worship;
	p_construction = j_woodcutter + j_stoneMason;
	p_destruction = j_raid;
	p_honor = j_worship - j_brewery;
	p_mischief = j_brewery - j_worship;
}

function updateResources() {
	r_wood += j_woodcutter + j_raid;
	if (r_wood > WOOD_LIMIT){
		r_wood = WOOD_LIMIT;
	}

	r_stone += j_stoneMason + j_raid;
	if (r_stone > STONE_LIMIT){
		r_stone = STONE_LIMIT;
	}

	r_food += j_farmer - FOOD_COST;
	if (r_food > FOOD_LIMIT){
		r_food = FOOD_LIMIT;
	}
}

function updatePopulation() {
	if ((r_wood >= HOUSE_WOOD_COST) && (r_stone >= HOUSE_STONE_COST)) {
		population_CAP += 2;
		r_wood -= HOUSE_WOOD_COST;
		r_stone -= HOUSE_STONE_COST;
	}

	if (r_food < 0) {
		if (p_death <= 0.5) {
			p_death = 0.5
		}
	} else if (population <= population_CAP){
		population += p_birth - p_death + p_healing + GENERAL_SEXUAL_ACTIVITY;
	}
}

function updateGods() {
	// USING PARAMETERS.	
	g_Hades += (3 * p_death) + (2 * p_war) + (1 * p_destruction) + (-1 * p_peace) + (-3 * p_healing);
	g_Cupid += (3 * p_birth) + (2 * p_healing) + (1 * p_peace) + (-1 * p_destruction) + (-2 * p_war) + (-3 * p_death);
	g_Loki += (3 * p_mischief) + (2 * p_destruction) + (1 * p_death) + (-1 * p_peace) + (-2 * p_birth) + (-3 * p_honor);
	g_Thor += (3 * p_war) + (2 * p_honor) + (1 * p_destruction) + (-1 * p_construction) + (-2 * p_peace) + (-3 * p_mischief);
	g_Athena += (3 * p_peace) + (2 * p_construction) + (1 * p_honor) + (-1 * p_death) + (-2 * p_war) + (-3 * p_destruction);
}

function setStartingValues() {
	//Left in for setting later
	j_farmer = 0.2;
}