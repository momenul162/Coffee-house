import { Tab, TabList } from "@mui/joy";
import React from "react";
import useCategory from "../../hooks/useCategory";

const HomeTab = () => {
  const { categories, loading } = useCategory();

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress thickness={3} size="sm" />
      </Container>
    );
  }

  return (
    <TabList
      sx={{
        display: "flex",
        gap: { xs: 3 },
        flexWrap: { xs: "wrap", md: "nowrap" },
        flexDirection: { md: "column" },
      }}
    >
      <Tab value={"All"}>All</Tab>
      {categories &&
        categories?.map((category) => (
          <Tab sx={{ px: { xs: 0 } }} value={category?.name} key={category?._id}>
            {category?.name}
          </Tab>
        ))}
    </TabList>
  );
};

export default HomeTab;
