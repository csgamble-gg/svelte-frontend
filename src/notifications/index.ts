import { toastList } from '$stores/toasts/toasts';
import { mapValues } from 'lodash-es';
import error from './error/error';

type NotificationProps = {
	message: string;
};

export const notificationMap = {
	error
};

export const notifications = mapValues(
	notificationMap,
	(config, name) => ({
		open: (props: NotificationProps) => {
			toastList.add({
				name,
				props
			});
		}
	})
);
