import { Tab, TabList } from "@mui/joy";
import React from "react";
import useCategory from "../../hooks/useCategory";

const HomeTab = () => {
  const categories = useCategory();

  return (
    <TabList
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Tab value={"All"}>All</Tab>
      {categories &&
        categories?.map((category) => (
          <Tab value={category?.name} key={category?._id}>
            {category?.name}
          </Tab>
        ))}
    </TabList>
  );
};

export default HomeTab;
