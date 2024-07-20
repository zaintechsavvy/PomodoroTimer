import { Image, StyleSheet, Platform, Text, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCallback, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import Numpad from "@/components/Numpad";
import { ChevronRight } from "lucide-react-native";

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={["100%"]}
        style={{
          justifyContent
        }}
        handleStyle={{
          display: "none",
        }}
        enablePanDownToClose
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.numPad}>
            <Numpad />
            <TouchableOpacity
              style={{
                marginTop: 45,
                backgroundColor: "black",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 30,
                flexDirection: "row",
                gap: 5,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "600",
                }}
              >
                Next
              </Text>
              <ChevronRight
                style={{
                  // @ts-ignore
                  color: "white",
                }}
              />
            </TouchableOpacity>
          </View>
          {/* go to next page */}

          <ThemedView>
            <ThemedText>Home</ThemedText>
            <HelloWave />
          </ThemedView>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  numPad: {
    justifyContent: "center",
    alignItems: "center",
  },
});
