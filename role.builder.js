var roleBuilder = {

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
            let sourceId = creep.memory.source || creep.findEnergySource();
            source = Game.getObjectById(sourceId);
            if(creep.pos.isNearTo(source)){
                creep.harvest(source);
            }else{
                creep.moveTo(source);
            }
        }
        else {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length){
                let target = creep.pos.findClosestByRange(targets);
                if(creep.build(target)== ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
};

module.exports = roleBuilder;