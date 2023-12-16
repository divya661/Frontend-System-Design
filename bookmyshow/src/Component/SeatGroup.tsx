import React from 'react';
import './styles.css';

function SeatGroup({groupName,seatRow}:{groupName: string,seatRow:any}) {
  return (
    <div className="seatGroup">
      <label className='seatGroup_label'>
        {groupName}
      </label>
      
    </div>
  );
}

export default SeatGroup;
