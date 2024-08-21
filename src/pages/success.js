"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Confetti from "react-confetti";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Stack spacing={2} useFlexGap>
        <Typography variant="h1">📦</Typography>
        <Typography variant="h5">Thank you for your order!</Typography>
        <Typography variant="body1" color="text.secondary">
          Your order number is
          <strong>&nbsp;#140396</strong>. We have emailed your order
          confirmation and will update you once its shipped.
        </Typography>
        <Button
          variant="contained"
          sx={{
            alignSelf: "start",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Go to my orders
        </Button>
      </Stack>
      <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
        <Confetti width={2000} height={1000} />
        <h1 className="text-success display-1">Successful</h1>
        <h2 className="h4 font-weight-medium">
          We sent the invoice to your e-mail
        </h2>
        <h3 className="">You are being redirected to the order page...</h3>
      </div>
    </div>
  );
};

export default SuccessPage;
