import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

const CustomTextField = (props: TextFieldProps) => {
  return <TextField fullWidth variant="outlined" {...props} />;
};

export default CustomTextField;