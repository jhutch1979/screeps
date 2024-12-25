var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.working = false;
            creep.say("harvest");
        } 
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0){
            creep.memory.working = true;
            creep.say('working');
        }


        if(!creep.memory.working) {
            
            creep.harvestEnergy()
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleUpgrader;