const deepFreeze = require('deep-freeze');
// const assert = require('assert');
import {expect} from 'chai';
// const chai = require('chai');
// const should = chai.should();

import reviews from '../reducers/es5/reviews';
// import reviews from '../reducers/immutableJS/reviews';

describe('Review reducer tests', () => {
  const state = [
    { id: 1, reviewer: 'Bombadill', text: 'It needs a song really', rating: 4, flag: false },
    { id: 2, reviewer: 'Strider', text: `That's not what happened!`, rating: 3, flag: false },
    { id: 3, reviewer: 'Gollum', text: `Preciousss`, rating: 1, flag: true },
  ];
  deepFreeze(state);

  describe('ADD_REVIEW TESTS', () => {
    it('Should return a new state object when adding a review', () => {
      const action = {
        type: 'ADD_REVIEW',
        id: 1,
        reviewer: 'Gandalf',
        text: 'Not all those who wander are lost.',
        rating: 4,
        flag: false
      }
      const newState = [
        { id: 1, reviewer: 'Bombadill', text: 'It needs a song really', rating: 4, flag: false },
        { id: 2, reviewer: 'Strider', text: `That's not what happened!`, rating: 3, flag: false },
        { id: 3, reviewer: 'Gollum', text: `Preciousss`, rating: 1, flag: true },
        { id: 1, reviewer: 'Gandalf', text: 'Not all those who wander are lost.', rating: 4, flag: false }
      ]
      expect(reviews(state, action)).to.deep.equal(newState);
      expect(reviews(state, action)).to.eql(newState); // shape of objects should be the same - loose equality
      expect(reviews(state, action)).to.not.equal(newState); // different variables, different memory locations
    });

    it('Should append the added review object to the new state object', () => {
      const action = {
        type: 'ADD_REVIEW',
        id: 1,
        reviewer: 'Gandalf',
        text: 'Not all those who wander are lost.',
        rating: 4,
        flag: false
      }
      const newState = reviews(state, action);
      expect(newState.length).to.be.above(3);
    });
  });

  describe('DELETE_REVIEW TESTS', () => {
    it('Should return a new state object when deleting a review', () => {
      const action = {
        type: 'DELETE_REVIEW',
        id: 3,
      };
      const newState = [
        { id: 1, reviewer: 'Bombadill', text: 'It needs a song really', rating: 4, flag: false },
        { id: 2, reviewer: 'Strider', text: `That's not what happened!`, rating: 3, flag: false },
      ];
      expect(reviews(state, action)).to.eql(newState);
    });

    it('Should return a state object without the deleted review', () => {
      const action = {
        type: 'DELETE_REVIEW',
        id: 3,
      };
      const newState = [
        { id: 1, reviewer: 'Bombadill', text: 'It needs a song really', rating: 4, flag: false },
        { id: 2, reviewer: 'Strider', text: `That's not what happened!`, rating: 3, flag: false },
      ];
      expect(newState.length).to.equal(2);
      expect(newState.indexOf({ id: 3, reviewer: 'Gollum', text: `Preciousss`, rating: 1, flag: true })).to.equal(-1);
    });
  });

  describe('FLAG_REVIEW TESTS', () => {
    const state = [
      { id: 1, reviewer: 'Bombadill', text: 'It needs a song really', rating: 4, flag: false },
      { id: 2, reviewer: 'Strider', text: `That's not what happened!`, rating: 3, flag: false },
      { id: 3, reviewer: 'Gollum', text: `Preciousss`, rating: 1, flag: true },
    ];
    deepFreeze(state);
    const action = { type: 'FLAG_REVIEW', id: 2, flag: true };
    const newState = reviews(state, action);
    it('Should return a new state object', () => {
      expect(newState).not.to.equal(state);
    });
    it('Should return a state object with the specified review\'s flag property changed', () => {
      expect(newState[1].flag).to.equal(true);
    });
  });

  describe('RATE_REVIEW TESTS', () => {
    const action = { type: 'RATE_REVIEW', id: 1, rating: 5 }
    const newState = reviews(state, action);
    it('Should return a new state object', () => {
      expect(newState).to.not.equal(state); // will assert that objects are not in the same slice of memeory
    });
    it('Should return a state object with the specified review with the correct rating', () => {
      expect(newState[0].rating).to.equal(5);
    });
  });
});
