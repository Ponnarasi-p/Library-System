import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { buttonStyles } from "../../constants/styles";

const CustomButton = (props: ButtonProps) => {
  return <Button variant="contained" sx={buttonStyles.primary} {...props} />;
};

export default CustomButton;