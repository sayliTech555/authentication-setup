import React, { createContext, useState } from 'react';

const FormDataContext = createContext();

const FormDataProvider = ({ children }) => {
  const [formdataStore, setformdataStore] = useState({});

  console.log("formdataStore",formdataStore)
  const value = {
    formdataStore,
    setformdataStore,
  };

  return <FormDataContext.Provider value={value}>{children}</FormDataContext.Provider>;
};

export { FormDataProvider, FormDataContext };
