import { useEffect, useState } from "react";

type Props = {
  state: string;
  day: string;
  weather: any;
};

const Weather = ({ state, weather, day }: Props) => {
  const [temp, setTemp] = useState<number>();
  useEffect(() => {
    try {
      const keys = Object.keys(weather);
      // get index of current day
      const dayIndex = keys.indexOf(day);
      let temp = parseInt(weather[keys[dayIndex]].replace("°", "").slice(0,2));
      setTemp(temp);
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);
  return (
    <div>
      <div className="flex items-end justify-between">
        <div className="flex gap-4 items-end ">
          <p className="text-2xl font-bold">{state}</p>

          {temp && (
            <p
              className={`${
                temp > 60 ? "text-red-400" : "text-sky-600"
              } font-semibold`}
            >
              {temp > 60 ? "Ice" : "No Ice"}
            </p>
          )}
        </div>
        <p className="text-6xl">{temp}°F</p>
      </div>
    </div>
  );
};

export default Weather;
