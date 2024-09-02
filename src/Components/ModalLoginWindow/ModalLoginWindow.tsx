import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
};

export const ModalLoginWindow: React.FC<Props> = ({
  open,
  handleClose,
}) => {
  const navigate = useNavigate();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
          Авторизація
        </Typography>
        <div className="auth-modal">
          <button
            className="auth-modal__button top-bar__button"
            type="button"
            onClick={() => {
              navigate("/register");
              handleClose();
            }}
          >
            Зареєструватись
          </button>
          <button
            className="auth-modal__button search-bar__search"
            type="button"
            onClick={() => {
              navigate("/login");
              handleClose();
            }}
          >
            Вхід в аккаунт
          </button>
        </div>
      </Box>
    </Modal>
  );
};
