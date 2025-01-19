import { Stack } from 'expo-router';

export default function Layout() {
    return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#2D2D2D' }}} />;
}