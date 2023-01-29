import React, { useEffect } from "react";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function FilterOption({
  genre,
  reset,
  select,
}: {
  genre: string;
  reset: boolean;
  select: boolean;
}) {
  const [selected, setSelected] = React.useState(false);
  useEffect(() => {
    setSelected(false);
  }, [reset]);
  useEffect(() => {
    if (select) {
      setSelected(false);
    }
  }, [select]);
  return (
    <div
      onClick={() => {
        setSelected(!selected);
      }}
      className="d-flex flex-row"
    >
      {selected ? (
        <>
          <div className="d-flex flex-row">
            <IoMdCheckmarkCircleOutline color="#143d81" size={25} />
            <h4 style={{ color: "#143d81", marginLeft: 15, marginTop: -2 }}>
              {genre}
            </h4>
          </div>
        </>
      ) : (
        <div className="d-flex flex-row">
          <MdRadioButtonUnchecked color="#C4C4C4" size={25} />
          <h4 style={{ color: "#C4C4C4", marginLeft: 15, marginTop: -2 }}>
            {genre}
          </h4>
        </div>
      )}
    </div>
  );
}
