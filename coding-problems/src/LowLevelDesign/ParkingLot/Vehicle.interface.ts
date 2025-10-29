import { VehicleSize } from "./VehicleSize.enum";

export interface Vehicle {
    size: VehicleSize;
    licensePlate: string;

    getSize(): VehicleSize;
    getLicensePlate(): string;
}