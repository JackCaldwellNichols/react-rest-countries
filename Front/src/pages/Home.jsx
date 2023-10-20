import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useState, useRef, Suspense } from "react";
import CountryCard from "../components/CaountryCard";
import Container from "react-bootstrap/esm/Container";
import { Canvas } from "@react-three/fiber";
import Earth from "../components/Earth";
import Button from "react-bootstrap/esm/Button";
import Login from "../components/Login";
import { CircularProgress } from "@mui/material";
import Alert from "react-bootstrap/Alert";
import { logout } from "../context/AuthActions";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchText = useRef();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${searchText.current.value}?fullText=true`
      );
      setCountries(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      style={{ height: "100vh", width: "100vw" }}
      className="p-4 home"
    >
      {user ? (
        <Container className="search">
          <Container className="d-flex flex-column w-50 align-items-center justify-content-center">
            <input
              type="search"
              placeholder="Search by country name"
              ref={searchText}
              className="searchInput"
            />
            {loading ? (
              <Button
                disabled
                className="searchBtn d-flex align-items-center justify-content-center"
              >
                <CircularProgress color="inherit" size={20} />
              </Button>
            ) : (
              <Button onClick={handleSearch} className="searchBtn">
                Search
              </Button>
            )}
            {error && (
              <>
                {["danger"].map((variant) => (
                  <Alert key={variant} variant={variant}>
                    Something went wrong.
                  </Alert>
                ))}
              </>
            )}
          </Container>
          <Container className="d-flex align-items-center justify-content-center p-4 resultsWrapper">
            {searchText === ""
              ? null
              : countries?.map((country, i) => (
                  <CountryCard country={country} key={i} />
                ))}
          </Container>
        </Container>
      ) : (
        <Container className="loginCont">
          <Container className="d-flex flex-column w-50 align-items-center justify-content-center">
            <Login />
          </Container>
        </Container>
      )}
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </Container>
  );
};

export default Home;
