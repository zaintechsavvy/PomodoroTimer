import React, { useCallback, useRef, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Numpad from "@/components/Numpad";
import { Play, Pause, RotateCw, ChevronsUp } from 'lucide-react-native'; // Ensure this import path is correct

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [displayMinutes, setDisplayMinutes] = useState("");
  const [displaySeconds, setDisplaySeconds] = useState("");

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
    <View style={styles.container}>
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
            <Text style={styles.timerMinutes}>{displayMinutes}</Text>
            <Text style={styles.timerSeconds}>{displaySeconds}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={handleRestartTimer}
              style={styles.button}
            >
              <RotateCw color="white" size={26} />
            </Pressable>
            <Pressable
              onPress={() => setIsRunning((prev) => !prev)}
              style={styles.button}
            >
              {isRunning ? (
                <Pause color="white" size={26} />
              ) : (
                <Play color="white" size={26} />
              )}
            </Pressable>
            <Pressable
              onPress={handleOpenBottomSheet}
              style={styles.button}
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
    backgroundColor: "#081426",
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
  },
  timerLabel: {
    fontSize: 24,
    color: "#3B82F6",
    marginVertical: 10,
  },
  timerMinutes: {
    fontSize: 140,
    fontWeight: "bold",
    color: "#3B82F6",
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
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
