import ThermostatIcon from "@mui/icons-material/DeviceThermostat";

interface TempWeatherIconProps {
  tempK: number;
}

export const TempWeatherIcon = ({ tempK }: TempWeatherIconProps) => {

  const getTempColor = (tempK: number) => {
    if (tempK <= 260) return "#00f";
    if (tempK <= 273) return "#3399ff";
    if (tempK <= 288) return "#66ccff";
    if (tempK <= 295) return "#ffcc00";
    if (tempK <= 310) return "#ff5733";
    return "#ff0000";
  };

  return (
    <ThermostatIcon style={{ fontSize: "2rem", color: getTempColor(tempK) }} />
  );
};

