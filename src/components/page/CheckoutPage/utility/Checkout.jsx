import React from "react";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function Checkout(props) {
  /*
  docs:

  The userCheckout will render the userCheckout data with each section being revelant to the user data.

  The pay button resets the usercheckout data
  */

  const running_total = props.userCheckout
    .map((checkout_item) => {
      const unit_price = props.store_items.filter((item) => {
        return checkout_item.item_name == item.item_name;
      })[0].unit_price;
      return checkout_item.quantity * unit_price;
    })
    .reduce((a, b) => a + b, 0);

  const final_total = props.userCheckout
    .map((checkout_item) => {
      return checkout_item.total_amount;
    })
    .reduce((a, b) => a + b, 0);
  return (
    <>
      <Grid
        container
        gap="2rem"
        width="20%"
        height="100vh"
        flexDirection="column"
      >
        <Typography gutterBottom variant="h5" component="div">
          Checkout
        </Typography>
        {props.userCheckout.map((checkout_item) => {
          return (
            <Grid container key={checkout_item.item_name} width="100%">
              <Grid container item flexDirection="column" xs>
                <Grid item>Item Name</Grid>
                <Grid item>
                  <Typography gutterBottom variant="h5" component="div">
                    {checkout_item.item_name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item flexDirection="column" xs>
                <Grid item>Amount</Grid>
                <Grid item>
                  <Typography gutterBottom variant="h5" component="div">
                    {`£${(checkout_item.total_amount / 100).toFixed(2)}`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item flexDirection="column" xs>
                <Grid item>Quantity</Grid>
                <Grid item>
                  <Typography gutterBottom variant="h5" component="div">
                    {checkout_item.quantity}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
        <Divider />
        <Typography gutterBottom variant="h6" component="div">
          {`Running Total £${(running_total / 100).toFixed(2)}`}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {`Final Total £${(final_total / 100).toFixed(2)}`}
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            props.setUserCheckout([]);
          }}
        >
          Pay
        </Button>
      </Grid>
    </>
  );
}

export default Checkout;
