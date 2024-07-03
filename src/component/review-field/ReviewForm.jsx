import React, { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import { Button } from "@mui/joy";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useNavigate, useParams } from "react-router-dom";

const ReviewForm = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(true);
  const { user } = useStoreState((state) => state.currentUser);
  const { postReview } = useStoreActions((actions) => actions.reviews);

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = { userId: user._id, orderId, review: description };
    console.log(review);
    postReview(review);
    setOpen(false);
    setDescription("");
    navigate("/api/my-orders");
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <DialogTitle>Please type your valuable review</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                required
                value={description}
                onChange={() => setDescription(event.target.value)}
              />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default ReviewForm;

// Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus cumque, blanditiis dignissimos assumenda ab reprehenderit, dolorum vero voluptatibus totam sed omnis. Eaque cumque nulla magnam libero earum. Eos repellendus expedita exercitationem ullam dolorum eius. Magnam quo nesciunt iure fugit quis praesentium perferendis magni quos eveniet corporis numquam, temporibus ut facere?
