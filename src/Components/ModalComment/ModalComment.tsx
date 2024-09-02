import React, { useState } from "react";
import { Box, Modal, Rating, Typography } from "@mui/material";
import { Input as BaseInput, InputProps } from "@mui/base/Input";
import { styled } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as commentsActions from "../../features/comments/commentsSlice";
import { Comment } from "../../Types/Comment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 630,
  height: 432,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  rowGap: "8px",
};

type Props = {
  open: boolean;
  handleClose: () => void;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const RootDiv = styled("div")`
  display: flex;
  max-width: 100%;
`;

const TextareaElement = styled("textarea", {
  shouldForwardProp: (prop) =>
    !["ownerState", "minRows", "maxRows"].includes(prop.toString()),
})(
  ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px 8px 0 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[700] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const Input = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseInput
      slots={{
        root: RootDiv,
        input: "input",
        textarea: TextareaElement,
      }}
      {...props}
      ref={ref}
    />
  );
});

type InputMultilineProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const InputMultiline: React.FC<InputMultilineProps> = ({
  value,
  onChange,
}) => {
  return (
    <Input
      aria-label="Demo input"
      multiline
      placeholder="Поділіться своїми враженнями про цей заклад…"
      value={value}
      onChange={onChange}
    />
  );
};

export const ModalComment: React.FC<Props> = ({
  open,
  handleClose,
  setComments,
}) => {
  const [value, setValue] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.comments);
  const id = useAppSelector((state) => state.selectedCafe.selectedCafe?.id);

  const handleSubmit = () => {
    dispatch(
      commentsActions.createComment({
        cafeId: +(id || 0),
        comment,
        score: value || 5,
      })
    ).then((resp) => {
      const newComment = resp.payload as Comment;

      setComments((prev: Comment[]) => [newComment, ...prev]);
    });
    setComment("");
    setValue(0);
    handleClose();
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ borderRadius: "24px !important" }}
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{
            fontWeight: "bold",
            margin: "8px",
          }}
        >
          Відгук
        </Typography>
        <InputMultiline
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend">Оцініть заклад</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(_event, newValue) => {
              setValue(newValue);
            }}
          />
          <button
            className="search-bar__search testimonials__button"
            type="button"
            onClick={handleSubmit}
          >
            Додати відгук
          </button>
        </Box>
      </Box>
    </Modal>
  );
};
