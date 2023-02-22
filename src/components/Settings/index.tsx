import { useContext } from "react";
import "./styles.css";
import ReactSlider from "react-slider";
import SettingsContext from "../../context/SettingsContext";
import BackButton from "../BackButton";

function Settings() {
  const settingsInfo: any = useContext(SettingsContext);

  return (
    <div className="container">
      <label>Estudar: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.workMinutes}
        onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>Pausar: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className={"slider green"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.breakMinutes}
        onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <div className="container-button">
        <BackButton onClick={() => settingsInfo.setIsSettings(false)} />
      </div>
    </div>
  );
}

export default Settings;
