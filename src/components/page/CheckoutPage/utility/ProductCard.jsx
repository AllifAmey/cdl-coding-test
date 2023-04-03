import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ProductCard(props) {
  /*
  
  docs:

  Each section in the card , apart from the last, has the title relevant to the data below.

  The add cart button will be where the logic for adding the user data comes in. 

  The data for each card will be primarily from CheckoutPage, store_items.




  */
  const margin_spacing = {
    mb: 1,
  };
  return (
    <Card sx={{ minWidth: 150 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          variant="h5"
          component="div"
        >
          Item Name
        </Typography>
        <Typography variant="h6" component="div">
          {props.store_item.item_name}
        </Typography>
        <Typography sx={margin_spacing} color="text.secondary">
          Unit Price
        </Typography>
        <Typography sx={margin_spacing} variant="body2">
          {`£${(props.store_item.unit_price / 100).toFixed(2)}`}
        </Typography>
        <Typography sx={margin_spacing} color="text.secondary">
          Special Deal
        </Typography>
        <Typography variant="body2">
          {props.store_item.special_price
            ? `Get ${props.store_item.special_deal.special_quantity} for ${props.store_item.special_deal.special_amount} `
            : "No Special Deal"}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "1rem",
        }}
      >
        <Button endIcon={<AddShoppingCartIcon color="primary" />}>Add</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
