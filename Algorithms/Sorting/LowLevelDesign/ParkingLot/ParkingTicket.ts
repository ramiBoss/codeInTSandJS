import { Vehicle } from "./Vehicle.interface";

class ParkingTicket {
    ticketId: string;
    spotId: string;
    issueTime: Date;
    exitTime?: Date | undefined;
    vehicle: Vehicle;

    constructor(ticketId: string, spotId: string, vehicle: Vehicle) {
        this.ticketId = ticketId;
        this.spotId = spotId;
        this.issueTime = new Date();
        this.vehicle = vehicle;
    }

}

export { ParkingTicket };