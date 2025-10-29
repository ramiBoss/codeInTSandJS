import { ParkingSpot } from "./ParkingSpot";
import { Vehicle } from "./Vehicle.interface";

class ParkingFloor {
    floorNumber: number;
    parkingSpots: Map<string, ParkingSpot[]>; // Map of VehicleSize to array of ParkingSpots

    constructor(floorNumber: number, parkingSpots: Map<string, ParkingSpot[]>) {
        this.floorNumber = floorNumber;
        this.parkingSpots = parkingSpots;
    }

    findAvailableSpot(vehicle: Vehicle): ParkingSpot | null {
        const spots = this.parkingSpots.get(vehicle.getSize());
        if (spots) {
            for (const spot of spots) {
                if (!spot.isOccupiedStatus() && spot.canFitVehicle(vehicle)) {
                    return spot; // Return the first available spot that fits the vehicle
                }
            }
        }
        return null; // No available spot found for the vehicle
    }

    addParkingSpot(spot: ParkingSpot): void {
        const sizeKey = spot.size;
        if (!this.parkingSpots.has(sizeKey)) {
            this.parkingSpots.set(sizeKey, []);
        }
        this.parkingSpots.get(sizeKey)?.push(spot);
    }

    displayAvailableSpots(): void {
        console.log(`Available spots on floor ${this.floorNumber}:`);
        this.parkingSpots.forEach((spots, size) => {
            const availableSpots = spots.filter(spot => !spot.isOccupiedStatus());
            console.log(`Size: ${size}, Available Spots: ${availableSpots.length}`);
        });
    }
}

export { ParkingFloor };