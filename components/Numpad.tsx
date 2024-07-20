import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ChevronRight } from "lucide-react-native";

const Numpad = () => {
  const [inputValue, setInputValue] = useState("6");
  const [comment, setComment] = useState("");
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [category, setCategory] = useState("Shopping");

  const handleNumberPress = (number: string) => {
    setInputValue((prev) => prev + number);
    console.log("Number pressed:");
  };

  const handleDotPress = () => {
    if (!inputValue.includes(".")) {
      setInputValue((prev) => prev + ".");
    }
  };

  const handleDeletePress = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleCheckmarkPress = () => {
    // Handle checkmark press logic here
  };

  const handleAddCommentPress = () => {
    setIsCommentVisible(true);
  };

  const handleCommentChange = (text: string) => {
    setComment(text);
  };

  const handlePaymentMethodChange = (itemValue: string) => {
    setPaymentMethod(itemValue);
  };

  const handleCategoryChange = (itemValue: string) => {
    setCategory(itemValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.dollarSign}>$</Text>
        <Text style={styles.inputText}>{inputValue}</Text>
      </View>
      <View style={styles.numpadContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <TouchableOpacity
            key={number}
            onPress={() => handleNumberPress(number.toString())}
            style={[styles.button, styles.numberButton]}
          >
            <Text style={styles.buttonText}>{number}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={handleDotPress}
          style={[styles.button, styles.numberButton]}
        >
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNumberPress("0")}
          style={[styles.button, styles.numberButton]}
        >
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeletePress}
          style={[styles.button, styles.specialButton]}
        >
          <Text style={styles.buttonText}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
    marginTop: 32,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 0,
    marginTop: 0,
    borderRadius: 30,
  },
  picker: {
    flex: 1,
    height: 50,
    width: "45%",
    marginBottom: 0,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  dollarSign: {
    fontSize: 36,
    fontWeight: "bold",
  },
  inputText: {
    fontSize: 36,
    fontWeight: "bold",
    marginLeft: 10,
  },
  commentButton: {
    marginBottom: 10,
  },
  commentButtonText: {
    fontSize: 18,
    color: "gray",
  },
  commentInput: {
    width: "100%",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  numpadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: "30%",
    height: 70,
    margin: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  numberButton: {
    backgroundColor: "#f2f2f2",
  },
  specialButton: {
    backgroundColor: "lightgreen",
    height: 67,
  },
  buttonText: {
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default Numpad;
