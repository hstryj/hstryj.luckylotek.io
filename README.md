# 🎰 Dobry Lotek

**Dobry Lotek** to aplikacja internetowa wspomagająca wybór zestawów liczb do gry Lotto na podstawie statystycznych analiz historycznych losowań. Narzędzie jest proste, eleganckie i dostępne z poziomu przeglądarki.

Projekt stworzony jako narzędzie edukacyjno-eksperymentalne. Nie stanowi porady finansowej ani gwarancji trafień.

## 🧠 Funkcje

- Wybór strategii generowania liczb:
  - Najczęściej losowane
  - Najrzadziej losowane
  - Pomiń liczby z ostatnich X losowań
  - Rozkład parzyste/nieparzyste
  - Popularne pary i trójki
- Historia losowań (od lat 50.)
- Analiza statystyczna z mapą cieplną
- Możliwość zapisywania wygenerowanych zestawów
- Obsługa kodu aktywacyjnego po płatności
- Dane ładowane lokalnie z pliku JSON
- Nowoczesny interfejs oparty o **React + Vite + MUI**

## 🚀 Jak uruchomić projekt lokalnie

```bash
git clone https://github.com/twoj-login/nazwa-repo.git
cd nazwa-repo
npm install
npm run dev

## 🧾 Aktywacja
	1.	Po wejściu na stronę użytkownik widzi ekran płatności.
	2.	Po kliknięciu “Przejdź do płatności” symulowana jest płatność.
	3.	Po jej zakończeniu generowany jest kod dostępu (np. DEMO2024).
	4.	Wklej go w kolejnym widoku, aby odblokować funkcje aplikacji.

Uwaga: W wersji demonstracyjnej płatność jest symulowana.

## Struktura projektu
src/
├── components/         # Komponenty UI (Generator, Heatmap, CodeGate itp.)
├── data/               # Plik draws.json z historią losowań
├── services/           # Obsługa LocalStorage (np. kod dostępu, ulubione)
├── utils/              # Kolory, analiza danych
├── App.jsx             # Główna logika aplikacji
└── main.jsx            # Punkt wejścia

## 📄 Licencja

MIT © 2025 — hstryj
