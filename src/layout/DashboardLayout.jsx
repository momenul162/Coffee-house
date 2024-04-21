import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TuneIcon from "@mui/icons-material/TuneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import { Link, Outlet } from "react-router-dom";
import img from "../assets/coffee-logo.png";
import { Container, IconButton } from "@mui/joy";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Guesthouse");

  return (
    <Container>
      <Box
        maxWidth="full"
        sx={{ bgcolor: "whitesmoke", py: 2, display: "flex", alignItems: "center" }}
      >
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<TuneIcon />}
          onClick={() => setOpen(true)}
        >
          Dashboard
        </Button>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginLeft: 50,
          }}
          to="/"
        >
          <Box
            component="img"
            sx={{
              height: 50,
              display: "flex",
              overflow: "hidden",
            }}
            src={img}
            alt=""
          />
          <Typography level="h2">Coffee House</Typography>
        </Link>
      </Box>
      <Drawer
        size="sm"
        variant="soft"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",
              p: { md: 3, sm: 0 },
              ml: { lg: 15 },
              boxShadow: "none",
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <DialogTitle>Filter</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: "auto" }} />
          <DialogContent sx={{ gap: 2 }}>
            <FormControl>
              <FormLabel sx={{ typography: "title-md", fontWeight: "bold" }}>
                Property type
              </FormLabel>
              <RadioGroup
                value={type || ""}
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
                  {[
                    {
                      name: "Overview",
                      icon: <HomeRoundedIcon />,
                      to: "/dashboard/overview",
                    },
                    {
                      name: "Orders",
                      icon: <HomeRoundedIcon />,
                      to: "/dashboard/orders",
                    },
                    {
                      name: "Products",
                      icon: <ApartmentRoundedIcon />,
                      to: "/dashboard/products",
                    },
                    {
                      name: "App Products",
                      icon: <MeetingRoomRoundedIcon />,
                      to: "/dashboard/additem",
                    },
                    {
                      name: "Users",
                      icon: <HotelRoundedIcon />,
                      to: "/dashboard/users",
                    },
                  ].map((item) => (
                    <Link onClick={() => setOpen(false)} key={item.name} to={item.to}>
                      <Card
                        sx={{
                          boxShadow: "none",
                          "&:hover": { bgcolor: "background.level1" },
                        }}
                      >
                        <CardContent>
                          {item.icon}
                          <Typography level="title-md">{item.name}</Typography>
                        </CardContent>
                        <Radio
                          disableIcon
                          overlay
                          checked={type === item.name}
                          variant="outlined"
                          color="neutral"
                          value={item.name}
                          sx={{ mt: -2 }}
                          slotProps={{
                            action: {
                              sx: {
                                ...(type === item.name && {
                                  borderWidth: 2,
                                  borderColor: "var(--joy-palette-primary-outlinedBorder)",
                                }),
                                "&:hover": {
                                  bgcolor: "transparent",
                                },
                              },
                            },
                          }}
                        />
                      </Card>
                    </Link>
                  ))}
                </Box>
              </RadioGroup>
            </FormControl>
          </DialogContent>
        </Sheet>
      </Drawer>
      <Box open={open}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default DashboardLayout;
