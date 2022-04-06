import React, { FC, useState } from 'react';

import { OrderTypes } from '../../types/order';
import OrderByProps from '../../types/orderby';
import './index.css';

const Job: FC<OrderByProps> = ({ toggleOrder }) => {
  const [selected, setSelected] = useState(OrderTypes.Random);

  const onOrderChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (
      e.target.value === OrderTypes.Random ||
      e.target.value === OrderTypes.Priority
    ) {
      setSelected(e.target.value);
      toggleOrder(e.target.value);
    }
  };
  return (
    <div className='App-sortby'>
      <span className='App-sortby__label'>Sort by: </span>
      <select
        className='App-sortby__select'
        id='filtersortby'
        onChange={onOrderChange}
        value={selected}
      >
        <option value={OrderTypes.Random}>Random</option>
        <option value={OrderTypes.Priority}>By Priority</option>
      </select>
    </div>
  );
};

export default Job;
