var roleTower = {
    run: function(tower) {
        let targets= tower.room.find(FIND_HOSTILE_CREEPS);
        if(targets.length){
            let target = tower.pos.findClosestByRange(targests);
            if(target){
                tower.attack(target);
            }
        }
        
    }
    
};

module.exports = roleTower;