const firstBadversion = (n: number): number => {
    let left = 1;
    let right = n;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (isBadVersion(mid)) {
            right = mid; // The first bad version is at mid or before
        } else {
            left = mid + 1; // The first bad version is after mid
        }
    }

    return left; // left should be the first bad version
}

const isBadVersion = (version: number): boolean => {
    // This is a placeholder for the actual implementation.
    // In a real scenario, this function would be provided.
    return version >= 4; // Example: versions 4 and above are bad
}

export default firstBadversion;