import { Button, Container, FormControl, FormLabel, Input, Stack, Typography } from "@mui/joy";
import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "@mui/material";

const Review = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [ratings, setRatings] = useState(0);
  const { user } = useStoreState((state) => state.currentUser);
  const { postReview } = useStoreActions((actions) => actions.reviews);

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = { userId: user?._id, productId, review: description, ratings: ratings };
    postReview(review);
    setDescription("");
    setRatings(0);
    navigate("/my-orders");
  };
  return (
    <Container maxWidth="sm" sx={{ my: 16 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <Typography sx={{ fontSize: 30, fontWeight: 500, textAlign: "center", mb: 4 }}>
              Rate this product
            </Typography>

            <Rating
              name="half-rating"
              precision={0.5}
              value={ratings}
              onChange={(event, value) => {
                setRatings(value);
              }}
            />
          </FormControl>
          <FormControl>
            <Input
              required
              value={description}
              onChange={() => setDescription(event.target.value)}
            />
          </FormControl>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Review;
