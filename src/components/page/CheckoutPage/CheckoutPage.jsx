import React, { useState } from "react";

import ProductCard from "./utility/ProductCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Checkout from "./utility/Checkout";

const store_items = [
  {
    item_name: "A",
    unit_price: 50,
    special_price: true,
    special_deal: { special_quantity: 3, special_amount: 130 },
  },
  {
    item_name: "B",
    unit_price: 30,
    special_price: true,
    special_deal: { special_quantity: 2, special_amount: 45 },
  },
  {
    item_name: "C",
    unit_price: 20,
    special_price: false,
  },
  {
    item_name: "D",
    unit_price: 15,
    special_price: false,
  },
];

function CheckoutPage() {
  const [userCheckout, setUserCheckout] = useState([]);
  /*
  docs:

  Storing user data in the form of useState hook.

  There are 2 main sides of the page - checkout and productcards section

  The productCard will loop over the data producing individual component for each product.

  The checkout system will loop over the user data producing a component for each purchase.

  This in turn will make the website dynamic to data. 

  Design Philosophy:

  The overall design will be very simple with the card being extremely plain, the same goes
  for the checkout section and the CheckoutPage itself. All of which will be very plain looking
  the focus is on functionality.

  Code philsophy:

  The code will be as modular as possible and split as per React's suggestion. Code will be split,
  according to topic so it makes more sense. There will also be documentation explaining the logic for ,
  component. 


  */
  return (
    <>
      <Grid
        container
        flexDirection="column"
        justifyContent="start"
        width="90vw"
      >
        <Typography
          gutterBottom
          variant="h3"
          component="div"
          sx={{ mb: "4rem" }}
        >
          CDL Checkout Coding Test
        </Typography>
        <Grid container>
          <Grid container gap="2rem" width="60%">
            {store_items.map((store_item) => {
              return (
                <Grid item key={store_item.item_name}>
                  <ProductCard
                    store_item={store_item}
                    setUserCheckout={setUserCheckout}
                    userCheckout={userCheckout}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CheckoutPage;
