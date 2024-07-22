import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Pressable, Text, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAtom } from "jotai";
import { colourAtom } from '@/atoms/atoms';

export default function TabTwoScreen() {

  const [colour, setColour] = useAtom(colourAtom)

  const handleColourChange = (newColour: string) => {
    setColour(newColour);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="cog-outline" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <ThemedView style={{
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
      }}>
        <ThemedText style={{
          fontSize: 16,
          fontWeight: 'bold',
        }}>
          Colour
        </ThemedText>
        <View style={{
          flexDirection: 'row',
          gap: 8,
        }}>
          <Pressable onPress={() => handleColourChange('blue')} style={[{
            width: 32,
            height: 32,
            borderRadius: 50,
            backgroundColor: '#3b82f6',
            // add a thick border to the button
            borderWidth: 3,
            borderColor: '#ffffff50',
          }, colour == 'blue' && {
            borderColor: 'white',
          }]} />
          <Pressable onPress={() => handleColourChange('red')} style={[{
            width: 32,
            height: 32,
            borderRadius: 50,
            backgroundColor: '#ef4444',
            // add a thick border to the button
            borderWidth: 3,
            borderColor: '#ffffff50',
          }, colour == 'red' && {
            borderColor: 'white',
          }]} />
          <Pressable onPress={() => handleColourChange('green')} style={[{
            width: 32,
            height: 32,
            borderRadius: 50,
            backgroundColor: '#22c55e',
            // add a thick border to the button
            borderWidth: 3,
            borderColor: '#ffffff50',
          }, colour == 'green' && {
            borderColor: 'white',
          }]} />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
