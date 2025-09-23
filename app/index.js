import { Redirect } from 'expo-router';

export default function Index() {
  // Land on Pantry by default
  return <Redirect href="/(tabs)/pantry" />;
}
