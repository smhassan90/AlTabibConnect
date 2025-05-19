import 'expo-router/entry';
import 'react-native-reanimated';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  if (
    (!remoteMessage?.notification?.title && !remoteMessage?.data?.title) ||
    (!remoteMessage?.notification?.body && !remoteMessage?.data?.body)
  ) {
    return;
  }

  const newNotification = {
    title: remoteMessage.notification?.title || 'New Notification',
    body: remoteMessage.notification?.body || '',
    timestamp: new Date().toISOString(),
    AppointmentId:remoteMessage.data?.AppointmentId,
    read: false
  };

  try {
    console.log("Hello Osama")
    const existing = await AsyncStorage.getItem('patientNotifications');
    const notifications = existing ? JSON.parse(existing) : [];
    notifications.unshift(newNotification);
    await AsyncStorage.setItem('patientNotifications', JSON.stringify(notifications));
  } catch (err) {
    console.log('Error saving background notification:', err);
  }
});
