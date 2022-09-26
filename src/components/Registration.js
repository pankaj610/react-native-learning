import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import DateTimeInput from "./common/DateTimeInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { registerDevotee } from "../actions/actions";

const Registration = (props) => {
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      name: "Pankaj",
      email: "vermapankaj62@gmail.com",
      contact: "8285288162",
      area: "ghaziabad",
      address: "Krishna nagar",
      classLevel: "VL2",
      facilitator: "KMP",
      frontliner: "RGP",
      occupation: "ENG",
      dob: "2020-08-03T23:15:00.000Z",
      connectedOn: "2020-08-03T23:15:00.000Z",
      connectedBy: "Krishna",
      maritalStatus: "single",
      inGhaziabad: "yes",
      gender: "male",
      registeredBy: "pkh",
      remarks: "paid",
    },
    mode: "onChange",
  });
  const [date, setDate] = useState(new Date(1598051730000));
  const [text, onChangeText] = React.useState("Useless Text");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.appReducer.loading);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Devotee Registration</Text>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              name: "name",
              type: "text",
              rules: {
                required: {
                  value: true,
                  message: "Name is required",
                },
              },
              textInputProps: {
                label: "Name",
              },
            },
            {
              name: "email",
              type: "text",
              rules: {
                required: {
                  value: true,
                  message: "Email is required",
                },
              },
              textInputProps: {
                label: "Email",
              },
            },
            {
              name: "area",
              type: "select",
              rules: {
                required: {
                  value: true,
                  message: "Area is required",
                },
              },
              textInputProps: {
                label: "Area",
              },
              options: [
                {
                  value: "ghaziabad",
                  label: "Ghaziabad",
                },
              ],
            },
            {
              name: "address",
              type: "text",
              rules: {
                required: {
                  value: true,
                  message: "Address is required",
                },
              },
              textInputProps: {
                label: "Address",
              },
            },
            {
              name: "contact",
              type: "text",
              rules: {
                required: {
                  value: true,
                  message: "Contact number is required",
                },
              },
              textInputProps: {
                label: "Contact",
              },
            },
            {
              name: "gender",
              type: "select",
              textInputProps: {
                label: "Gender",
              },
              rules: {
                required: {
                  value: true,
                  message: "Gender is required",
                },
              },
              options: [
                {
                  value: "female",
                  label: "Female",
                },
                {
                  value: "male",
                  label: "Male",
                },
                {
                  value: "others",
                  label: "Others",
                },
              ],
            },
            {
              name: "classLevel",
              type: "select",
              textInputProps: {
                label: "Class Level",
              },
              rules: {
                required: {
                  value: true,
                  message: "Class level is required",
                },
              },
              options: [
                {
                  value: "DYS",
                  label: "DYS",
                },
                {
                  value: "VL2",
                  label: "VL2",
                },
                {
                  value: "DPS",
                  label: "DPS",
                },
              ],
            },
            {
              name: "facilitator",
              type: "select",
              textInputProps: {
                label: "Facilitator",
              },
              rules: {
                required: {
                  value: true,
                  message: "Facilitator level is required",
                },
              },
              options: [
                {
                  value: "KMP",
                  label: "Kanu Mohan Pr",
                },
              ],
            },
            {
              name: "frontliner",
              type: "select",
              textInputProps: {
                label: "Frontliner",
              },
              rules: {
                required: {
                  value: true,
                  message: "Frontliner level is required",
                },
              },
              options: [
                {
                  value: "RGP",
                  label: "Raghav Kripa Pr",
                },
              ],
            },
            {
              name: "occupation",
              type: "select",
              textInputProps: {
                label: "Occupation",
              },
              rules: {
                required: {
                  value: true,
                  message: "Occupation is required",
                },
              },
              options: [
                {
                  value: "ENG",
                  label: "Engineer",
                },
              ],
            },
            {
              name: "dob",
              type: "custom",
              textInputProps: {
                label: "Date Of Birth",
              },
              JSX: DateTimeInput,
            },
            {
              name: "maritalStatus",
              type: "select",
              textInputProps: {
                label: "Marital Status",
              },
              rules: {
                required: {
                  value: true,
                  message: "Marital Status is required",
                },
              },
              options: [
                {
                  value: "single",
                  label: "Single",
                },
                {
                  value: "married",
                  label: "Married",
                },
                {
                  value: "divorced",
                  label: "Divorced",
                },
              ],
            },
            {
              name: "connectedBy",
              type: "text",
              rules: {
                required: {
                  value: true,
                  message: "Connected By is required",
                },
              },
              textInputProps: {
                label: "Connected By",
              },
            },
            {
              name: "remarks",
              type: "text",
              rules: {
                required: {
                  value: true,
                  message: "Remarks is required",
                },
              },
              textInputProps: {
                label: "Remarks",
              },
            },
          ]}
        />

        <Button
          mode={"contained"}
          onPress={handleSubmit((data) => {
            console.log("form data", data);
            dispatch(registerDevotee(data)).then((res) => {
              alert(res);
            });
          })}
          disabled={loading}
        >
          Submit
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
    alignSelf: "center",
    fontWeight: "700",
  },
});

Registration.propTypes = {};

export default Registration;
