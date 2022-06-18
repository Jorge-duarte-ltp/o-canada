import React, { useEffect, useState } from 'react'

const initBeforeUnLoad = (showExitPrompt) => {
    window.onbeforeunload = (event) => {
        if (showExitPrompt) {
            const e = event || window.event;
            e.preventDefault();
            if (e) {
                e.returnValue = '';
            }
            return '';
        }
    };
};

const useExitPrompt = (bool) => {

    const [showExitPrompt, setShowPrompt] = useState(bool);

    window.onload = function () {
        initBeforeUnLoad(showExitPrompt);
    }

    useEffect(() => {
        initBeforeUnLoad(showExitPrompt);
    }, [showExitPrompt])

    return [showExitPrompt, setShowPrompt];
}



export default useExitPrompt;