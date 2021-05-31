import React, { useContext } from "react";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import Card from "./Card";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";
import {DataContext} from '../Context';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const Payment = () => {
    
    const {total} = useContext(DataContext);
    console.log(total)
    
    const onSubmit = async (values) => {
      await sleep(300);
      window.alert(JSON.stringify({...values, total}, 0, 2));
    };
  return (
    <Styles>
      <Form
        onSubmit={onSubmit}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
          active,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Card
                number={values.number || ""}
                name={values.name || ""}
                expiry={values.expiry || ""}
                cvc={values.cvc || ""}
                focused={active}
              />
              <div>
                <Field
                  name="number"
                  component="input"
                  type="text"
                  pattern="[\d| ]{16,22}"
                  placeholder="Card Number"
                  format={formatCreditCardNumber}
                />
              </div>
              <div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Date"
                  format={formatExpirationDate}
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                />
              </div>
              <div>
                <Field
                  name="adress"
                  component="input"
                  type="text"
                  placeholder="Shipment Adress Line 1"
                />
              </div>
              <div>
                <Field
                  name="adress2"
                  component="input"
                  type="text"
                  placeholder="Shipment Adress Line 2"
                />
              </div>
              <p name= "total" component="" style={{textAlign: "right", marginRight: "1rem", color: "#F00504", fontSize: "1.5rem", fontWeight: 700}}>{`Total : $ ${total}`}</p>
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          );
        }}
      />
    </Styles>
  );
};

export default Payment;
