import { useEffect, useState } from "react";

export function FetchData() {
  const [arr, setArr] = useState([]);
  const [len, setLen] = useState(0);
  const [updatingArr, setUpdatingArr] = useState([]);

  useEffect(() => {
    const filterArr = (obj) => {
      let titleArr = obj.title.split(" ");
      if (titleArr.length > len) return true;
      return false;
    };
    const fetchDataBasedOnLen = async () => {
      const url = "https://jsonplaceholder.typicode.com/todos";
      const options = {
        method: "GET"
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Something Went wrong!");
      }
      const responseJson = await response.json();
      setArr(responseJson);
      setUpdatingArr(arr.filter(filterArr));
    };

    fetchDataBasedOnLen();
  }, [len]);

  return (
    <div>
      <input type="text" onChange={(e) => setLen(e.target.value)} value={len} />
      <div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
          <div style={{ marginLeft: 20 }}>
            <b>UserId</b>
          </div>
          <div style={{ marginLeft: 120 }}>
            <b>Id</b>
          </div>
          <div style={{ marginLeft: 105 }}>
            <b>Title</b>
          </div>
        </div>
        {updatingArr.map((ele) => (
          <div
            key={ele.id}
            style={{ display: "flex", flexDirection: "row", marginTop: 20 }}
          >
            <div style={{ marginLeft: 20, textAlign: "center" }}>
              {ele.userId}
            </div>
            <div style={{ marginLeft: 160 }}>{ele.id}</div>
            <div style={{ marginLeft: 110 }}>{ele.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
