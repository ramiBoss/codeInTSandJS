/**
 * Selects the maximum number of non-overlapping activities based on their start and finish times.
 * 
 * This function implements a greedy algorithm that sorts activities by finish time
 * and selects the next compatible activity whose start time is greater than or equal
 * to the finish time of the last selected activity.
 * 
 * @param startTimes - An array of activity start times.
 * @param finishTimes - An array of activity finish times corresponding by index to `startTimes`.
 * 
 * @returns An array of selected non-overlapping activities, each represented as an object
 *          with `start` and `finish` properties.
 * 
 * @throws Will throw an error if the input arrays are not of equal length.
 * 
 * @example
 * const start = [1, 3, 0, 5, 8, 5];
 * const finish = [2, 4, 6, 7, 9, 9];
 * const result = ActivitySelection(start, finish);
 * // result: [
 * //   { start: 1, finish: 2 },
 * //   { start: 3, finish: 4 },
 * //   { start: 5, finish: 7 },
 * //   { start: 8, finish: 9 }
 * // ]
 */
export const ActivitySelection = (
  startTimes: number[],
  finishTimes: number[]
): { start: number; finish: number }[] => {
  if (startTimes.length !== finishTimes.length) {
    throw new Error("Start and finish times arrays must have the same length.");
  }

  const activities = startTimes.map((start, index) => ({
    start,
    finish: finishTimes[index],
  }));

  // Sort activities by their finish times (ascending)
  // @ts-ignore 
  activities.sort((a, b) => a.finish as number - b.finish as number);

  const selectedActivities: { start: number; finish: number }[] = [];
  let lastFinishTime = -1;
  
  for (const activity of activities) {
    if (activity.start >= lastFinishTime) {
      // @ts-ignore
      selectedActivities.push(activity);
      // @ts-ignore
      lastFinishTime = activity.finish as number;
    }
  }

  return selectedActivities;
};
