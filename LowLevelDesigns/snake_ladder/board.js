class Board {
    dimension;
    specialEntities = new Map();
    constructor(dimension){
        this.dimension = dimension;
    }

    printBoard(){
        const totalCells = this.dimension * this.dimension;
        for(let i = totalCells; i > 0; i--){
            console.log('|' + i + '')
            if(this.specialEntities.has(i)){
                console.log(this.specialEntities.get(i).getID())
            }
            console.log('|');
            if(totalCells%this.dimension === 0){
                console.log('\n');
            }
        }
    }

    getDimension(){
        return this.dimension;
    }

    getTotalCells(){
        return this.dimension * this.dimension;
    }


    addSpecialEntity(entity){
        let actionPosition = entity.getActionPosition();
        this.specialEntities.set(actionPosition, entity);
        return;
    }

    hasSpecialEntity(position){
        return this.specialEntities.has(position);
    }

    getSpecialEntity(position){
        if(this.specialEntities.has(position)){
            return this.specialEntities.get(position);
        }
        return null;
    }


}