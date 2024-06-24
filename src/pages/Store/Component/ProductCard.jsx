import React, { useEffect, useState } from "react";

const ProductCard = ({ item, onClick }) => {
  const handleClick = (e) => {
    onClick && onClick(item);
  };

  return (
    <>
      <div
        className="rounded-2xl bg-white border hover:border hover:border-[#fb5731] overflow-hidden"
        onClick={handleClick}
      >
        <div className="h-[110px] w-full">
          <img
            className="w-full h-full custom-full-width"
            src={
              "https://tapdoandaiviet.com.vn/manage/responsive_filemanager/source/nuoc-khoang-la-gi-4.jpg"
            }
          />
        </div>
        <div className="p-2">
          <h3 className="text-xl font-bold">{item?.Name}</h3>
          <h3 className="text-base">{item?.Price}đ</h3>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
