import * as React from 'react';
import { Slider } from '@mui/material';

const marks = [
  {
    value: 5,
    label: '5',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 15,
    label: '15',
  },
  {
    value: 30,
    label: '30',
  },
];

const getValue = (value) => {
  const closestMark = marks.reduce((prev, curr) =>
    Math.abs(curr.value - value) < Math.abs(prev.value - value) ? curr : prev
  );
  return closestMark.value;
};

const getValueIndex = (value) => {
    return marks.findIndex(mark => mark.value === value);
};

const valueToIndex = (value) => {
    return marks.findIndex(mark => mark.value === value);
};

const indexToValue = (index) => {
    return marks[index].value;
};


function DiscreteSlider() {
  const [value, setValue] = React.useState(10); 

  const handleChange = (event, newValue) => {
    setValue(getValue(newValue));
  };

  return (
    <Slider
      value={value}
      onChange={handleChange}
      min={5}
      max={30}
      step={null} 
      marks={marks}
      valueLabelDisplay="auto"
      getAriaValueText={(value) => `${value}`}
    />
  );
}

export default DiscreteSlider;