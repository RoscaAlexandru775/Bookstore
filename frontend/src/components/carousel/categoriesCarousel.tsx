import React from "react";
import Carousel from "react-bootstrap/Carousel";
import CategoryCard from "../cards/categoryCard/categoryCard";

const CategoriesCarousel: React.FC = () => {
  return (
    <div style={{ marginLeft: 20, marginTop: 40 }}>
      <h3 style={{ marginLeft: 30, marginBottom: 30, fontWeight: "bold" }}>
        Categories
      </h3>
      <Carousel controls={false} indicators={false}>
        <Carousel.Item>
          <div className="d-flex flex-row ">
            <CategoryCard
              category={"Arts & Photography"}
              stock={214}
            ></CategoryCard>
            <CategoryCard
              category={"Biographies & Memory"}
              stock={124}
            ></CategoryCard>
            <CategoryCard
              category={"Children’s Book"}
              stock={432}
            ></CategoryCard>
            <CategoryCard category={"CookBook"} stock={241}></CategoryCard>
            <CategoryCard category={"History"} stock={51}></CategoryCard>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex flex-row">
            <CategoryCard category={"Philosophy"} stock={94}></CategoryCard>
            <CategoryCard category={"Nutrition"} stock={104}></CategoryCard>
            <CategoryCard category={"Psychology"} stock={132}></CategoryCard>
            <CategoryCard category={"Science"} stock={321}></CategoryCard>
            <CategoryCard category={"Astronomy"} stock={234}></CategoryCard>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CategoriesCarousel;
