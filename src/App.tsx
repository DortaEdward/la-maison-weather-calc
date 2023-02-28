import { useState, useEffect } from "react";
import "./App.css";
import Spinner from "./component/Spinner";
import Weather from "./component/Weather";
import { createClient } from "@supabase/supabase-js";

function App() {
  const [weatherData, setWeatherData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabaseUrl = "https://jwabetvamhrditzxtffd.supabase.co";
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const d = new Date("July 21, 1983 01:15:00");
  let day = d.getDay();
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const { data, error }: any = await supabase.from("weather").select();
      setWeatherData(data[0].weather);
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="bg-neutral-700 w-screen h-screen relative flex items-center justify-center overflow-hidden">
      <div
        className={`w-[390px] h-full bg-gradient-to-bl from-sky-400 to-sky-200 rounded overflow-auto flex flex-col gap-6 px-10 py-6 ${
          isLoading ? "items-center justify-center" : ""
        }`}
      >
        <h1 className="text-2xl text-center font-bold">La Maison Du Chocolat Shipping Weather Forcast</h1>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="">
            {weatherData ? (
              weatherData.map((el: any) => {
                return (
                  <Weather
                    key={el.state}
                    day={weekday[day]}
                    state={el.state}
                    weather={el.weather}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
