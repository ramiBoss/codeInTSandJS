interface FeeStrategy {
    calculateFee(entryTime: Date, exitTime: Date, vehicleType: string): number;
}

class FlatRateFeeStrategy implements FeeStrategy {
    private flatRate: number;

    constructor(flatRate: number) {
        this.flatRate = flatRate;
    }

    calculateFee(entryTime: Date, exitTime: Date, vehicleType: string): number {
        return this.flatRate;
    }
}

class HourlyRateFeeStrategy implements FeeStrategy {
    private hourlyRates: { [key: string]: number };

    constructor(hourlyRates: { [key: string]: number }) {
        this.hourlyRates = hourlyRates;
    }

    calculateFee(entryTime: Date, exitTime: Date, vehicleType: string): number {
        const hoursParked = Math.ceil((exitTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60));
        const rate = this.hourlyRates[vehicleType] || 0;
        return hoursParked * rate;
    }
}

export { FeeStrategy, FlatRateFeeStrategy, HourlyRateFeeStrategy };