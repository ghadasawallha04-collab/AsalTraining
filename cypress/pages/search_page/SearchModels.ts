export interface Occupancy{
  adults:number
  children:number[]
  rooms:number
}
export interface SearchOptions{
 destination: string
 checkInDate: Date
 checkOutDate: Date
 occupancy: Occupancy
}