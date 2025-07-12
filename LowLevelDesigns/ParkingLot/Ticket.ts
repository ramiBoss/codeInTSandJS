/**
 * @class Ticket
 * @description Represents a parking ticket, tracking a vehicle's parking session.
 */
class Ticket {
    /**
     * @property {Vehicle} vehicle - The vehicle associated with this ticket.
     * @property {ParkingSpot} spot - The parking spot occupied by the vehicle.
     * @property {Date} entryTime - The time when the vehicle entered the parking lot.
     * @property {Date|null} exitTime - The time when the vehicle exited, or null if still parked.
     */
    constructor(
        public vehicle: Vehicle,
        public spot: ParkingSpot,
        public entryTime: Date,
        public exitTime: Date | null = null
    ) {}

    /**
     * Calculates the parking fee based on the duration the vehicle was parked.
     * @returns {number} The calculated parking fee.
     * @throws {Error} If the exit time has not been recorded yet.
     */
    calculateFee(): number {
        if (!this.exitTime) {
            throw new Error('Exit time not recorded yet. Cannot calculate fee.');
        }

        // Calculate duration in hours.
        // Convert milliseconds to hours (1000 ms/s * 60 s/min * 60 min/hr).
        const durationMilliseconds = this.exitTime.getTime() - this.entryTime.getTime();
        const durationHours = durationMilliseconds / (1000 * 60 * 60);

        // Define a simple rate per hour.
        const ratePerHour = 10; // e.g., $10 per hour

        // Round the fee to the nearest whole number.
        return Math.round(durationHours * ratePerHour);
    }
}