function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

Room.prototype.spawnCreep=function(creepType) {
    let typeTarget = _.get(room.memory, ['census', creepType], 2);

    var creepCount = _.filter(Game.creeps, (creep) => creep.memory.role == creepType);
    console.log(creepType +'s: ' + creepCount.length);

    if(creepCount.length < typeTarget) {
        var newName = capitalizeFirstLetter(creepType) + Game.time;

        Game.spawns['Spawn1'].spawnCreep(buildBody([WORK,CARRY,MOVE], room), newName,
            {memory: {role: creepType}});
    }
}