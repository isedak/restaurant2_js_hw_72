import { useEffect, useState } from "react"
import { Dimensions } from "react-native"

const useOrientation = () => {
    const [screenOrientation, setScreenOrientation] = useState(Dimensions.get('screen'));
    
    const rotate = (result) => {
        setScreenOrientation(result.screen);
    };

    useEffect(() => {        
        Dimensions.addEventListener('change', rotate);
    }, []);

    return {
        ...screenOrientation,
        isPortrait: screenOrientation.height > screenOrientation.width
    };
};

export default useOrientation;