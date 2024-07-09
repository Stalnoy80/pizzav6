import React from "react";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};
const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  useWhyDidYouUpdate("Categories", { value, onChangeCategory });
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
};
export default Categories;
