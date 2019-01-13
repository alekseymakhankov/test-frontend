import { IFetchedDataItem, IFetchedData, IResolvedFetchedDataItem } from '~types';
import { normalizeString } from './';

export const resolveUserFriends = (
  user: IFetchedDataItem,
  data: IFetchedData,
): IResolvedFetchedDataItem => {
  const resolvedFriends = user.friends
    .reduce(
      (names: IFetchedDataItem[], friendName: string) => {
        const friend = data.Brastlewark.find(
          friend => normalizeString(friend.name) === normalizeString(friendName),
        );
        if (friend) {
          names.push(friend);
        }
        return names;
      },
      [],
    );
  return Object.assign({}, user, { friends: resolvedFriends });
};
