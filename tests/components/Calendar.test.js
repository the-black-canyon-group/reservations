/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { shallow /* , mount, render */ } from 'enzyme';
import axios from 'axios';
import Day from '../../client/Components/Day';
import Month from '../../client/Components/Month';
import BasicCalendar from '../../client/Components/BasicCalendar';

jest.mock('axios');

describe('Day', () => {
  const dayInstance = {
    number: '2019',
    valid: true,
    style: {},
  };

  it('should render day component', () => {
    const { number, valid, style } = dayInstance;
    console.log('SHALLOW:', Day);
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
    homestayId: 1,
  };

  it('should render month component for check-in', () => {
    const {
      month, homestayId,
    } = basicCalendarInstance;

    const currentDate = new Date();
    const year = currentDate.getFullYear();

    axios.get.mockImplementation(() => Promise.resolve({ data: [{ day: 31 }] }));

    const wrapper = shallow(<BasicCalendar year={year} month={month} homestayId={homestayId} type="checkin" />);
    console.log(wrapper.instance());
    expect(wrapper.find(Month).length).toBe(1);
  });

  it('dates should be valid if it does not have reservation', () => {
    const {
      month, homestayId,
    } = basicCalendarInstance;

    const currentDate = new Date();
    const year = currentDate.getFullYear();

    const wrapper = shallow(<BasicCalendar year={year + 1} month={month} homestayId={homestayId} type="checkin" />);
    expect(wrapper.instance().state.calendar[1][1].valid).toBe(true);
  });

  it('dates should not be valid if it does have reservation', () => {
    const {
      month, homestayId,
    } = basicCalendarInstance;

    const currentDate = new Date();
    const year = currentDate.getFullYear();

    const wrapper = shallow(<BasicCalendar year={year - 1} month={month} homestayId={homestayId} type="checkin" />);
    expect(wrapper.instance().state.calendar[1][1].valid).toBe(false);
  });
});
