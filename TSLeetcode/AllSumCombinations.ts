/**
 * Finds all possible combinations of numbers from a given pool that sum up to the target value.
 * Uses backtracking to generate combinations where each number can be used multiple times.
 * 
 * @param target - The target sum to achieve with combinations
 * @param numsPool - Array of positive numbers to use in combinations
 * @returns Array of arrays containing all valid combinations that sum to target
 * 
 * @example
 * ```typescript
 * allSumCombinations(7, [2,3,4])
 * // Returns: [[2,2,3], [3,4]]
 * ```
 */
const allSumCombinations = (target: number, numsPool: number[]) => {
    const result: number[][] = [];

    const findCombinations = (remTarget: number, currentCombination: number[], startIndex: number) => {
        if(remTarget === 0) {
            result.push([...currentCombination]);
            return;
        }

        for(let i = startIndex; i < numsPool.length; i++) {
            const num = numsPool[i];
            if(num <= remTarget) {
                currentCombination.push(num);
                findCombinations(remTarget - num, currentCombination, i);
                currentCombination.pop();
            }
        }
    }

    findCombinations(target, [], 0);
    return result;
}