import React from 'react';
import '../styles.css';


interface SeatInterface{
    price:number;
    type:'booked'| 'notBooked',
    color:string,
    onClick:Function,
    id:string
}
function Seat(props:SeatInterface) {
  return (
    <div className="seatGroup" onClick={()=>props.onClick()}>
    </div>
  );
}

export default Seat;
