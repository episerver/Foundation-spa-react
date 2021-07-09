import React, { useState, useRef, useEffect } from 'react';

/**
 * Helper hook to that creates a boolean visibility state and forces visibility to false when
 * the user clicks outside of the component.
 * 
 * @see https://www.cluemediator.com/detect-click-outside-a-react-component-using-react-hooks
 * @param initialIsVisible Initial state of visibilty
 * @returns 
 */
export function useVisible(initialIsVisible : boolean) : [ React.MutableRefObject<any>, boolean, React.Dispatch<React.SetStateAction<boolean>>] {
    const [isVisible, setIsVisible] = useState(initialIsVisible);
    const ref = useRef(null);
   
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsVisible(false);
      }
    };
   
    useEffect(() => {
      try {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
      } catch (e) {
        // No document, or event listener capabilty
      }
    }, []);
   
    return [ ref, isVisible, setIsVisible ];
}

export default useVisible;