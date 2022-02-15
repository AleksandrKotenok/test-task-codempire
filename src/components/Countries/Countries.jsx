import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSummary } from "../../services/api";
import logo from "../../images/logo.jpg";
import filter from "../../images/filter.png";

import s from "./Countries.module.css";

export const Countries = () => {
  const [state, setState] = useState("");
  const [query, setQuery] = useState("");
  const [triger, setTriger] = useState(true);

  useEffect(() => {
    if (state) return;
    const summary = async () => {
      try {
        const data = await getSummary();
        setState(data);
      } catch (event) {
        console.error(event);
      }
    };
    summary();
  }, [triger]);

  const searchChange = (event) => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const TotalDeaths = (field) => {
    setState((state) =>
      state.sort(function (a, b) {
        return a.TotalDeaths - b.TotalDeaths;
      })
    );
    setTriger(!triger);
  };
  const TotalConfirmeds = () => {
    setState((state) =>
      state.sort(function (a, b) {
        return a.TotalConfirmed - b.TotalConfirmed;
      })
    );
    setTriger(!triger);
  };

  return (
    <section className={s.section}>
      <h1>
        <img src={logo} alt="logo" width={50} />
        Statistics for all countries
      </h1>
      <form>
        <label>
          Search:
          <input type="filter" placeholder="Search ..." onChange={searchChange} />
        </label>
      </form>
      <ul className={s.list}>
        <li className={s.item}>
          <span className={s.spanCountry}>Countries:</span>
          <span className={s.span}>
            <button onClick={TotalConfirmeds} className={s.button}>
              <img src={filter} alt="filter" width={10} />
            </button>
            TotalConfirmed:
          </span>
          <span className={s.span}>
            <button onClick={TotalDeaths} className={s.button}>
              <img src={filter} alt="filter" width={10} />
            </button>
            TotalDeaths:
          </span>
        </li>
        {state &&
          state
            .filter(({ Country }) => Country.toLowerCase().includes(query))
            .map(({ Country, ID, TotalDeaths, TotalConfirmed }) => (
              <li key={ID} className={s.item}>
                <Link to={`/countries/${Country}`} className={s.link}>
                  <span className={s.spanCountry}>{Country} </span>{" "}
                </Link>
                <span className={s.span}>{TotalConfirmed}</span>
                <span className={s.span}>{TotalDeaths}</span>
              </li>
            ))}
      </ul>
    </section>
  );
};
