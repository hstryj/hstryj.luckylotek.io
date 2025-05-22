import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Container,
} from "@mui/material";
import CodeGate from "./components/CodeGate";
import PaymentGate from "./components/PaymentGate";
import StrategyForm from "./components/StrategyForm";
import ResultView from "./components/ResultView";
import SavedList from "./components/SavedList";
import HeatmapWithPairs from "./components/HeatmapWithPairs";
import draws from "./data/draws.json";
import { loadAccess } from "./services/storage";

export default function App() {
  const [paymentDone, setPaymentDone] = useState(false);
  const [hasAccess, setHasAccess] = useState(loadAccess());
  const [tabIndex, setTabIndex] = useState(0);
  const [result, setResult] = useState([]);
  const [strategy, setStrategy] = useState("Najczęściej losowane");
  const [favoritesUpdated, setFavoritesUpdated] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // 🔒 Bramka płatności + kod
  if (!hasAccess) {
    if (!paymentDone) {
      return <PaymentGate onPaymentSuccess={() => setPaymentDone(true)} />;
    }
    return <CodeGate onAccessGranted={() => {
      setHasAccess(true);
      localStorage.setItem("access", "true");
    }} />;
  }

  // ✅ Widok główny
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #175F36, #0F3C26)",
        paddingBottom: 4,
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem 1rem",
      }}
    >
      <Typography
        variant="h2"
        align="center"
        sx={{
          fontWeight: 700,
          color: "#D4FF57",
          textShadow: "0 0 10px rgba(212, 255, 87, 0.6)",
          mb: 3,
        }}
      >
        Dobry Lotek
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        centered
        textColor="inherit"
        sx={{
          mb: 3,
          ".MuiTab-root": {
            fontWeight: 700,
            fontSize: "1.125rem",
            letterSpacing: "1px",
            color: "#ddd",
            "&.Mui-selected": {
              color: "#fff",
              textShadow: "0 0 10px rgba(0,255,0,0.3)"
            }
          },
          ".MuiTabs-indicator": {
            height: 3,
            backgroundColor: "#9f6"
          }
        }}
      >
        <Tab label="Generator" />
        <Tab label="Zapisane" />
        <Tab label="Analiza" />
      </Tabs>

      <Container sx={{ mt: 4 }}>
        {tabIndex === 0 && (
          <>
            <StrategyForm setResult={setResult} setStrategy={setStrategy} />
            <ResultView
              numbers={result}
              onSave={() => setFavoritesUpdated((prev) => prev + 1)}
              strategy={strategy}
            />
          </>
        )}
        {tabIndex === 1 && <SavedList reload={favoritesUpdated} />}
        {tabIndex === 2 && <HeatmapWithPairs draws={draws} />}
      </Container>
    </Box>
  );
}