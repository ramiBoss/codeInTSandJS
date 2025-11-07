import { FlatRateFeeStrategy } from "./FeeStrategy";
import { ParkingLotSystem } from "./ParkingLotSystem";
import { NearestFirstParkingStrategy } from "./ParkingStrategy";

class ParkingLotDemo {
    static main() {
        console.log("Parking Lot System Demo");
        // Here you can create instances of ParkingLot, Vehicle, etc., and demonstrate their interactions.
        const parkingStrategy = new NearestFirstParkingStrategy();
        const feeStrategy = new FlatRateFeeStrategy(20);
        const parkingLotSystem = new ParkingLotSystem(parkingStrategy, feeStrategy, 3); // 3 floors

        console.log("Parking Lot System initialized with Nearest First Parking Strategy and Flat Rate Fee Strategy.");
        parkingLotSystem.addFloor();
        console.log("Added a new floor. Total floors:", parkingLotSystem.getTotalFloors());

        parkingLotSystem.parkVehicle("ABC123", new Date(), "CAR");
        console.log("Parked vehicle with license plate ABC123.");

        const fee = parkingLotSystem.unParkVehicle("ABC123", new Date());
        console.log("Unparked vehicle with license plate ABC123. Parking fee:", fee);
    }
}

ParkingLotDemo.main();