import { useEffect, useState } from "react";

type Props = {
  state: string;
  day: string;
  weather: any;
};

const Weather = ({ state, weather, day }: Props) => {
  const [temp, setTemp] = useState<number>();
  const [ice, setIce] = useState<boolean>(false);
  const coldStyle = "bg-gradient-to-tr from-blue-900 to-blue-500";
  const hotStyle = "bg-gradient-to-tr from-red-900 to-red-500";

  useEffect(() => {
    try {
      const keys = Object.keys(weather);
      const dayIndex = keys.indexOf(day);
      let temp = parseInt(weather[keys[dayIndex]].replace("°", "").slice(0, 2));
      setTemp(temp);
      setIce(temp >= 60);
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);
  
  return (
    <div className="shadow-md w-full p-4  rounded-lg">
      <div className="flex items-end justify-between">
        <div className="flex gap-4 items-end">
          <p className="text-2xl font-bold">{state}</p>

          {temp && (
            <p
              className={`${
                ice ? "text-red-400" : "text-sky-600"
              } font-semibold`}
            >
              {temp > 60 ? "Ice" : "No Ice"}
            </p>
          )}
        </div>
        {temp && (
          <p
            className={`${
              ice ? hotStyle : coldStyle
            } text-6xl text-transparent bg-clip-text`}
          >
            {temp}°F
          </p>
        )}
      </div>
    </div>
  );
};

export default Weather;
