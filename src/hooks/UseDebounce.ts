import { useCallback, useRef } from "react";

/**
 * 
 * @param delay Padrão 300ms ou setar o tempo do delay para rodar a função
 * @param notDelayInFirstTime Padrão true ou setar false para ter delay na primeira chamada
 * @returns 
 */
export const useDebounce = (delay = 300, notDelayInFirstTime = true) => {
  const isFirstTime = useRef(notDelayInFirstTime);
  const debouncing = useRef<NodeJS.Timeout>();

  const debounce = useCallback((func: () => void) => {
    if (isFirstTime.current) {
      isFirstTime.current = false;
      func();
    } else {
      if (debouncing.current) {
        clearTimeout(debouncing.current);
      }
      debouncing.current = setTimeout(() => func(), delay);
    }
  }, [delay]);

  return { debounce };
};
