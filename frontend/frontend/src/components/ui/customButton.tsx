import { Button } from "@mui/material"; // ✅ REQUIRED IMPORT

const CustomButton = ({
  children,
  fullWidth = false,
  ...props
}: any) => {
  return (
    <Button
      variant="contained"
      size="medium"
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;