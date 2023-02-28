import { useState } from "react";

const Input = () => {
  const [filter, setFilter] = useState<string>("");
  return (
    <input
      // onChange={(e) => setFilter(e.target.value)}
      type="text"
      className="px-4 py-2 mt-10 mb-5 rounded-lg sticky top-0 z-50 outline-none text-2xl"
      placeholder="Search for State"
    />
  );
};
