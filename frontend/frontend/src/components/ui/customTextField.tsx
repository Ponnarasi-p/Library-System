import { TextField } from "@mui/material";

const CustomTextField = (props: any) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="medium"
      {...props}
    />
  );
};

export default CustomTextField;