import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Tooltip,
  Container,
  Fade,
  Button,
} from "@mui/material";
import { getHeatColor } from "../utils/colors";
import { getFavoritePairs } from "../utils/drawsAnalyzer";

export default function HeatmapWithPairs({ draws }) {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const countMap = {};
  const numbers = Array.from({ length: 49 }, (_, i) => i + 1);

  draws.forEach((draw) => {
    draw.numbers.forEach((n) => {
      countMap[n] = (countMap[n] || 0) + 1;
    });
  });

  const max = Math.max(...Object.values(countMap));
  const favoritePairs = selectedNumber
    ? getFavoritePairs(draws, selectedNumber)
    : [];

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 8, position: "relative" }}>
      <Typography
        variant="h5"
        align="center"
        fontWeight={700}
        mb={4}
        sx={{ color: "white", textShadow: "1px 1px 2px black" }}
      >
        Mapa Ciepła Liczb
      </Typography>

      {/* Tooltip info */}
      {!selectedNumber && (
        <Typography
          align="center"
          variant="body1"
          sx={{ color: "white", opacity: 0.6, mb: 3 }}
        >
          Kliknij liczbę, aby zobaczyć najczęstsze pary
        </Typography>
      )}

      <Grid container spacing={1} columns={7} justifyContent="center">
        {numbers.map((n) => (
          <Grid item xs={1} key={n} display="flex" justifyContent="center">
            <Tooltip title={`Liczba ${n} wystąpiła ${countMap[n] || 0} razy`} arrow>
              <Paper
                elevation={selectedNumber === n ? 6 : 1}
                onClick={() =>
                  setSelectedNumber(selectedNumber === n ? null : n)
                }
                sx={{
                  backgroundColor: getHeatColor(countMap[n] || 0, max),
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  color: "#000",
                  fontWeight: 700,
                  transition: "transform 0.2s ease, box-shadow 0.3s",
                  transform: "scale(1)",
                  "&:hover": {
                    transform: "scale(1.15)",
                    boxShadow: "0 0 10px rgba(255,255,255,0.4)",
                  },
                  border: selectedNumber === n ? "2px solid white" : "none",
                }}
              >
                <Box>{n}</Box>
                <Box fontSize={10}>{countMap[n] || 0}</Box>
              </Paper>
            </Tooltip>
          </Grid>
        ))}
      </Grid>

      {/* Overlay */}
      <Fade in={!!selectedNumber}>
        <Box
          sx={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgba(10,10,10,0.85)",
            color: "white",
            borderRadius: "2rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            backdropFilter: "blur(10px)",
            px: 4,
            py: 3,
            zIndex: 10,
            minWidth: 300,
            maxWidth: 380,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Najczęstsze pary z {selectedNumber}
          </Typography>
          {favoritePairs.slice(0, 5).map(([num, count], i) => (
            <Typography
              key={i}
              sx={{ mb: 1, fontWeight: 600, fontSize: "1rem" }}
            >
              {selectedNumber} + {num} → {count} razy
            </Typography>
          ))}

          <Button
            onClick={() => setSelectedNumber(null)}
            variant="text"
            size="small"
            sx={{ mt: 2, color: "lightgray", textTransform: "none" }}
          >
            Zamknij
          </Button>
        </Box>
      </Fade>

      <Typography
        variant="body2"
        color="text.secondary"
        fontStyle="italic"
        align="center"
        mt={6}
      >
        Liczba pod numerem to częstotliwość jej występowania w losowaniach.
        Najedź na dowolną liczbę, aby zobaczyć szczegóły.
      </Typography>
    </Container>
  );
}