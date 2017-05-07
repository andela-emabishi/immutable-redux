import { expect } from 'chai';
import { List, Map } from 'immutable';

import reviews from '../src/reducers/immutableJS/reviews';

describe('With immutable Review reducer tests', () => {
  const state = List([
    { id: 1, item_id: '200', reviewer: 'Bombadill', text: 'It needs a song really', rating: 4, flag: false },
    { id: 2, item_id: '200', reviewer: 'Strider', text: `That's not what happened!`, rating: 3, flag: false },
    { id: 3, item_id: '200', reviewer: 'Gollum', text: `Preciousss`, rating: 1, flag: true },
  ]);

  describe('ADD_REVIEW TESTS', () => {
    const action = {
      type: 'ADD_REVIEW',
      id: 4,
      item_id: '200',
      reviewer: 'Gandalf',
      text: 'Not all those who wander are lost.',
      rating: 4,
      flag: false
    };
    it('Should return a new state object when adding a review', () => {
      expect(state.size).to.equal(3);
    });

    it('Should append the added review object to the new state object', () => {
      const newState = reviews(state, action);
      expect(reviews(state, action).size).to.equal(4);
    });
  });

  describe('DELETE_REVIEW TESTS', () => {
    const action = { type: 'DELETE_REVIEW', id: 3, item_id: '200' };
    it('Should return a new state object when deleting a review', () => {
      expect(state.size).to.equal(3);
    });

    it('Should return a state object without the deleted review', () => {
      const newState = reviews(state,action);
      expect(reviews(state, action).size).to.equal(2);
      expect(newState.indexOf({ id: 3, item_id: '200', reviewer: 'Gollum', text: `Preciousss`, rating: 1, flag: true })).to.equal(-1);
    });
  });

  describe('FLAG_REVIEW TESTS', () => {
    const action = { type: 'FLAG_REVIEW', id: 2, item_id: '200', flag: true };
    const newState = reviews(state, action);
    it('Should return a new state object', () => {
      expect(newState).not.to.equal(state);
    });
    it('Should return a state object with the specified review\'s flag property changed', () => {
      expect(newState.get(1).flag).to.equal(true);
    });
  });

  describe('RATE_REVIEW TESTS', () => {
    const action = { type: 'RATE_REVIEW', id: 1, item_id: '200', rating: 5 }
    const newState = reviews(state, action);
    it('Should return a new state object', () => {
      expect(newState).to.not.equal(state); // will assert that objects are not in the same slice of memeory
    });
    it('Should return a state object with the specified review with the correct rating', () => {
      expect(newState.get(0).rating).to.equal(5);
    });
  });
});
