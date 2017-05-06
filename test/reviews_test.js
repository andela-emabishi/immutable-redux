const deepFreeze = require('deep-freeze');
const assert = require('assert');
import {expect} from 'chai';
// const chai = require('chai');
// const should = chai.should();


import reviews from '../reducers/es5/reviews';
// import reviews from '../reducers/immutableJS/reviews';

describe('Review reducer tests', () => {
  it('ADD_REVIEW_TESTS', () => {
    it('Should return a new state object when adding a review', () => {
      const state = [];
      const action = {
        type: 'ADD_REVIEW',
        id: 1,
        reviewer: 'Gandalf',
        text: 'Not all those who wander are lost.',
        rating: 4,
        flag: false
      }
      const newState = [
        {
          id: 1,
          reviewer: 'Gandalf',
          text: 'Not all those who wander are lost.',
          rating: 4,
          flag: false
        }
      ]
      deepFreeze(state);
      expect(reviews(state, action)).to.deep.equal(newState);
      expect(reviews(state, action)).to.eql(newState); // shape of objects should be the same - loose equality
      expect(reviews(state, action)).to.not.equal(newState); // different variables, different memory locations
    });
  });

  it('Should append the added review object to the new state object', () => {
      
  });
})