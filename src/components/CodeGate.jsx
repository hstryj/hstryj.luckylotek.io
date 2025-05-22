import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
} from "@mui/material";

export default function CodeGate({ onAccessGranted }) {
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);
  const [paid, setPaid] = useState(false);

  // Obsługa query param ?paid=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") === "true") {
      const newCode = generateCode();
      localStorage.setItem("generatedCode", newCode);
      localStorage.setItem("paid", "true");
      setGeneratedCode(newCode);
      setPaid(true);

      // Usuwamy ?paid=true z paska adresu
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // Jeśli użytkownik był już "opłacony", załaduj zapisany kod
  useEffect(() => {
    const wasPaid = localStorage.getItem("paid") === "true";
    if (wasPaid) {
      const savedCode = localStorage.getItem("generatedCode");
      if (savedCode) {
        setGeneratedCode(savedCode);
        setPaid(true);
      }
    }
  }, []);

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCheckCode = () => {
    const savedCode = localStorage.getItem("generatedCode");
    if (code === savedCode) {
      localStorage.setItem("access", "true");
      onAccessGranted();
    } else {
      alert("Niepoprawny kod.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={10}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400 }}>
        {!paid ? (
          <>
            <Typography variant="h6" gutterBottom>
              Aby uzyskać dostęp, kup kod:
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              href="?paid=true"
            >
              Kup dostęp
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Twój kod: <strong>{generatedCode}</strong>
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                navigator.clipboard.writeText(generatedCode);
                alert("Kod skopiowany!");
              }}
              sx={{ mb: 2 }}
            >
              Skopiuj kod
            </Button>

            <Typography variant="body2" color="text.secondary">
              Wklej go poniżej, aby uzyskać dostęp:
            </Typography>

            <TextField
              label="Wklej kod"
              fullWidth
              margin="normal"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
            />

            <Button
              variant="contained"
              onClick={handleCheckCode}
              fullWidth
            >
              Zatwierdź
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
}
