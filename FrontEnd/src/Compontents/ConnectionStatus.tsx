import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const ConnectionStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setOpen(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setOpen(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={30000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={isOnline ? "success" : "error"}
        sx={{ width: "100%" }}
      >
        {isOnline ? "You are back online!" : "No internet connection!"}
      </Alert>
    </Snackbar>
  );
};

export default ConnectionStatus;
