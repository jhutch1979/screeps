var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            creep.harvestEnergy();
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                   return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ||  structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            
            if(targets.length > 0){
                closeTarget = creep.pos.findClosestByPath(targets);
                
                if(creep.pos.isNearTo(closeTarget)){
                    creep.transfer(closeTarget, RESOURCE_ENERGY)
                } else {
                    creep.moveTo(closeTarget);
                }
            }else {
                if(!creep.pos.isNearTo(Game.spawns['Spawn1'])){
                    creep.moveTo(Game.spawns['Spawn1']);
                }
            }
            
        }
    }
};

module.exports = roleHarvester;