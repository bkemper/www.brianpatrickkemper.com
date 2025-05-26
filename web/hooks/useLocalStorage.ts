import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

export const useLocalStorage = <T extends string>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const setItemWithEffect = useCallback<Dispatch<SetStateAction<T>>>(
    (next) => {
      if (typeof next === "function") {
        setValue((prevValue) => {
          const nextValue = next(prevValue);
          window.localStorage.setItem(key, nextValue);
          return nextValue;
        });
      } else {
        window.localStorage.setItem(key, next);
        setValue(next);
      }
    },
    [key, setValue]
  );

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key) as T;

    if (storedValue === null) {
      window.localStorage.setItem(key, initialValue); // establish
    } else {
      setValue(storedValue); // hydrate
    }
  }, [initialValue, key, setValue]);

  return [value, setItemWithEffect] as const;
};
