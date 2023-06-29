"use client";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Fragment,
  Suspense,
} from "react";
import Link from "next/link";
import Loading from "./loading";
import Input from "@/components/Input";

const FilterDataCallback = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterData = useCallback(
    (searchTerm) => {
      return data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [data]
  );

  const filteredData = useMemo(
    () => filterData(searchTerm),
    [data, searchTerm]
  );

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <div>
      <div className="py-5 bg-gray-100">
        <div className="container mx-auto">
          <Input value={searchTerm} onChange={handleSearch} />
        </div>
      </div>
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
        {filteredData.map((item) => (
          <Fragment key={item.id}>
            <Suspense fallback={<Loading />}>
              <CardComponent item={item} />
            </Suspense>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const CardComponent = ({ item }) => {
  const { id, title, body } = item;

  return (
    <div
      key={id}
      className="py-6 px-8 bg-white shadow-lg rounded-lg flex flex-col justify-between"
    >
      <div>
        <span className="text-lg font-medium text-indigo-500">{id}</span>
        <h2 className="text-gray-800 text-xl font-semibold pt-4">{title}</h2>
        <p className="mt-2 text-gray-600">{body}</p>
      </div>
      <Link
        href={`/${id}`}
        className="flex justify-end mt-4 font-medium text-indigo-500"
      >
        See more
      </Link>
    </div>
  );
};

export default FilterDataCallback;
