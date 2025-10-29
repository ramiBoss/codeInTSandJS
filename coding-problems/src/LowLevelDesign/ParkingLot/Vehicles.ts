import { Vehicle } from "./Vehicle.interface";
import { VehicleSize } from "./VehicleSize.enum";

class Car implements Vehicle {
    size: VehicleSize;
    licensePlate: string;

    constructor(licensePlate: string) {
        this.size = VehicleSize.MEDIUM;
        this.licensePlate = licensePlate;
    }

    getSize(): VehicleSize {
        return this.size;
    }

    getLicensePlate(): string {
        return this.licensePlate;
    }
}

class Motorcycle implements Vehicle {
    size: VehicleSize;
    licensePlate: string;

    constructor(licensePlate: string) {
        this.size = VehicleSize.SMALL;
        this.licensePlate = licensePlate;
    }

    getSize(): VehicleSize {
        return this.size;
    }

    getLicensePlate(): string {
        return this.licensePlate;
    }
}

class Truck implements Vehicle {
    size: VehicleSize;
    licensePlate: string;

    constructor(licensePlate: string) {
        this.size = VehicleSize.LARGE;
        this.licensePlate = licensePlate;
    }

    getSize(): VehicleSize {
        return this.size;
    }

    getLicensePlate(): string {
        return this.licensePlate;
    }
}

export { Car, Motorcycle, Truck };