import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initalState = {
  users: [
    {
      id: 1,
      name: 'ola',
      email: 'ola.brown@gmail.com',
    },
  ],
};

const rootReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'GET_USERS_SUCCESS':
      return { users: action.json.users };
  }
  return state;
};

export default function configureStore() {
  const store = createStore(rootReducer, initalState, applyMiddleware(thunk));
  return store;
}
