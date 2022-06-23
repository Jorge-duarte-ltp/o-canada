import { useEffect, useState } from "react";

const initBeforeUnLoad = ({ showExitPrompt, accion }) => {

  window.onbeforeunload = (event) => {

    if (showExitPrompt) {

      const e = event || window.event;

      e.preventDefault();
      
      if (e) {

        accion();

        e.returnValue = "";

      }

      return "";
    }
  }
};

const useExitPrompt = (values) => {
  const [showOnBeforeUnload, setShowOnBeforeUnload] = useState(values);

  window.onload = () => {
    initBeforeUnLoad(showOnBeforeUnload);
  };

  useEffect(() => {
    initBeforeUnLoad(showOnBeforeUnload);
  }, [showOnBeforeUnload]);

  return [showOnBeforeUnload, setShowOnBeforeUnload];
};

export default useExitPrompt;
