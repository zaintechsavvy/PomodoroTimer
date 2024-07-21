import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCallback, useRef, useState, useEffect } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Numpad from "@/components/Numpad";

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [time, setTime] = useState(0);
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
    setIsRunning(true);
    bottomSheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={["69%"]}
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
          <Pressable
            onPress={() => setIsRunning((prev) => !prev)}
            style={{
              backgroundColor: "#3B82F6",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{
              color: "white",
              fontSize: 20,
            }}>
              {isRunning ? "Pause" : "Start"}
            </Text>
          </Pressable>
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
});
