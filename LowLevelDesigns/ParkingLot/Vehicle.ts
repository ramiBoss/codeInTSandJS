/**
 * @abstract
 * @class Vehicle
 * @description Represents a generic vehicle with a license plate and size.
 */
abstract class Vehicle {
    /**
     * @property {string} licensePlate - The unique identifier for the vehicle.
     * @property {number} size - The size of the vehicle, used to determine suitable parking spots.
     */
    constructor(public licensePlate: string, public size: number) {}
}

/**
 * @class Car
 * @extends Vehicle
 * @description Represents a car, a type of vehicle with a standard size.
 */
class Car extends Vehicle {
    /**
     * Creates an instance of Car.
     * @param {string} licensePlate - The license plate of the car.
     */
    constructor(licensePlate: string) {
        // Cars typically occupy 1 unit of parking space.
        super(licensePlate, 1);
    }
}

/**
 * @class Bike
 * @extends Vehicle
 * @description Represents a motorcycle or bike, a type of vehicle with a smaller size.
 */
class Bike extends Vehicle {
    /**
     * Creates an instance of Bike.
     * @param {string} licensePlate - The license plate of the bike.
     */
    constructor(licensePlate: string){
        // Bikes typically occupy 0.5 units of parking space.
        super(licensePlate, 0.5);
    }
}

/**
 * @class Truck
 * @extends Vehicle
 * @description Represents a truck, a type of vehicle with a larger size.
 */
class Truck extends Vehicle {
    /**
     * Creates an instance of Truck.
     * @param {string} licensePlate - The license plate of the truck.
     */
    constructor(licensePlate: string){
        // Trucks typically occupy 2 units of parking space.
        super(licensePlate, 2);
    }
}