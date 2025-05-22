import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { loadFavorites, deleteFavorite } from "../services/favorites";

export default function SavedList({ reload }) {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const sorted = [...loadFavorites()].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSaved(sorted);
  }, [reload]);

  const handleDelete = (index) => {
    deleteFavorite(index);
    const sorted = [...loadFavorites()].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSaved(sorted);
  };

  const handleClearAll = () => {
    localStorage.removeItem("savedNumbers");
    setSaved([]);
  };

  return (
    <Box mt={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "white",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Zapisane zestawy
        </Typography>

        {saved.length > 0 && (
          <Button
            onClick={handleClearAll}
            sx={{
              background: "linear-gradient(to right, #b4ec51, #429321)",
              color: "white",
              px: 2,
              py: 0.75,
              fontSize: "0.875rem",
              borderRadius: 4,
              fontWeight: 600,
              '&:hover': {
                background: "linear-gradient(to right, #9bcf3f, #357c1e)",
              }
            }}
          >
            Wyczyść wszystkie
          </Button>
        )}
      </Box>

      {saved.length === 0 ? (
        <Typography color="gray">Brak zapisanych zestawów.</Typography>
      ) : (
        <Stack spacing={3}>
          {saved.map((item, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                px: 3,
                py: 2,
                borderRadius: "20px",
                backgroundColor: "#fffcea",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <Box display="flex" justifyContent="flex-end" mb={1}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "#555" }}
                >
                  Zestaw {index + 1}
                </Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                gap={1.2}
                mb={2}
              >
                {item.set.map((n, i) => (
                  <Chip
                    key={i}
                    label={n}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "#e8fc03",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  />
                ))}
              </Box>

              {item.strategy && (
                <Typography
                  variant="body2"
                  fontStyle="italic"
                  color="primary"
                  align="center"
                  mb={0.5}
                >
                  Strategia: {item.strategy}
                </Typography>
              )}

              <Typography
                variant="caption"
                align="center"
                display="block"
                sx={{ color: "#888", mb: 1 }}
              >
                {new Date(item.date).toLocaleString("pl-PL")}
              </Typography>

              <Box display="flex" justifyContent="center">
                <Button
                  size="small"
                  onClick={() => handleDelete(index)}
                  startIcon={<DeleteIcon />}
                  sx={{
                    background: "linear-gradient(to right, #b4ec51, #429321)",
                    color: "white",
                    px: 2.5,
                    borderRadius: 4,
                    fontWeight: 600,
                    '&:hover': {
                      background: "linear-gradient(to right, #9bcf3f, #357c1e)",
                    }
                  }}
                >
                  Usuń
                </Button>
              </Box>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}