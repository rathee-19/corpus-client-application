import { useState } from 'react';
export function useStates(initialState) {
    const [state, setState] = useState(initialState);
    const setMergedState = (newState) => setState(prevState => Object.assign({}, prevState, newState));
    return [state, setMergedState];
}
