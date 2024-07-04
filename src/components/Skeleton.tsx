import React from "react";
import ContentLoader from "react-content-loader";
const Skeleton = () => {
  return (
    <div>
      <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <circle cx="136" cy="124" r="120" />
        <rect x="0" y="320" rx="0" ry="0" width="268" height="80" />
        <rect x="51" y="271" rx="0" ry="0" width="167" height="36" />
        <rect x="10" y="425" rx="0" ry="0" width="119" height="41" />
        <rect x="141" y="425" rx="0" ry="0" width="119" height="41" />
      </ContentLoader>
    </div>
  );
};

export default Skeleton;
