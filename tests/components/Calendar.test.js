/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Day from '../../client/Components/Day';
import Month from '../../client/Components/Month';
import BasicCalendar from '../../client/Components/BasicCalendar';

describe('Day', () => {
  const dayInstance = {
    number: '2019',
    valid: true,
    style: {},
  };

  it('should render day component', () => {
    const { number, valid, style } = dayInstance;
    const wrapper = shallow(<Day number={number} valid={valid} style={style} />);

    style.textDecoration = 'none';
    style.color = 'black';
    style.boder = 'solid lightgrey';

    expect(
      wrapper.containsMatchingElement(<td style={style} className="hoverable">{`${number}`}</td>),
    ).toBe(true);
  });
});

describe('Month', () => {
  const monthInstance = {
    calendar: [[{ number: '1', valid: true }]],
  };

  it('should render month component', () => {
    const { calendar } = monthInstance;
    const wrapper = shallow(<Month calendar={calendar} />);

    expect(wrapper.find(Day).length).toBe(1);
  });
});

describe('BasicCalendar', () => {
  const basicCalendarInstance = {
    year: 2019,
    month: 7,
  };

  it('should render month component', () => {
    const { year, month } = basicCalendarInstance;
    const wrapper = shallow(<BasicCalendar year={year} month={month} />);

    expect(wrapper.find(Month).length).toBe(1);
  });
});
