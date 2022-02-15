import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCountry, date } from "../../services/api";

import s from "./CountryDetail.module.css";

export const CountryDetail = () => {
  const [country, setCountry] = useState("");
  const { Country } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    const fetchedCountry = async () => {
      try {
        const data = await getCountry(Country);
        setCountry(data);
      } catch (event) {
        console.error(event);
      }
    };
    fetchedCountry();
  }, [Country]);
  return (
    country && (
      <section className={s.section}>
        <h1>
          {Country}
          <button className={s.button} onClick={() => navigate("/countries")}>
            Back
          </button>
        </h1>
        <h3>Statistics for {date}</h3>

        <ul className={s.list}>
          {country.map((item) => (
            <li key={item.ID} className={s.item}>
              {item.Province ? <p className={s.p}>Province: {item.Province}</p> : <p>No information by province</p>}
              <span className={s.span}>Active: {item.Active}</span>
              <span className={s.span}>Confirmed:{item.Confirmed}</span>
              <span className={s.span}>Deaths:{item.Deaths}</span>
            </li>
          ))}
        </ul>
      </section>
    )
  );
};
