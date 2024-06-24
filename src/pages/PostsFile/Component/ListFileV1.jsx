import React, { Component, useEffect, useRef, useState } from "react";
import { DeselectAll, SelectAll, SelectableGroup } from "react-selectable-fast";
import ImageCard from "./ImageCard";
import { ReactMouseSelect } from "react-mouse-select";

export const ListFileV1 = ({ portal }) => {
  const containerRef = useRef(null);

  const itemClassName = "mouse-select__selectable";

  return (
    <div className="">
      <div className="flex flex-wrap gap-5" ref={containerRef}>
        {[...Array(30)].map((item, idx) => {
          return (
            <ImageCard key={idx} data-id={idx}>
              Selectable block
            </ImageCard>
          );
        })}
      </div>
      <ReactMouseSelect
        containerRef={containerRef}
        portalContainer={portal}
        itemClassName={itemClassName}
      />
    </div>
  );
};
