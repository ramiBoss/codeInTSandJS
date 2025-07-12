/**
 * @class ParkingSpot
 * @description Represents a single parking spot within the parking lot.
 */
class ParkingSpot {
    /**
     * @property {number} size - The maximum size of vehicle this spot can accommodate.
     * @property {boolean} isAvailable - Indicates if the parking spot is currently available. Defaults to true.
     */
    constructor(public size: number, public isAvailable: boolean = true) {}

    /**
     * Attempts to park a vehicle in this spot.
     * @param {Vehicle} vehicle - The vehicle to be parked.
     * @returns {boolean} True if the vehicle was successfully parked, false otherwise.
     */
    parkVehicle(vehicle: Vehicle): boolean {
        // Check if the spot is available and can accommodate the vehicle's size.
        if (this.isAvailable && vehicle.size <= this.size) {
            this.isAvailable = false;
            return true;
        }
        return false;
    }

    /**
     * Releases the parking spot, making it available again.
     */
    releaseSpot(): void {
        this.isAvailable = true;
    }
}