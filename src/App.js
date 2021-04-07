// import logo from './logo.svg';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Container,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  formControl: {
    marginBottom: 12,
  },
  formControlLBH: {
    marginLeft: "0 px",
    marginRight: "0 px",
    marginBottom: 12,
  },
}));

function App() {
  const classes = useStyles();
  const [flag, setFlag] = React.useState(true);
  const [price, setPrice] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [length, setLength] = React.useState(0);
  const [breadth, setBreadth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [totalAmount, setTotalAmount] = React.useState(0);

  const [measure, setMeasure] = React.useState(0);

  function getLBHInch(l, b, h, p) {
    return Math.round((((l * b * h) / 1728) * p));
  }

  function getLBHFeet(l, b, h, p) {
    return Math.round((l * b * h * p));
  }

  function getVolume(w, p, q) {
    return Math.round((w * p * q));
  }

  const handleWeightChange = (event) => {
    // console.log(event.target.value);
    var value = event.target.value;
    if (value <= 20) {
      setWeight(value);
      setFlag(true);
      if (measure === "1")
        setTotalAmount(getLBHInch(length, breadth, height, price) * quantity);
      else if (measure === "2")
        setTotalAmount(getLBHFeet(length, breadth, height, price) * quantity);
      else if (measure === 0) {
        setTotalAmount(0);
      }
    } else {
      setWeight(value);
      setFlag(false);
      setTotalAmount(getVolume(value, price, quantity));
    }
  };

  const handleLengthChange = (event) => {
    var l = event.target.value;
    setLength(l);
    if (flag) {
      if (measure === "1")
        setTotalAmount(getLBHInch(l, breadth, height, price) * quantity);
      else if (measure === "2")
        setTotalAmount(getLBHFeet(l, breadth, height, price) * quantity);
    }
  };

  const handleBreadthChange = (event) => {
    var b = event.target.value;
    setBreadth(b);
    if (flag) {
      if (measure === "1")
        setTotalAmount(getLBHInch(length, b, height, price) * quantity);
      else if (measure === "2")
        setTotalAmount(getLBHFeet(length, b, height, price) * quantity);
    }
  };

  const handleHeightChange = (event) => {
    var h = event.target.value;
    setHeight(h);
    if (flag) {
      if (measure === "1")
        setTotalAmount(getLBHInch(length, breadth, h, price) * quantity);
      else if (measure === "2")
        setTotalAmount(getLBHFeet(length, breadth, h, price) * quantity);
    }
  };

  const handlePriceChange = (event) => {
    var p = event.target.value;
    setPrice(p);
    if (!flag) {
      setTotalAmount(getVolume(weight, p, quantity));
    } else {
      if (measure === "1")
        setTotalAmount(getLBHInch(length, breadth, height, p) * quantity);
      else if (measure === "2")
        setTotalAmount(getLBHFeet(length, breadth, height, p) * quantity);
    }
  };

  const handleQuantityChange = (event) => {
    // console.log(event.target.value);
    var quan = event.target.value;
    setQuantity(quan);
    if (!flag) {
      setTotalAmount(getVolume(weight, price, quan));
      // console.log(event.target.value);
    } else {
      if (measure === "1")
        setTotalAmount(getLBHInch(length, breadth, height, price) * quan);
      else if (measure === "2")
        setTotalAmount(getLBHFeet(length, breadth, height, price) * quan);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setMeasure(value);
    if (flag) {
      if (value === "1")
        setTotalAmount(getLBHInch(length, breadth, height, price) * quantity);
      else if (value === "2")
        setTotalAmount(getLBHFeet(length, breadth, height, price) * quantity);
    }
    // console.log(value);
  };

  return (
    <div className="App">
      <div className={classes.root}>
        <br />
        <Container fixed>
          <Grid container style={{ textAlign: "center" }} justify="center">
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <Card className={classes.root}>
                <CardHeader></CardHeader>
                <CardContent>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Weight(Kg)"
                      type="number"
                      variant="outlined"
                      name="weight"
                      onChange={handleWeightChange}
                    />
                  </FormControl>
                  {flag && (
                    <div>
                      <Grid container>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                className={classes.formControl}
                              >
                                <TextField
                                  id="outlined-basic"
                                  label="Length"
                                  type="number"
                                  variant="outlined"
                                  onChange={handleLengthChange}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                className={classes.formControlLBH}
                              >
                                <TextField
                                  id="outlined-basic"
                                  label="Breadth"
                                  type="number"
                                  variant="outlined"
                                  onChange={handleBreadthChange}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                className={classes.formControl}
                              >
                                <TextField
                                  id="outlined-basic"
                                  label="Height"
                                  type="number"
                                  variant="outlined"
                                  onChange={handleHeightChange}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Measure
                        </InputLabel>
                        <Select
                          native
                          value={measure}
                          onChange={handleChange}
                          label="Measure"
                          inputProps={{
                            name: "age",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option aria-label="None" value="0">
                            Select Measure
                          </option>
                          <option value={1}>Inch</option>
                          <option value={2}>Feet</option>
                        </Select>
                      </FormControl>
                    </div>
                  )}
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Price"
                      type="number"
                      variant="outlined"
                      onChange={handlePriceChange}
                    />
                  </FormControl>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Quantity"
                      type="number"
                      variant="outlined"
                      onChange={handleQuantityChange}
                    />
                  </FormControl>
                  <Button variant="contained" color="primary" fullWidth={true}>
                    Total Amount: {totalAmount}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default App;
