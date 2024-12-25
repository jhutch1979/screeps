var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower = require('role.tower');
var creepFunctions = require('creep.functions');
var roomFunctions = require('room.functions');

module.exports.loop = function () {

    

    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
            console.log('Clearing non-existant creep memory: ', name);
        }
    }

    _.forEach(Game.rooms, function(room, roomName){
        
       

        if (room && room.controller && room.controller.my){
            room.spawnCreep('harvester');
            room.spawnCreep('builder');
            room.spawnCreep('upgrader');
            room.defend();
            console.log();
           /*
            let harvesterTarget = _.get(room.memory, ['census', 'harvester'], 2);
            let upgraderTarget = _.get(room.memory, ['census', 'upgrader'], 2);
            let builderTarget = _.get(room.memory, ['census', 'builder'], 2);

            var Harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            //console.log('Harvesters: ' + Harvesters.length);

            if(Harvesters.length <harvesterTarget) {
                var newName = 'Harvester' + Game.time;

                Game.spawns['Spawn1'].spawnCreep(buildBody([WORK,CARRY,MOVE], room), newName,
                    {memory: {role: 'harvester'}});
            }

            var Upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            //console.log('Upgraders: ' + Upgraders.length);

            if(Upgraders.length < upgraderTarget) {
                var newName = 'Upgrader' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(buildBody([WORK,CARRY,MOVE], room), newName,
                    {memory: {role: 'upgrader'}}
                );
            }

            var Builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            //console.log('Builders: ' + Builders.length);
            let sites = room.find(FIND_CONSTRUCTION_SITES);
            if(sites.length > 0 && Builders.length < builderTarget ) {
                var newName = 'Builder' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(buildBody([WORK,CARRY,MOVE], room), newName,
                    {memory: {role: 'builder'}}
                );
            }
            */
        
        }
    })
    
    
    

    if(Game.spawns['Spawn1'].spawning){
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            'Spawning ' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8}
        );
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var Harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(Harvesters == 0){
            roleHarvester.run(creep);
        }else{
            if(creep.memory.role == 'harvester'){
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader'){
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder'){
                roleBuilder.run(creep);
            }
        }
        
    }
    
    
}