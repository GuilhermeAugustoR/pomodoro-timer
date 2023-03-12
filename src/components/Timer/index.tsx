import React, { useContext } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SettingsContext from "../../context/SettingsContext";
import PauseButton from "../PauseButton";
import PlayButton from "../PlayButton";
import SettingsButton from "../SettingButton";
import ReactHowler from "react-howler";
import "./styles.css";

const Timer = () => {
  const settingsInfo: any = useContext(SettingsContext);

  const [isPaused, setIsPaused] = React.useState(true);
  const [mode, setMode] = React.useState("work");
  const [secondsLeft, setSecondsLeft] = React.useState(0);
  const [percentage, setPercentage] = React.useState(0);

  const secondsLeftRef = React.useRef(secondsLeft);
  const isPausedRef = React.useRef(isPaused);
  const modeRef = React.useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  React.useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;

  const minutes = Math.floor(secondsLeft / 60);
  let seconds: number | string = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  React.useEffect(() => {
    setPercentage(Math.round((secondsLeft / totalSeconds) * 100));
  }, [secondsLeft, totalSeconds, percentage]);

  return (
    <div>
      <ReactHowler
        src={require("../../assets/notification.mp3")}
        playing={mode === "work" && percentage === 0}
      />

      <ReactHowler
        src={require("../../assets/notification.mp3")}
        playing={mode === "break" && percentage === 0}
      />

      <div className="progressBar">
        <CircularProgressbar
          value={percentage}
          text={minutes + ":" + seconds}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: "#373d49",
            textColor: "#fff",
            pathColor: mode === "work" ? "#1C82AD" : "#4E9F3D",
            trailColor: "transparent",
          })}
        />
      </div>

      <div className="play-button">
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div className="setting-button">
        <SettingsButton onClick={() => settingsInfo.setIsSettings(true)} />
      </div>
    </div>
  );
};

export default Timer;
