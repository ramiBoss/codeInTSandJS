/**
 * Course Schedule
 * 
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses-1. 
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
 * 
 * Return true if you can finish all courses. Otherwise, return false.
 * 
 * Example 1:
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: true 0-1
 * 
 * Example 2:
 * Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
 * Output: false
 * 
 * Example 3:
 * Input: numCourses = 3, prerequisites = [[0,1],[0,2],[1,2]]
 * Output: true 2-1-0
 * 
 * Example 4:
 * Input: numCourses = 4, prerequisites = [[0,1],[1,2],[2,3],[3,1]]
 * Output: false
 * 
 * Example 5:
 * Input: numCourses = 5, prerequisites = [[0,1],[0,2],[1,3],[1,4],[3,4]]
 * Output: true 4-3-1-2-0
 */


function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const graph: Map<number, number[]> = new Map();
    const visited: Set<number> = new Set();
    const recStack: Set<number> = new Set();

    // Build the graph
    for (const [course, prereq] of prerequisites) {
        if (!graph.has(prereq!)) {
            graph.set(prereq!, []);
        }
        graph.get(prereq!)!.push(course!);
    }

    // DFS to detect cycles
    function hasCycle(course: number): boolean {
        if (recStack.has(course)) {
            return true; // Cycle detected
        }
        if (visited.has(course)) {
            return false; // Already processed
        }

        visited.add(course);
        recStack.add(course);

        const neighbors = graph.get(course) || [];
        for (const neighbor of neighbors) {
            if (hasCycle(neighbor)) {
                return true;
            }
        }

        recStack.delete(course);
        return false;
    }

    // Check each course for cycles
    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i)) {
            return false; // Cycle found, cannot finish all courses
        }
    }

    return true; // No cycles found, can finish all courses
}

// Let's do a dry run of the above function
const numCourses = 4;
const prerequisites = [[0, 1], [1, 2], [2, 3], [3, 1]];
console.log(canFinish(numCourses, prerequisites)); // Output: false
// Expected: false due to cycle 1 -> 2 -> 3 -> 1
// Dry Run Explanation:
// 1. Build the graph:
//    1 -> [0, 3]
//    2 -> [1]
//    3 -> [2]
// 2. Start DFS from course 0:
//    - Visit 0, mark visited and add to recStack
//    - Move to neighbor 1
//      - Visit 1, mark visited and add to recStack
//      - Move to neighbor 2
//        - Visit 2, mark visited and add to recStack
//        - Move to neighbor 3
//          - Visit 3, mark visited and add to recStack
//          - Move to neighbor 1
//            - 1 is already in recStack -> cycle detected
// 3. Return false as a cycle is found.

// Another approach using Kahn's Algorithm (BFS for Topological Sort)
function canFinishKahn(numCourses: number, prerequisites: number[][]): boolean {
    const inDegree: number[] = Array(numCourses).fill(0);
    const graph: Map<number, number[]> = new Map();

    // Build the graph and in-degree array
    for (const [course, prereq] of prerequisites) {
        inDegree[course!]!++;
        if (!graph.has(prereq!)) {
            graph.set(prereq!, []);
        }
        graph.get(prereq!)!.push(course!);
    }

    const queue: number[] = [];

    // Enqueue all courses with in-degree of 0
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    let completedCourses = 0;

    while (queue.length > 0) {
        const course = queue.shift()!;
        completedCourses++;

        const neighbors = graph.get(course) || [];
        for (const neighbor of neighbors) {
            inDegree[neighbor]!--;
            if (inDegree[neighbor!] === 0) {
                queue.push(neighbor!);
            }
        }
    }

    return completedCourses === numCourses;
}

export { canFinish, canFinishKahn };