import { Vehicle } from "./Vehicle.interface";
import { VehicleSize } from "./VehicleSize.enum";

class ParkingSpot {
    spotId: string;
    size: VehicleSize;
    isOccupied: boolean;
    parkedVehicle?: Vehicle | undefined;

    constructor(spotId: string, size: VehicleSize) {
        this.spotId = spotId;
        this.size = size;
        this.isOccupied = false;
    }

    canFitVehicle(vehicle: Vehicle): boolean {
        if (this.isOccupied) {
            return false; // Spot already occupied
        }

        // Check if vehicle size fits the spot
        if (
            (vehicle.getSize() === VehicleSize.SMALL) ||
            (vehicle.getSize() === VehicleSize.MEDIUM && this.size !== VehicleSize.SMALL) ||
            (vehicle.getSize() === VehicleSize.LARGE && this.size === VehicleSize.LARGE)
        ) {
            return true; // Vehicle can be parked
        }

        return false; // Vehicle size does not fit
    }

    parkVehicle(vehicle: Vehicle): boolean {
        if (this.isOccupied) {
            return false; // Spot already occupied
        }

        // Check if vehicle size fits the spot
       if (this.canFitVehicle(vehicle)) {
            this.parkedVehicle = vehicle;
            this.isOccupied = true;
            return true; // Vehicle parked successfully
        }

        return false; // Vehicle size does not fit
    }

    unParkVehicle(): void {
        this.parkedVehicle = undefined;
        this.isOccupied = false;
    }

    isOccupiedStatus(): boolean {
        return this.isOccupied;
    }
}

export { ParkingSpot };