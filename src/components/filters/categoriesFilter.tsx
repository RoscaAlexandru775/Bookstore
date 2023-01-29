import React, { useEffect } from "react";

import FilterOption from "./filterOption";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { BookGenreOptions } from "../../models/bookGenre";

export default function CategoriesFilter({
  reset,
  handleCategoryChange,
}: {
  reset: boolean;
  handleCategoryChange: Function;
}) {
  const [selected, setSelected] = React.useState(true);
  const [showOptions, setShowOptions] = React.useState(false);

  useEffect(() => {
    setSelected(true);
  }, [reset]);

  return (
    <>
      <div className="d-flex flex-row mt-5">
        <h3 style={{ fontWeight: "bold" }}>Categories</h3>
        <div
          onClick={() => {
            setShowOptions(!showOptions);
          }}
        >
          {showOptions ? (
            <IoIosArrowDown
              color="#143d81"
              size={25}
              style={{ marginLeft: 120, marginTop: 2 }}
            />
          ) : (
            <IoIosArrowForward
              color="#143d81"
              size={25}
              style={{ marginLeft: 120, marginTop: 2 }}
            />
          )}
        </div>
      </div>
      {showOptions ? (
        <div style={{ marginLeft: 20, marginTop: 30 }}>
          {selected ? (
            <div
              onClick={() => {
                // setSelected(!selected);
                // handleCategoryChange("All Genres", false);
              }}
              className="d-flex flex-row"
            >
              <IoMdCheckmarkCircleOutline color="#143d81" size={25} />
              <h4 style={{ color: "#143d81", marginLeft: 15, marginTop: -2 }}>
                All Genres
              </h4>
            </div>
          ) : (
            <div
              onClick={() => {
                setSelected(!selected);
                handleCategoryChange("All Genres", true);
              }}
              className="d-flex flex-row"
            >
              <MdRadioButtonUnchecked color="#C4C4C4" size={25} />
              <h4 style={{ color: "#C4C4C4", marginLeft: 15, marginTop: -2 }}>
                All Genres
              </h4>
            </div>
          )}
          {BookGenreOptions.map((genre, index) => (
            <div
              key={index}
              onClick={() => {
                setSelected(false);
                handleCategoryChange(genre.label, true);
              }}
            >
              <FilterOption
                reset={reset}
                genre={genre.label}
                select={selected}
              />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
