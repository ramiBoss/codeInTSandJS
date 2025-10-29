interface ParkingStrategy {
    findSpot(licensePlate: string): string | null;
}

class NearestFirstParkingStrategy implements ParkingStrategy {
    findSpot(licensePlate: string): string | null {
        // Implementation for finding the nearest available spot
        return null; // Placeholder return
    }
}

class BestFitParkingStrategy implements ParkingStrategy {
    findSpot(licensePlate: string): string | null {
        // Implementation for finding the best fit spot
        return null; // Placeholder return
    }
}

class FarthestFirstParkingStrategy implements ParkingStrategy {
    findSpot(licensePlate: string): string | null {
        // Implementation for finding the farthest available spot
        return null; // Placeholder return
    }
}

export { ParkingStrategy, NearestFirstParkingStrategy, BestFitParkingStrategy, FarthestFirstParkingStrategy };