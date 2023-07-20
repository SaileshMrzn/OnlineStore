import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Items from "./Items";

export default function Content() {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      const data = await response.data;
      return data;
    },
  });

  if (query.isLoading) return <h2 className="text-center my-3">Loading....</h2>;
  if (query.isError)
    return <h2 className="text-center my-3">Error loading data!!!</h2>;

  return (
    <>
      <h2 className="text-center my-3">Top Deals</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {query.data.map((item) => (
          <Items
            id={item.id}
            key={item.id}
            title={item.title}
            image={item.image}
            description={item.description}
            price={item.price}
            rate={item.rating.rate}
            count={item.rating.count}
            category={item.category}
          />
        ))}
      </div>
    </>
  );
}
