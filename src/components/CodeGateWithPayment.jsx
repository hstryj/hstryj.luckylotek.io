import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";

function generateCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default function CodeGateWithPayment({ onAccessGranted }) {
  const [code, setCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("paid") === "true") {
      const newCode = generateCode();
      localStorage.setItem("generatedAccessCode", newCode);
      setCode(newCode);
    }
  }, []);

  const handleVerify = () => {
    const storedCode = localStorage.getItem("generatedAccessCode");
    if (inputCode === storedCode) {
      localStorage.setItem("access", "true");
      onAccessGranted();
    } else {
      setError("Niepoprawny kod dostępu");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
      px={2}
    >
      <Paper elevation={4} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={700} textAlign="center">
            Uzyskaj Dostęp
          </Typography>

          <Button
            variant="contained"
            color="success"
            href="/your-mock-checkout-link?paid=true" // Replace with real checkout
          >
            Kup Dostęp
          </Button>

          {code && (
            <Box>
              <Typography variant="subtitle1" color="primary" textAlign="center">
                Twój kod dostępu:
              </Typography>
              <Typography
                variant="h6"
                fontWeight={700}
                textAlign="center"
                sx={{ letterSpacing: 1 }}
              >
                {code}
              </Typography>
            </Box>
          )}

          <TextField
            label="Wpisz kod dostępu"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            error={!!error}
            helperText={error}
            fullWidth
          />

          <Button variant="contained" onClick={handleVerify}>
            Zatwierdź kod
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
