/* --- Example Usage --- */

// Create a parking lot with 10 spots,
// where the first 5 are for cars (size 1), next 3 for trucks (size 2), and last 2 for bikes (size 0.5)
const myParkingLot = new ParkingLot(10, [1, 1, 1, 1, 1, 2, 2, 2, 0.5, 0.5]);
console.log(`Initial available spots: ${myParkingLot.getAvailableSpotsCount()}`);

const car1 = new Car("ABC-123");
const car2 = new Car("XYZ-789");
const truck1 = new Truck("TRK-001");
const bike1 = new Bike("BIK-PQR");

// Park vehicles
const ticket1 = myParkingLot.findSpot(car1);
const ticket2 = myParkingLot.findSpot(car2);
const ticket3 = myParkingLot.findSpot(truck1); // This might not find a spot if only size 1 spots are left and truck needs size 2
const ticket4 = myParkingLot.findSpot(bike1);

console.log(`Available spots after parking: ${myParkingLot.getAvailableSpotsCount()}`);
console.log("Active tickets:", myParkingLot.getActiveTickets().map(t => t.vehicle.licensePlate));

// Simulate some time passing (e.g., 2 hours for car1)
if (ticket1) {
    setTimeout(() => {
        myParkingLot.exitVehicle(car1);
        console.log(`Available spots after car1 exit: ${myParkingLot.getAvailableSpotsCount()}`);
    }, 2 * 60 * 60 * 1000); // 2 hours
}


// Simulate some time passing (e.g., 1 hour for car2)
if (ticket2) {
    setTimeout(() => {
        myParkingLot.exitVehicle(car2);
        console.log(`Available spots after car2 exit: ${myParkingLot.getAvailableSpotsCount()}`);
    }, 1 * 60 * 60 * 1000); // 1 hour
}

// Try to exit a vehicle not parked
myParkingLot.exitVehicle(new Car("NON-EXISTENT"));