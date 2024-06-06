import { Box, Grid, Typography } from "@mui/material";

const Section = ({
  title,
  headerProps,
  containerProps,
  contentProps,
  children,
}) => {
  return (
    /**
     * A section component that displays a title, an optional edit button, and content which is commonly used for maintain common look wherever required.
     */
    <Box component="section" {...containerProps}>
      <Grid
        container
        alignItems="top"
        columnGap={2}
        mb={2}
        mt={2}
        sx={{ borderBottom: "1px rgba(0, 0, 0, 0.6) solid" }}
      >
        <Grid item>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              color: "rgba(0, 0, 0, 0.6)",
              marginTop: "10px",
            }}
            mb={1}
            color="dark"
            {...headerProps}
          >
            {title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container {...contentProps}>
        {children}
      </Grid>
    </Box>
  );
};

export default Section;
