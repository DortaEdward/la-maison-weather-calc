import { useState, useEffect } from "react";
import "./App.css";
import Spinner from "./component/Spinner";
import Weather from "./component/Weather";
import { createClient } from "@supabase/supabase-js";

function App() {
  const [weatherData, setWeatherData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const supabaseUrl = "https://jwabetvamhrditzxtffd.supabase.co";
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const day = tomorrow.getDay();
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const { data, error }: any = await supabase
        .from("weather")
        .select()
        .limit(1)
        .order("id", { ascending: false });
      setWeatherData(data[0].weather);
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-50 w-screen h-screen relative flex items-center justify-center overflow-hidden">
      <div
        className={`min-w-[390px] w-full h-full  rounded overflow-auto flex flex-col gap-6 px-10 pb-6 relative ${
          isLoading ? "items-center justify-center" : ""
        }`}
      >
        <div className="flex flex-col items-center justify-center sticky top-0 bg-gray-100 pt-6">
          <img
            src="logo.png"
            alt="La Maison Du Chocolat Logo"
            className="h-10 w-16"
          />
          <h1 className="text-2xl text-center font-bold text-[rgb(82,39,26)] drop-shadow-lg">
            La Maison Du Chocolat
          </h1>
          <p className="text-neutral-700 text-lg font-medium drop-shadow-lg">
            Shipping Weather Forcast
          </p>
          <input
            type="text"
            onChange={(e: any) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="my-2 p-2 rounded w-full outline-none border-none"
          />
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-2 w-full">
            {weatherData ? (
              weatherData
                .filter((state: any) =>
                  state.state.toLowerCase().includes(searchTerm?.toLowerCase())
                )
                .map((el: any) => {
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
