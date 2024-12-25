var roleTower = require('role.tower');

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

Room.prototype.spawnCreep=function(creepType) {
    let typeTarget = _.get(this.memory, ['census', creepType], 2);

    var creepCount = _.filter(Game.creeps, (creep) => creep.memory.role == creepType);
    console.log(creepType +'s: ' + creepCount.length + "/" + _.get(this.memory, ['census', creepType],2));
    let sites = this.find(FIND_CONSTRUCTION_SITES);
    if(creepType != "builder" || sites.length >0){
        if(creepCount.length < typeTarget) {
         
            var newName = capitalizeFirstLetter(creepType) + Game.time;
    
            Game.spawns['Spawn1'].spawnCreep(buildBody([WORK,CARRY,MOVE], this), newName,
                {memory: {role: creepType}});
        }
    }

     
}
Room.prototype.defend=function() {
    var towers = this.find(FIND_STRUCTURES, {
        filter: (structure) => {
           return (structure.structureType == STRUCTURE_TOWER)
        }
    });
    for(const tower of towers){
        roleTower.run(tower)
    }
}

function buildBody(segmants, room){
    let cost = 0;
    _.forEach(segmants, function(bodyPart){
        cost += BODYPART_COST[bodyPart];
    });
    let availableEnergy = room.energyAvailable;

    let multiples = availableEnergy / cost;
    let body = [];
    for (let i =1; i < multiples; i++ ){
        _.forEach(segmants, s => body.push(s))
    }
    
    return body;
}