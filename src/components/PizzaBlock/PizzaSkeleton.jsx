import React from "react";
import ContentLoader from "react-content-loader";

const PizzaSkeleton = () => (
  <ContentLoader
    speed={0.8}
    width={280}
    height={466.4}
    viewBox="0 0 280 466.4"
    backgroundColor="#f3f3f3"
    foregroundColor="#e8e8e8"
  >
    <rect x="10" y="260" rx="10" ry="10" width="260" height="36" />
    <rect x="10" y="310" rx="10" ry="10" width="260" height="88" />
    <rect x="10" y="420" rx="10" ry="10" width="100" height="35" />
    <rect x="120" y="415" rx="24" ry="24" width="150" height="50" />
    <circle cx="140" cy="125" r="125" />
  </ContentLoader>
);

export default PizzaSkeleton;
