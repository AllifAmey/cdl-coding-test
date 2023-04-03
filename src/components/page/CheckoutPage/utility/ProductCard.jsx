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
            ? `Get ${props.store_item.special_deal.special_quantity} for £${(
                props.store_item.special_deal.special_amount / 100
              ).toFixed(2)} `
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
        <Button
          endIcon={<AddShoppingCartIcon color="primary" />}
          onClick={() => {
            /*
            logic explanation: 
            First if the user's item exist to check that see if there is a match in the current user data,
            for the item by using the filter function.
            If there is a match the length should be 1 not 0,
            if there is no match then it should be 0 as the filter found nothing.

            If there is no match add the item to the usercheckout by doing push.
            The data should consist of the item data, the quantity and the total amount.

            If there is a match then only the quantity and the total_amount is added.
            There will also be a check for special deals.

            If there is no special deal then the total amount would be added
            If there is a special deal then the quantity will be used to calculate the total,
            along with the data inside of the special deal. 

            */

            // store user current data
            let currentUserData = props.userCheckout;
            const check_item_exist = currentUserData.filter((item) => {
              return item.item_name == props.store_item.item_name;
            });
            // check if item exist
            if (check_item_exist.length == 0) {
              //hard copy to prevent errors
              const add_item = {
                ...props.store_item,
                quantity: 1,
                total_amount: props.store_item.unit_price,
              };
              delete add_item.unit_price;
              currentUserData.push({ ...add_item });
            } else {
              const index = currentUserData.findIndex((item) => {
                return item.item_name == props.store_item.item_name;
              });

              // check if special price
              const check_special_price = currentUserData[index].special_price;
              currentUserData[index].quantity++;
              if (check_special_price) {
                const special_quantity =
                  props.store_item.special_deal.special_quantity;
                const special_amount =
                  props.store_item.special_deal.special_amount;
                let current_quantity = currentUserData[index].quantity;

                if (current_quantity < special_quantity) {
                  currentUserData[index].total_amount +=
                    props.store_item.unit_price;
                } else {
                  const remainder = current_quantity % special_quantity;
                  current_quantity -= remainder;
                  const total_special_price =
                    (current_quantity / special_quantity) * special_amount;
                  const total_normal_price =
                    remainder * props.store_item.unit_price;
                  const total_price = total_special_price + total_normal_price;

                  currentUserData[index].total_amount = total_price;
                }
              } else {
                currentUserData[index].total_amount +=
                  props.store_item.unit_price;
              }
            }
            props.setUserCheckout([...currentUserData]);
          }}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
