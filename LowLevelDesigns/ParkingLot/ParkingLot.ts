/**
 * @class ParkingLot
 * @description Manages parking spots and active parking tickets.
 */
class ParkingLot {
    /**
     * @private
     * @property {ParkingSpot[]} spots - An array of all parking spots in the lot.
     */
    private spots: ParkingSpot[] = [];
    /**
     * @private
     * @property {Ticket[]} activeTickets - An array of currently active parking tickets.
     */
    private activeTickets: Ticket[] = [];

    /**
     * Creates an instance of ParkingLot.
     * Initializes a specified number of parking spots.
     * @param {number} numberOfSpots - The total number of parking spots in the lot.
     * @param {number[]} [spotSizes] - Optional: An array defining the sizes of each spot. If not provided, all spots will be size 1.
     */
    constructor(numberOfSpots: number, spotSizes?: number[]) {
        if (spotSizes && spotSizes.length === numberOfSpots) {
            for (let i = 0; i < numberOfSpots; i++) {
                this.spots.push(new ParkingSpot(spotSizes[i]));
            }
        } else {
            // Default to all spots being size 1 if specific sizes aren't provided or mismatch.
            for (let i = 0; i < numberOfSpots; i++) {
                this.spots.push(new ParkingSpot(1));
            }
        }
    }

    /**
     * Finds an available spot for a vehicle and issues a ticket.
     * @param {Vehicle} vehicle - The vehicle to be parked.
     * @returns {Ticket | null} The issued ticket if a spot is found, otherwise null.
     */
    findSpot(vehicle: Vehicle): Ticket | null {
        // Find the first available spot that can accommodate the vehicle.
        const openSpot = this.spots.find((spot: ParkingSpot) => spot.isAvailable && vehicle.size <= spot.size);

        if (!openSpot) {
            console.log(`No available spot for a ${vehicle.constructor.name} (size: ${vehicle.size}).`);
            return null;
        }
        
        // Park the vehicle and create a new ticket.
        openSpot.parkVehicle(vehicle);
        const ticket = new Ticket(vehicle, openSpot, new Date());
        this.activeTickets.push(ticket);
        console.log(`Vehicle ${vehicle.licensePlate} parked at spot size ${openSpot.size}.`);
        return ticket;
    }

    /**
     * Handles a vehicle exiting the parking lot.
     * @param {Vehicle} vehicle - The vehicle that is exiting.
     * @returns {Ticket | string} The completed ticket with exit time and calculated fee, or a string message if the ticket isn't found.
     */
    exitVehicle(vehicle: Vehicle): Ticket | string {
        const ticketIndex = this.activeTickets.findIndex((t: Ticket) => t.vehicle.licensePlate === vehicle.licensePlate);

        if (ticketIndex === -1) {
            console.warn(`Ticket not found for vehicle with license plate: ${vehicle.licensePlate}`);
            return "Ticket not found";
        }

        const ticket = this.activeTickets[ticketIndex];
        ticket.exitTime = new Date(); // Set the exit time.
        
        // Release the parking spot.
        ticket.spot.releaseSpot();

        // Remove the ticket from active tickets.
        this.activeTickets.splice(ticketIndex, 1);
        
        console.log(`Vehicle ${vehicle.licensePlate} exited successfully. Fee: $${ticket.calculateFee()}`);
        return ticket; // Return the completed ticket.
    }

    /**
     * Gets the current number of available parking spots.
     * @returns {number} The count of available spots.
     */
    getAvailableSpotsCount(): number {
        return this.spots.filter(spot => spot.isAvailable).length;
    }

    /**
     * Gets a list of all active parking tickets.
     * @returns {Ticket[]} An array of active tickets.
     */
    getActiveTickets(): Ticket[] {
        return [...this.activeTickets]; // Return a copy to prevent external modification.
    }
}
