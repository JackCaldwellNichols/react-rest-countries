/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CountryCard({ country }) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    const test = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/search/photos?query=${
            country.name.common
          }&per_page=1&orientation=landscape&client_id=${
            import.meta.env.VITE_UNSPLASH_ACCESS
          }`
        );
        setImg(res.data.results[0].urls.full);
      } catch (error) {
        console.log("UNSPLAH", error);
      }
    };
    test();
  }, [img]);

  return (
    <Card style={{ width: "18rem" }} className="resultCard m-3 ">
      <Link to={`/country/${country.name.common}`}>
        <Card.Img variant="top" src={img} className="h-100 object-fit-cover" />
      </Link>
      <Card.Body className="p-2">
        <Card.Title>{country.name.common}</Card.Title>
        <Card.Text>{country.continents[0]}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CountryCard;
