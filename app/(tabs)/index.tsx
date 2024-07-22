import React, { useCallback, useRef, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Numpad from "@/components/Numpad";
import { Play, Pause, RotateCw, ChevronsUp } from 'lucide-react-native'; // Ensure this import path is correct
import { useAtom } from "jotai";
import { colourAtom } from "@/atoms/atoms";

const colourPresets = [{
  name: "Blue",
  value: "blue",
  colour: "#3B82F6",
  backgroundColour: "#172554"
}, {
  name: "Red",
  value: "red",
  colour: "#EF4444",
  backgroundColour: "#450a0a"
}, {
  name: "Green",
  value: "green",
  colour: "#22c55e",
  backgroundColour: "#052e16"
}]

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [displayMinutes, setDisplayMinutes] = useState("");
  const [displaySeconds, setDisplaySeconds] = useState("");
  const [colour, setColour] = useAtom(colourAtom)

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      alert("Time's up!");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time]);

  useEffect(() => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    setDisplayMinutes(minutes);
    setDisplaySeconds(seconds);
  }, [time]);

  const handleStartTimer = (newTime: number) => {
    setTime(newTime);
    setInitialTime(newTime);
    setIsRunning(true);
    bottomSheetRef.current?.close();
  };

  const handleRestartTimer = () => {
    setTime(initialTime);
    setIsRunning(true);
  };

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <View style={{
      ...styles.container,
      backgroundColor: colourPresets.find((preset) => preset.value === colour)?.backgroundColour
    }}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={["70%"]}
        handleStyle={{ display: "none" }}
        enablePanDownToClose
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.numPad}>
            <Numpad setTime={handleStartTimer} />
          </View>
        </BottomSheetView>
      </BottomSheet>
      {time > 0 && (
        <>
          <View style={styles.timerContainer}>
            <Text style={[{
              fontSize: 140,
              fontWeight: "semibold",
              color: colourPresets.find((preset) => preset.value === colour)?.colour,
            }, isRunning && {
              fontWeight: "bold"
            }]}>{displayMinutes}</Text>
            <Text style={[{
              fontSize: 140,
              fontWeight: "semibold",
              color: "white",
            }, isRunning && {
              fontWeight: "bold"
            }]}>{displaySeconds}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={handleRestartTimer}
              style={{
                ...styles.button,
                backgroundColor: colourPresets.find((preset) => preset.value === colour)?.colour
              }}
            >
              <RotateCw color="white" size={26} />
            </Pressable>
            <Pressable
              onPress={() => setIsRunning((prev) => !prev)}
              style={{
                ...styles.button,
                backgroundColor: colourPresets.find((preset) => preset.value === colour)?.colour
              }}
            >
              {isRunning ? (
                <Pause color="white" size={26} />
              ) : (
                <Play color="white" size={26} />
              )}
            </Pressable>
            <Pressable
              onPress={handleOpenBottomSheet}
              style={{
                ...styles.button,
                backgroundColor: colourPresets.find((preset) => preset.value === colour)?.colour
              }}
            >
              <ChevronsUp color="white" size={26} />
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  numPad: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F2937",
    width: "100%",
    padding: 20,
  },
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 20,
  },
  timerSeconds: {
    fontSize: 140,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 32,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
