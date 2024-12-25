Creep.prototype.findEnergySource = function() {
    var sources = this.room.find(FIND_SOURCES);
    if(sources.length){
        var closeSource = this.pos.findClosestByRange(sources);
        sourceId = closeSource.id;
        return sourceId
    }
}

Creep.prototype.harvestEnergy = function() {
    
    let sourceId = this.findEnergySource();
            
            source = Game.getObjectById(sourceId);
            if(this.pos.isNearTo(source)){
                this.harvest(source);
            }else{
                this.moveTo(source);
            }
}



