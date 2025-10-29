import SymbolMarker from "./Symbol.enum";

class Player {
    name: string;
    symbol: SymbolMarker;

    constructor(name: string, symbol: SymbolMarker) {
        this.name = name;
        this.symbol = symbol;
    }

    getName(): string {
        return this.name;
    }

    getSymbol(): SymbolMarker {
        return this.symbol;
    }

    setSymbol(symbol: SymbolMarker): void {
        this.symbol = symbol;
    }

    setName(name: string): void {
        this.name = name;
    }
}

export default Player;