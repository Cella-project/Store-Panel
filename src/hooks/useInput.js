import { useState, useEffect } from "react";

const useInput = (validateInput, initialValue = '') => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(initialValue !== '');
  const [error, setError] = useState('');

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
    const validation = validateInput(enteredValue);
    setIsValid(validation.isValid);
    setError(validation.error);
  };

  useEffect(() => {
    if (isTouched) {
      inputBlurHandler();
    }
  });

  const reset = () => {
    setEnteredValue(initialValue);
    setIsTouched(false);
    setIsValid(initialValue !== '');
    setError('');
  };

  useEffect(() => {
    setIsValid(initialValue !== '');
    setError('');
  }, [initialValue]);

  return {
    value: enteredValue,
    isValid,
    error,
    isTouched,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
