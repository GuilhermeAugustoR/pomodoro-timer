import React from "react";
import "./App.css";
import Settings from "./components/Settings";
import Timer from "./components/Timer";
import SettingsContext from "./context/SettingsContext";

function App() {
  const [isSettings, setIsSettings] = React.useState<boolean>(false);
  const [workMinutes, setWorkMinutes] = React.useState<number>(30);
  const [breakMinutes, setBreakMinutes] = React.useState<number>(10);

  return (
    <>
      <SettingsContext.Provider
        value={{
          isSettings,
          setIsSettings,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
        }}
      >
        {isSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </>
  );
}

export default App;
