/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";

const TopPlaces = ({ img }) => {
  return (
    <Card style={{ width: "20rem" }} className="position-relative countryCard">
      <Card.Img
        variant="top"
        src={img}
        className="h-100 object-fit-cover rounded"
      />
      <Card.Title className="position-absolute bottom-0 text-white placesCardTitle">
        Top Places to Eat
      </Card.Title>
    </Card>
  );
};

export default TopPlaces;
