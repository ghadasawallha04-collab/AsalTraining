import moment from "moment";
//Get Random item from a given array
export const getRandomItemFromArray=<T>(items:T[]):T=>{
  const randomIndex=Math.floor(Math.random()*items.length);
  return items[randomIndex];
};
//Get Random dates depending on today date
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
//Random Number function generator:
export const getRandomNumber=(min:number,max:number):number=>{
  return Math.floor(Math.random()*(max-min+1))+min;
};



