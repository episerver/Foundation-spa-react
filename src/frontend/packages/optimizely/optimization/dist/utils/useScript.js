import { useState, useEffect } from 'react';
export const useScript = (url, name) => {
    const [lib, setLib] = useState({});
    useEffect(() => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = () => setLib({ [name]: window[name] });
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [url, name]);
    return lib;
};
export default useScript;
//# sourceMappingURL=useScript.js.map