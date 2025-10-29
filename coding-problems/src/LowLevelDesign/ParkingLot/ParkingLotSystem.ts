import { FeeStrategy } from "./FeeStrategy";
import { ParkingStrategy } from "./ParkingStrategy";

class ParkingLotSystem {
    private parkingStrategy: ParkingStrategy;
    private feeStrategy: FeeStrategy;
    private static instance: ParkingLotSystem;
    private activeTickets: Map<string, { entryTime: Date; vehicleType: string }> = new Map();
    private floors: number;

    constructor(parkingStrategy: ParkingStrategy, feeStrategy: FeeStrategy, floors: number) {
        this.parkingStrategy = parkingStrategy;
        this.feeStrategy = feeStrategy;
        this.floors = floors;
    }

    static getInstance(parkingStrategy: ParkingStrategy, feeStrategy: FeeStrategy, floors: number): ParkingLotSystem {
        if (!ParkingLotSystem.instance) {
            ParkingLotSystem.instance = new ParkingLotSystem(parkingStrategy, feeStrategy, floors);
        }
        return ParkingLotSystem.instance;
    }

    addFloor(): void {
        this.floors += 1;
    }

    getTotalFloors(): number {
        return this.floors;
    }

    parkVehicle(licensePlate: string, entryTime: Date, vehicleType: string): string | null {
        const parkingSpot = this.parkingStrategy.findSpot(licensePlate);
        if (!parkingSpot) {
            return null;
        }
        // Logic to park the vehicle
        return parkingSpot;
    }

    unParkVehicle(licensePlate: string, exitTime: Date): number | null {
        const ticketInfo = this.activeTickets.get(licensePlate);
        if (!ticketInfo) {
            return null; // No active ticket found
        }

        const fee = this.feeStrategy.calculateFee(ticketInfo.entryTime, exitTime, ticketInfo.vehicleType);
        this.activeTickets.delete(licensePlate);
        return fee;
    }

    setFeeStrategy(feeStrategy: FeeStrategy): void {
        this.feeStrategy = feeStrategy;
    }

    setParkingStrategy(parkingStrategy: ParkingStrategy): void {
        this.parkingStrategy = parkingStrategy;
    }
}


export { ParkingLotSystem };