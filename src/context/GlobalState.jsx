import { useReducer, createContext, useEffect } from "react";
import AppReducer from './AppReducer'

const initialState = {
  transactions: []
};

// localStorage'dan veri okuma
const loadTransactions = () => {
  const savedTransactions = localStorage.getItem('transactions');
  if (savedTransactions) {
    return JSON.parse(savedTransactions); // localStorage'dan veriyi JSON formatında alıyoruz
  } else {
    return [
      { id: 1, text: 'Flower', amount: -20 }
    ];
  }
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, { transactions: loadTransactions() });

  // localStorage'a veri kaydetme işlemi
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions)); // transactions'ı kaydediyoruz
  }, [state.transactions]); // transactions değiştiğinde çalışır

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  return (
    <GlobalContext.Provider value={{ transactions: state.transactions, deleteTransaction, addTransaction }}>
      {children}
    </GlobalContext.Provider>
  );
};
