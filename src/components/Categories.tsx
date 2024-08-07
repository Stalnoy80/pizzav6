import React, { memo } from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};
const Categories: React.FC<CategoriesProps> = memo(
  ({ value, onChangeCategory }) => {
    const categories = [
      "все",
      "мясные",
      "вегетарианская",
      "гриль",
      "Острые",
      "Закрытые",
    ];

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, i) => (
            <li
              key={i}
              onClick={() => onChangeCategory(i)}
              className={value === i ? "active" : ""}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
export default Categories;
