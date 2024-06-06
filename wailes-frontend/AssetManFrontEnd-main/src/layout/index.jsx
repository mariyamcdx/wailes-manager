import { Box, Container } from "@mui/material";
import Header from "./Header";
import Leftbar from "./Leftbar";
import ScrollToTop from "./ScrollToTop";
import ThemeToggle from "./ThemeToggle";
import BreadCrumb from "../common/BreadCrumb";

export default function Layout({ children }) {
  return (
    <ThemeToggle>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box sx={{  height: "4px",position:"relative" }}>
          <Header />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            flexGrow: 1,
          }}
        >
          <Box sx={{position:'absolute'}} >
            <Leftbar />
          </Box>

          <Box
            sx={{
              display: "flex",
             margin:'6vh 0vh 0vh 8vh',
              px: "0px",
              width: "100%",
              overflow: "auto",
            }}
          >
            <Container
              sx={{
                px: "0px !important",
                m: "0px !important",
                width: "100%",
                maxWidth: "100% !important",
                margin:'1px',
                backgroundColor:'#FAFBFC', 
                marginRight:'0.5vw',
                height:'100vh'
              }}
            >
              <BreadCrumb />
              <Box>
                <ScrollToTop />
                {children}
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeToggle>
  );
}
