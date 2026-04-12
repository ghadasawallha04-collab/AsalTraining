import moment from "moment";
/**
 * Returns a random item from a given array.
 * 
 * @template T - Type of array elements
 * @param items - Array of items
 * @returns Random item from the array
 */
export const getRandomItemFromArray=<T>(items:T[]):T=>{
  const randomIndex=Math.floor(Math.random()*items.length);
  return items[randomIndex];
};
/**
 * Generates random check-in and check-out dates based on today's date.
 * 
 * - Check-in: random between 1–30 days from today
 * - Check-out: after check-in by 1–30 days
 * 
 * @returns Object containing formatted dates
 */
export const getRandomDates=()=>{
  const startAfterDays=Math.floor(Math.random()*30)+1;
  const durationDays=Math.floor(Math.random()*30)+1;
  const checkIn=moment().add(startAfterDays,"days");
  const checkOut=checkIn.clone().add(durationDays,"days");
  return {
    checkIn:checkIn.format('YYYY-MM-DD'),
    checkOut:checkOut.format('YYYY-MM-DD')
};
};
/**
 * Generates a random integer between min and max (inclusive).
 * 
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number within range
 */
export const getRandomNumber=(min:number,max:number):number=>{
  return Math.floor(Math.random()*(max-min+1))+min;
};



