import Container from "react-bootstrap/Container";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Container fluid className="footer d-flex">
      <Container className="d-flex flex-column flex-md-row align-items-center justify-content-center">
        <Container className="d-flex flex-column align-items-start align-items-md-center p-0">
          <Container>
            <h1>ReactRestCountries</h1>
            <p>Pinoineering pages for pinoneers.</p>
          </Container>
          <Container>
            <h5>FOLLOW US</h5>
            <Container className="d-flex p-0 gap-2">
              <FacebookIcon />
              <TwitterIcon />
              <InstagramIcon />
            </Container>
          </Container>
        </Container>
        <Container className="d-flex flex-column align-items-start align-items-md-center mt-3">
          <h5>ABOUT US</h5>
          <span>About ResactRestCountries</span>
          <span>Contact us</span>
          <span>Privacy Policy</span>
          <span>Sitemap</span>
          <span>Cookie Settings</span>
        </Container>
      </Container>
    </Container>
  );
};

export default Footer;
