import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const Numpad = ({ setTime }: { setTime: (time: number) => void }) => {
  const [inputValue, setInputValue] = useState("15:00");

  const formatTime = (time: string) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const handleNumberPress = (number: string) => {
    setInputValue((prev) => {
      const newValue = prev.replace(":", "").slice(-3) + number;
      return newValue.padStart(4, "0").replace(/(\d{2})(\d{2})/, "$1:$2");
    });
  };

  const handleDeletePress = () => {
    setInputValue((prev) => {
      const newValue = prev.replace(":", "").slice(0, -1);
      return newValue.padStart(4, "0").replace(/(\d{2})(\d{2})/, "$1:$2");
    });
  };

  const handleStartPress = () => {
    const time = formatTime(inputValue);
    setTime(time);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{inputValue === "0000" ? "00:00" : inputValue}</Text>
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
          onPress={() => handleNumberPress("0")}
          style={[styles.button, styles.numberButton]}
        >
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeletePress}
          style={[styles.button, styles.specialButton, { width: "63%" }]}
        >
          <Text style={styles.buttonText}>⌫</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleStartPress}
        style={[styles.button, styles.specialButton, { width: "95%" }]}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
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
  inputContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  inputText: {
    fontSize: 45,
    fontWeight: "bold",
    color: "white",
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
    backgroundColor: "lightblue",
    height: 67,
  },
  buttonText: {
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default Numpad;
r