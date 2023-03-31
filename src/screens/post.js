import { useEffect, useState } from "react";
import { Get } from "../config/apibasemethods";

function Posts() {
  const [listData, setListData] = useState([]);
  const [loader, setLoader] = useState(false);

  let getdata = () => {
    setLoader(true);
    Get("posts")
      .then((res) => {
        setLoader(false);
        setListData([...res.data]);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      {loader ? (
        <div className="text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
            alt="Loading ..."
          />
        </div>
      ) : listData && listData.length < 1 ? (
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRP9gJwRfimsV5YFbTp39bAItgIuMM4ec_-w&usqp=CAU"
            alt="No Data Found"
          />
        </div>
      ) : listData && listData.length > 0 ? (
        listData.map((x, i) => (
          <div key={i} className="bg-light rounded shadow p-2 mb-3">
            <h1>{x.title}</h1>
            <p>{x.body}</p>
          </div>
        ))
      ) : null}
    </>
  );
}
export default Posts;