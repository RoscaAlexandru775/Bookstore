import React, { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import "./sliderFilter.css";

interface Props {
  name: string;
  value: number[];
  onChange: (newValue: number | number[]) => void;
  max?: number;
  step?: number;
  marginLeft?: number;
  reset: boolean;
}

export default function SliderFilter({ props }: { props: Props }) {
  const [showSlider, setShowSlider] = React.useState(false);
  const [value, setValue] = React.useState<number[]>(props.value);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    props.onChange(newValue);
  };
  useEffect(() => {
    setValue(props.value);
  }, [props.reset]);
  return (
    <>
      <div className="d-flex flex-row">
        <h3 style={{ fontWeight: "bold" }}>{props.name}</h3>
        <div
          onClick={() => {
            setShowSlider(!showSlider);
          }}
        >
          {showSlider ? (
            <IoIosArrowDown
              color="#143d81"
              size={25}
              style={{ marginLeft: props.marginLeft, marginTop: 2 }}
            />
          ) : (
            <IoIosArrowForward
              color="#143d81"
              size={25}
              style={{ marginLeft: props.marginLeft, marginTop: 2 }}
            />
          )}
        </div>
      </div>
      {showSlider && (
        <Box sx={{ width: 260, marginLeft: 1 }}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            max={props.max || 10}
            step={props.step || 1}
            value={value}
            valueLabelDisplay="auto"
            onChange={handleChange}
            disableSwap
          />
        </Box>
      )}
    </>
  );
}
