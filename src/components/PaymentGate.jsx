// src/components/PaymentGate.jsx
import React, { useEffect, useState } from "react";
import { Button, Typography, Box, Snackbar, Alert } from "@mui/material";

export default function PaymentGate({ onPaymentSuccess }) {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") === "true") {
      const code = "DEMO2024"; // Możesz dynamicznie generować

      localStorage.setItem("paidCode", code);
      localStorage.setItem("access", "false"); // Jeszcze nie aktywowany

      setShowSuccess(true);

      // Pokaż CodeGate po krótkim czasie
      setTimeout(() => {
        onPaymentSuccess();
      }, 1500);
    }
  }, [onPaymentSuccess]);

  const handlePayment = () => {
    window.location.href = "?paid=true";
  };

  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h5" gutterBottom color="white">
        Odblokuj dostęp do generatora
      </Typography>
      <Typography variant="body1" mb={3} color="white">
        Aby kontynuować, dokonaj symbolicznej opłaty 5 PLN.
      </Typography>
      <Button variant="contained" color="primary" onClick={handlePayment}>
        Przejdź do płatności
      </Button>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Płatność zakończona sukcesem!
        </Alert>
      </Snackbar>
    </Box>
  );
}