import { CircularProgress } from "@mui/material";
import Container from "react-bootstrap/esm/Container";

const Loading = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center-justify-content-center loading"
    >
      <CircularProgress color="inherit" />
    </Container>
  );
};

export default Loading;
