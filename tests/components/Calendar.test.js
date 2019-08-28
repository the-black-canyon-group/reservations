/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { shallow /* , mount, render */ } from 'enzyme';
import axios from 'axios';
import Day from '../../client/Components/Day';
import Month from '../../client/Components/Month';
import BasicCalendar from '../../client/Components/BasicCalendar';
import GuestDropdown from '../../client/Components/GuestDropdown';
import GuestButton from '../../client/Components/GuestButton';
import ReservationCosts from '../../client/Components/ReservationCosts';

jest.mock('axios');

describe('Day', () => {
  const dayInstance = {
    number: '25',
    valid: true,
    style: {},
  };

  it('should render day component with date as inner html', () => {
    const { number, valid, style } = dayInstance;
    const wrapper = shallow(<Day number={number} valid={valid} style={style} dateClickHandler={() => {}} handleMouseOverDate={() => {}} isCheckoutDate={false} isCheckinDate type="checkin" />);
    style.textDecoration = 'none';
    style.color = 'black';
    style.boder = 'solid lightgrey';

    expect(
      wrapper.containsMatchingElement(<div>25</div>),
    ).toBe(true);
  });

  it('should render day component with checkout day as true', () => {
    const { number, valid, style } = dayInstance;
    const wrapper = shallow(<Day number={number} valid={valid} style={style} dateClickHandler={() => {}} handleMouseOverDate={() => {}} isCheckoutDate isCheckinDate={false} type="checkin" />);
    style.textDecoration = 'none';
    style.color = 'black';
    style.boder = 'solid lightgrey';

    expect(
      wrapper.containsMatchingElement(<div>25</div>),
    ).toBe(true);
  });

  it('should render day with no number', () => {
    const { valid, style } = dayInstance;
    const wrapper = shallow(<Day number="" valid={valid} style={style} dateClickHandler={() => {}} handleMouseOverDate={() => {}} isCheckoutDate isCheckinDate={false} type="checkout" />);
    style.textDecoration = 'none';
    style.color = 'black';
    style.boder = 'solid lightgrey';
    expect(wrapper.html().toString() === '<td style="text-decoration:none;color:white;background-color:white;border:none;pointer-events:" class="hoverable"><div role="button" style="height:100%;display:flex;align-items:center;justify-content:center" tabindex="0"></div></td>').toBe(true);
  });

  it('should render day with no number', () => {
    const { style } = dayInstance;
    const wrapper = shallow(<Day number="" valid={false} style={style} dateClickHandler={() => {}} handleMouseOverDate={() => {}} isCheckoutDate isCheckinDate={false} type="checkout" />);
    style.textDecoration = 'none';
    style.color = 'black';
    style.boder = 'solid lightgrey';
    expect(wrapper.html().toString() === '<td style="text-decoration:none;color:white;background-color:white;border:none;pointer-events:none" class=""><div role="button" style="height:100%;display:flex;align-items:center;justify-content:center" tabindex="0"></div></td>').toBe(true);
  });
});

describe('Month', () => {
  const monthInstance = {
    calendar: [[{ number: '1', valid: true }, { number: '2', valid: true }, { number: '3', valid: true }]],
    type: 'checkin',
    monthName: 'January',
    month: 1,
    year: 2019,
    checkinDate: {
      year: 2019,
      month: 1,
      day: 1,
    },
    checkoutDate: {
      year: null,
      month: null,
      day: null,
    },
  };

  it('should render month component', () => {
    const {
      calendar, type, monthName, month, year, checkinDate, checkoutDate,
    } = monthInstance;

    const wrapper = shallow(<Month calendar={calendar} type={type} monthName={monthName} month={month} year={year} checkinDate={checkinDate} checkoutDate={checkoutDate} prev={() => {}} next={() => {}} dateClickHandler={() => {}} handleMouseOverDate={() => {}} isCheckoutDate={false} isCheckinDate={false} isPopup clearDates={() => {}} setDate={() => {}} />);
    expect(wrapper.find(Day).length).toBe(3);
  });

  it('checkinDate check works', () => {
    const {
      calendar, type, monthName, month, year, checkoutDate, checkinDate,
    } = monthInstance;

    const wrapper = shallow(<Month calendar={calendar} type={type} monthName={monthName} month={month} year={year} checkinDate={checkinDate} checkoutDate={checkoutDate} prev={() => {}} next={() => {}} dateClickHandler={() => {}} handleMouseOverDate={() => {}} isCheckoutDate={false} isCheckinDate={false} isPopup clearDates={() => {}} setDate={() => {}} />);
    expect(wrapper.find(Day).length).toBe(3);
  });
});

describe('BasicCalendar', () => {
  const basicCalendarInstance = {
    year: 2019,
    month: 7,
    homestayId: 1,
    checkinDate: {
      year: null,
      month: null,
      day: null,
    },
    checkoutDate: {
      year: null,
      month: null,
      day: null,
    },
  };

  it('should render month component for check-in', () => {
    const {
      month, homestayId, checkinDate, checkoutDate,
    } = basicCalendarInstance;

    const currentDate = new Date();
    const year = currentDate.getFullYear();

    axios.get.mockImplementation(() => Promise.resolve({ data: { reservations: [] } }));

    const wrapper = shallow(<BasicCalendar year={year} month={month} homestayId={homestayId} type="checkin" isPopup clearDates={() => {}} setDate={() => {}} checkinDate={checkinDate} checkoutDate={checkoutDate} />);
    expect(wrapper.find(Month).length).toBe(1);
  });

  it('dates should be valid if it does not have reservation', async () => {
    const {
      month, homestayId, checkinDate, checkoutDate,
    } = basicCalendarInstance;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    axios.get.mockImplementation(() => Promise.resolve({ data: { reservations: [] } }));
    const wrapper = await shallow(<BasicCalendar year={year + 1} month={month} homestayId={homestayId} type="checkin" isPopup clearDates={() => {}} setDate={() => {}} checkinDate={checkinDate} checkoutDate={checkoutDate} />);
    expect(wrapper.instance().state.calendar[1][1].valid).toBe(true);
  });

  it('dates should not be valid if it does have reservation', () => {
    const {
      month, homestayId,
    } = basicCalendarInstance;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    axios.get.mockImplementation(() => Promise.resolve({ data: { reservations: [] } }));
    const wrapper = shallow(<BasicCalendar year={year - 1} month={month} homestayId={homestayId} type="checkin" isPopup clearDates={() => {}} setDate={() => {}} checkinDate={{ day: 1, month: 1, year: 2019 }} checkoutDate={{ day: 3, month: 1, year: 2019 }} />);
    expect(wrapper.instance().state.calendar[1][1].valid).toBe(false);
  });

  it('next month button brings up next month', async () => {
    const {
      homestayId, checkinDate, checkoutDate,
    } = basicCalendarInstance;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    axios.get.mockImplementation(() => Promise.resolve({ data: { reservations: [] } }));
    const wrapper = shallow(<BasicCalendar year={year} month={11} homestayId={homestayId} type="checkin" isPopup clearDates={() => {}} setDate={() => {}} checkinDate={checkinDate} checkoutDate={checkoutDate} />);
    await wrapper.instance().nextMonth();
    expect(wrapper.instance().state.month).toBe(0);
  });

  it('next month button brings up next month', async () => {
    const {
      homestayId, checkinDate, checkoutDate,
    } = basicCalendarInstance;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    axios.get.mockImplementation(() => Promise.resolve({ data: { reservations: [] } }));
    const wrapper = shallow(<BasicCalendar year={year - 1} month={0} homestayId={homestayId} type="checkin" isPopup clearDates={() => {}} setDate={() => {}} checkinDate={checkinDate} checkoutDate={checkoutDate} />);
    await wrapper.instance().prevMonth();
    expect(wrapper.instance().state.month).toBe(11);
  });

  it('next month button brings up prev month', async () => {
    const {
      month, homestayId, checkinDate, checkoutDate,
    } = basicCalendarInstance;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    axios.get.mockImplementation(() => Promise.resolve({ data: { reservations: [] } }));
    const wrapper = shallow(<BasicCalendar year={year - 1} month={month} homestayId={homestayId} type="checkin" isPopup clearDates={() => {}} setDate={() => {}} checkinDate={checkinDate} checkoutDate={checkoutDate} />);
    await wrapper.instance().prevMonth();
    expect(wrapper.instance().state.month).toBe(6);
  });

  it('prev month button brings up prev month', async () => {
    const {
      month, homestayId, checkinDate, checkoutDate,
    } = basicCalendarInstance;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    axios.get.mockImplementation(() => Promise.resolve({ data: { reservations: [] } }));
    const wrapper = await shallow(<BasicCalendar year={year - 1} month={month} homestayId={homestayId} type="checkout" isPopup clearDates={() => {}} setDate={() => {}} checkinDate={checkinDate} checkoutDate={checkoutDate} />);
    expect(wrapper.instance().props.type).toBe('checkout');
  });
});

describe('GuestDropdown', () => {
  const guestDropdownInstance = {
    maxGuests: 3,
    guestCount: 1,
    infantCount: 0,
    childrenCount: 0,
    adultCount: 0,
    updateGuestCount: () => {},
    toggleGuestDropDown: () => {},
  };

  it('Guest Dropdown Menu renders', () => {
    const {
      guestCount, infantCount, childrenCount, adultCount, updateGuestCount, toggleGuestDropDown,
    } = guestDropdownInstance;
    const wrapper = shallow(<GuestDropdown maxGuests={3} guestCount={guestCount} infantCount={infantCount} childrenCount={childrenCount} adultCount={adultCount} updateGuestCount={updateGuestCount} toggleGuestDropDown={toggleGuestDropDown} />);
    expect(wrapper.containsMatchingElement(<div>Close</div>)).toBe(true);
  });

  it('Guest Dropdown Menu with one of each guest type renders', () => {
    const {
      updateGuestCount, toggleGuestDropDown,
    } = guestDropdownInstance;
    const wrapper = shallow(<GuestDropdown maxGuests={3} guestCount={3} infantCount={1} childrenCount={1} adultCount={1} updateGuestCount={updateGuestCount} toggleGuestDropDown={toggleGuestDropDown} />);
    expect(wrapper.containsMatchingElement(<div>Close</div>)).toBe(true);
  });

  it('Add buttons disabled if over limit for adults', () => {
    const {
      updateGuestCount, toggleGuestDropDown,
    } = guestDropdownInstance;
    const wrapper = shallow(<GuestDropdown maxGuests={3} guestCount={4} infantCount={0} childrenCount={2} adultCount={2} updateGuestCount={updateGuestCount} toggleGuestDropDown={toggleGuestDropDown} />);
    wrapper.instance().updateCounts(1, 'adult');
    expect(wrapper.instance().state.guestCount > 1).toBe(true);
  });

  it('Add buttons disabled if over limit for adults', () => {
    const {
      updateGuestCount, toggleGuestDropDown,
    } = guestDropdownInstance;
    const wrapper = shallow(<GuestDropdown maxGuests={3} guestCount={4} infantCount={0} childrenCount={2} adultCount={2} updateGuestCount={updateGuestCount} toggleGuestDropDown={toggleGuestDropDown} />);
    wrapper.instance().updateCounts(1, 'children');
    expect(wrapper.instance().state.guestCount > 1).toBe(true);
  });
});

describe('GuestButton', () => {
  const guestButtonInstance = {
    updateCounts: () => {},
    personType: 'adult',
  };

  it('Guest Button add renders', () => {
    const { updateCounts, personType } = guestButtonInstance;
    const wrapper = shallow(<GuestButton type="add" updateCounts={updateCounts} personType={personType} />);
    expect(wrapper.containsMatchingElement(<rect height="2" rx="1" width="12" x="6" y="11" />)).toBe(true);
  });

  it('Guest Button subtract renders', () => {
    const { updateCounts, personType } = guestButtonInstance;
    const wrapper = shallow(<GuestButton type="subtract" updateCounts={updateCounts} personType={personType} />);
    expect(wrapper.containsMatchingElement(<rect height="2" rx="1" width="12" x="6" y="11" />)).toBe(true);
  });

  it('Guest Button update counts button works', () => {
    const { personType } = guestButtonInstance;
    const mockCallBack = jest.fn();
    const wrapper = shallow(<GuestButton type="add" updateCounts={mockCallBack} personType={personType} />);
    wrapper.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

describe('ReservationCosts', () => {
  it('Render ReservationCosts component', () => {
    const cleaningFee = 10;
    const wrapper = shallow(<ReservationCosts cleaningFee={cleaningFee} occupancyFee={20} serviceFee={30} price={40} checkinDate={{ day: 1, month: 2, year: 2019 }} checkoutDate={{ day: 3, month: 2, year: 2019 }} />);
    expect(wrapper.containsMatchingElement(<span>{`$${cleaningFee}`}</span>)).toBe(true);
  });
});
