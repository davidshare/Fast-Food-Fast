import chai from 'chai';
import formattedTime from '../helpers/date';

const { assert } = chai;

describe('Date and time formatter', () => {
  describe('Hours - am or pm', () => {
    it('It should return pm if hours is greater than or equal to 12', () => {
      const dateObj = new Date(2019, 9, 12, 14, 30, 25);
      assert.equal(formattedTime.formattedTime(dateObj), '2:30pm');
    });

    it('It should return am if hours is less than 12', () => {
      const dateObj = new Date(2019, 9, 12, 10, 30, 25);
      assert.equal(formattedTime.formattedTime(dateObj), '10:30am');
    });

    it('It should return 12 hour format', () => {
      const dateObj = new Date(2019, 9, 12, 12, 0, 25);
      assert.equal(formattedTime.formattedTime(dateObj), '12:00pm');
    });
  });

  describe('Minutes', () => {
    it('It should add a trailing zero(0) if minute is less than 10', () => {
      const dateObj = new Date(2019, 9, 12, 14, 9, 25);
      assert.equal(formattedTime.formattedTime(dateObj), '2:09pm');
    });
  });
});
