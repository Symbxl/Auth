import { useReducer, createContext, useContext } from 'react';

const initialState = {
  user: null,
  isAdmin: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
      };
    case 'SIGN_OUT':
      return initialState;
    default:
      return state;
  }
};

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const signIn = (user, isAdmin) => {
    dispatch({ type: 'SIGN_IN', payload: { user, isAdmin } });
  };

  const signOut = () => {
    localStorage.removeItem('jwt');
    dispatch({ type: 'SIGN_OUT' });
  };


  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAdmin: state.isAdmin,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};