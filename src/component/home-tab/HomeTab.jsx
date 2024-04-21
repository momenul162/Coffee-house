import { Tab, TabList, TabPanel } from "@mui/joy";
import React from "react";
import useCategory from "../../hooks/useCategory";

const HomeTab = () => {
  const categories = useCategory();

  return (
    <>
      <TabList>
        {categories && categories.map((category) => <Tab key={category._id}>{category.name}</Tab>)}
      </TabList>
    </>
  );
};

export default HomeTab;
