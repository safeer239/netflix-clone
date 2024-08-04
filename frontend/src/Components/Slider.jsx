import React, { useEffect, useState } from "react";
import { useContentStore } from "../Store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/baseUrl";

const Slider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const changedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const changedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.content);
    };
    getContent();
  }, [contentType, category]);
  return (
    <div className="text-white bg-black reltive px-5 md:px-20">
      <h2 className="mb-4 text-2xl font-extrabold">
        {changedCategoryName} {changedContentType}
      </h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="min-w-[250px] relative group"
            key={item.id}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt=""
                className="transition-transform duration-500 ease-in-out group-hover:scale-125"
              />
            </div>
            <p className="mt-2 text-center">{item.name || item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Slider;
