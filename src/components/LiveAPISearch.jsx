import React, { useEffect, useState } from "react";

function LiveAPISearch() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

  useEffect(() => {
    if (!search) {
      setUsers([]);
       setError("");
      return;
    }

    const handler = setTimeout(() => {
      setLoading(true);

      // ✅ In a real-world API
      // If the backend supports queries, you’d write something like:

      // fetch(`https://api.example.com/users?search=${search}`)
      //   .then(res => res.json())
      //   .then(data => setUsers(data));

      // Fetch users whose names include the search
  
      fetch(`https://jsonplaceholder.typicode.com/users`)
        .then((res) => res.json())
        .then((data) => {
          // Filter API results client-side (example API doesn't support query)
          const filtered = data.filter((u) =>
            u.name.toLowerCase().includes(search.toLowerCase())
          );

          if (filtered.length === 0) {
            setError("No results found ❌");
          } else {
            setError("");
          }

          setUsers(filtered);
          setLoading(false);
        })
          .catch(() => {
          setError("Something went wrong while fetching data ❌");
          setLoading(false);
        });
    }, 500); //debounce 500ms

    return () => clearTimeout(handler); //cancel previous call if user types again
  }, [search]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-3xl mb-4 text-center font-bold">Debounced API Search</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      {loading && <p>Loading...</p>}
     {error && <p className="text-red-500 text-xl">{error}</p>}
      <ul>
        {users.map((u) => (
          <li key={u.id} className="text-xl">
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LiveAPISearch;
