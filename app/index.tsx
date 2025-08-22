import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to login screen when app starts
  return <Redirect href="/login" />;
}
