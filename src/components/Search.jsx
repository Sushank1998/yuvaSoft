import axios from "axios";
import React, { useEffect, useState } from "react";

function Search() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (input.trim() === "") {
      setData([]);
      return;
    }

    const timeFun = setTimeout(() => {
      setLoading(true);
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          const filterData = res.data.filter((item) =>
            item.title.toLowerCase().include().input.toLowerCase()
          );
          setData(filterData);
          setError("");
        })
        .catch((error) => {
          console.log(error);
          setError("faildto get");
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);

    return () => clearTimeout(timeFun);
  },[input]);

  return (
    <div>
      <div className="mt-10">
        <form className="max-w-md mx-auto" >
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        {loading && <p className="text-gray-600 mt-2">Searching...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {data.length > 0 && (
          <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {data.map((item) => (
              <div
                key={item.id}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                {item.title}
              </div>
            ))}
          </div>
        )}

        {!loading && input && data.length === 0 && (
          <p className="text-gray-500 mt-2">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
