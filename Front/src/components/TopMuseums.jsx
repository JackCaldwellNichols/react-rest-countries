/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";

const TopMuseums = ({ museum }) => {
  return (
    <Card style={{ width: "20rem" }} className="position-relative countryCard">
      <Card.Img
        variant="top"
        src={museum}
        className="h-100 object-fit-cover rounded"
      />

      <Card.Title className="position-absolute bottom-0 text-white placesCardTitle">
        Top Museums to Visit
      </Card.Title>
    </Card>
  );
};

export default TopMuseums;
