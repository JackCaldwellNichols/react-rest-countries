import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/esm/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/esm/Button";
import MapBox from "../components/Map";
import TopPlaces from "../components/TopPlaces";
import TopMuseums from "../components/TopMuseums";
import TopThings from "../components/TopThings";
import Footer from "../components/Footer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TourIcon from "@mui/icons-material/Tour";

const Country = () => {
  const params = useParams();
  const name = params.name;
  const [countryInfo, setCountryInfo] = useState([]);
  const [banner, setBanner] = useState(null);
  const [dining, setDining] = useState(null);
  const [museum, setMuseum] = useState(null);
  const [tourism, setTourism] = useState(null);

  useEffect(() => {
    const displayCountry = async () => {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
      );
      setCountryInfo(res.data);
    };
    displayCountry();
  }, [name]);

  useEffect(() => {
    const test = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/search/photos?query=${name}&per_page=1&orientation=landscape&client_id=88Q4NzYwJGube8zpf42ZY_WloFpHJcq_xHlbIcknfoA`
        );
        setBanner(res.data.results[0].urls.full);
      } catch (error) {
        console.log("UNSPLAH", error);
      }
    };
    test();
  }, [name]);

  useEffect(() => {
    const test = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/search/photos?query=dining&per_page=1&orientation=portrait&client_id=88Q4NzYwJGube8zpf42ZY_WloFpHJcq_xHlbIcknfoA`
        );
        setDining(res.data.results[0].urls.full);
      } catch (error) {
        console.log("UNSPLAH", error);
      }
    };
    test();
  }, [name]);

  useEffect(() => {
    const test = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/search/photos?query=museum&per_page=1&orientation=portrait&client_id=${
            import.meta.env.VITE_UNSPLASH_ACCESS
          }`
        );
        setMuseum(res.data.results[0].urls.full);
      } catch (error) {
        console.log("UNSPLAH", error);
      }
    };
    test();
  }, [name]);

  useEffect(() => {
    const test = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/search/photos?query=tourism&per_page=1&orientation=portrait&client_id=${
            import.meta.env.VITE_UNSPLASH_ACCESS
          }`
        );
        setTourism(res.data.results[0].urls.full);
      } catch (error) {
        console.log("UNSPLAH", error);
      }
    };
    test();
  }, [name]);

  return (
    <Container fluid className="p-0">
      {countryInfo.map((info, i) => (
        <>
          <Container
            style={{ height: "60vh", width: "100%" }}
            className="w-100"
            key={i}
          >
            <Image
              src={banner}
              className="countryBanner w-100 h-100 object-fit-cover p-3"
            />
          </Container>
          <Container className="d-flex flex-column">
            <Container className="d-flex align-items-center gap-3">
              <h1 className="countryName">{info.name.common}</h1>
              <Image
                src={info.flags.png}
                style={{ height: "40px", width: "60px" }}
                className="object-fit-cover"
              />
            </Container>
            <Container>
              <h3 className="countryRegion">{info.region}</h3>
            </Container>
            <Container>
              <span className="countryDesc">
                {info.name.common} dolor sit amet consectetur adipisicing elit.
                Quo atque cum, repudiandae eveniet ullam rem dignissimos in
                consectetur pariatur saepe? Nisi optio rem dicta adipisci quis
                totam accusantium odit in!
              </span>
            </Container>
            <Container className="d-flex px-0 py-5 flex-column flex-md-row">
              <Container className="countryLeft d-flex  gap-2 py-4 flex-column p-0">
                <Container className="d-flex justify-content-center flex-column align-items-center align-items-lg-start">
                  <Alert
                    variant="success"
                    className="w-100 d-flex align-items-center justify-content-between"
                  >
                    <span>Best time to visit</span>
                    <CalendarMonthIcon />
                  </Alert>
                  <Alert
                    variant="danger"
                    className="w-100 d-flex align-items-center justify-content-between"
                  >
                    <span>Best places to visit</span>
                    <TourIcon />
                  </Alert>
                </Container>
                <Container>
                  <h3 className="countryRegion">Some useful info</h3>
                  <Container className="countryRegionInfo p-0">
                    <h4>Capital City: {info.capital}</h4>
                    <h4>Population: {info.population}</h4>
                    <h4>Denonyms: {info.demonyms.eng.f}</h4>
                    <h4>Drives on: {info.car.side} side</h4>
                    <h4>Current Weather: </h4>
                  </Container>
                </Container>
              </Container>
              <Container className="countryRight p-4 d-flex justify-content-center flex-column gap-3">
                <h1>Plan your ideal trip with our new itinerary tool</h1>
                <span>
                  Answer a few questions about your travel plans to unlock your
                  custom itinerary and start exploring.
                </span>
                <Button className="createTripBtn">+ Create a trip</Button>
              </Container>
            </Container>
            <Container className="d-flex align-items-center justify-content-center p-0">
              <MapBox latlng={info.latlng} />
            </Container>
            <Container className="p-0 countryPlaces">
              <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4">
                <TopPlaces img={dining} />
                <TopMuseums museum={museum} />
                <TopThings tourism={tourism} />
              </Container>
            </Container>
          </Container>
        </>
      ))}
      <Footer />
    </Container>
  );
};

export default Country;
