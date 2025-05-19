import { TouchableOpacity, StyleSheet } from 'react-native';
import { YStack, XStack, Card,Text } from 'tamagui';
import { colors, iconSize } from '../../../styles';
// import { CusText } from '~/components/CusText';
import { WhiteBold,PrimBold,PrimRegular,YellowBold } from "../../../../app/components/CusText";

import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const NotificationCard = ({notification,onPress}) => {


  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{ width: '100%' }}>
      <Card
        gap={6}
        unstyled
        padded
        backgroundColor={'white'}
        style={[styles.card]}>
        <XStack alignItems="center" gap={10}>
          <YStack flex={1}>
            <XStack>
              <PrimBold bold size="md" color="primary">
                {notification.title}
              </PrimBold>
            </XStack>
            <XStack>
              <PrimRegular size="sm" color="labelGray">
                {notification.body}
              </PrimRegular>
            </XStack>
          </YStack>
          <YStack>
          <XStack justifyContent="flex-end">
            <PrimBold bold size="sm" color="red">
              {!notification.read && "New"}
            </PrimBold>
          </XStack>
          <XStack justifyContent="flex-end">
            <YellowBold bold size="sm" color="yellow">
              {/* {notification.timestamp} */}
              {dayjs(notification.timestamp).fromNow()}
            </YellowBold>
          </XStack>
          </YStack>
        </XStack>
      </Card>
    </TouchableOpacity>
  );
};

// List of notifications
export const NotificationsList = () => {
  return (
    <YStack padding={16} gap={10}>
      {sampleNotifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </YStack>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 6,
  },
  unreadCard: {
    backgroundColor: '#E6F0FF',
  },
  boldText: {
    fontWeight: 'bold',
  },
  primBtn: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secBtn: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationCard;
