import { Routes, Route, Navigate } from "react-router-dom";
import { Countries } from "../Countries/Countries";
import { CountryDetail } from "../CountryDetail/CountryDetail";
import { ROUTES } from "../routes/routes";

export default function App() {
  return (
    <section>
      <Routes>
        <Route path={ROUTES.Countries} element={<Countries />} />
        <Route path={ROUTES.CountryDetail} element={<CountryDetail />} />
        <Route path="*" element={<Navigate to="/countries" />} />
      </Routes>
    </section>
  );
}
