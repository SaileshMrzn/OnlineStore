import React, { useEffect, useState } from "react";
import axios from "axios";
import Items from "./Items";
import "../style.css";

export default function Search() {
  const [search, setSearch] = useState("");
  const [lists, setLists] = useState([]);

  const getFilteredItems = (search, lists) => {
    if (!search) {
      return [];
    }
    return lists.filter((products) =>
      products.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        setLists(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItemDetails();
  }, []);

  const filteredItems = getFilteredItems(search, lists);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center my-3">
        <form action="">
          <input
            type="text"
            name="search"
            id="searchProducts"
            placeholder="Search for Products"
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass searchIcon"></i>
        </form>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {filteredItems.map((val) => (
          <Items
            id={val.id}
            key={val.id}
            title={val.title}
            image={val.image}
            description={val.description}
            price={val.price}
            rate={val.rating.rate}
            count={val.rating.count}
            category={val.category}
          />
        ))}
      </div>
    </>
  );
}
