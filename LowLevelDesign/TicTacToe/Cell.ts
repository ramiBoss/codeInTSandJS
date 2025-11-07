import SymbolMarker from "./Symbol.enum";

class Cell {
    symbol: SymbolMarker;
    
    constructor() {
        this.symbol = SymbolMarker.EMPTY;
    }

    getSymbol(): SymbolMarker {
        return this.symbol;
    }

    setSymbol(symbol: SymbolMarker): void {
        this.symbol = symbol;
    }   
}

export default Cell;