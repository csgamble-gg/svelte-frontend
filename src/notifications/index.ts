import { toastList } from '$stores/toasts/toasts';
import { mapValues } from 'lodash-es';
import error from './error/error';
import info from './info/info';
import success from './success/success';

type NotificationProps = {
	message: string;
	title?: string;
};

export const notificationMap = {
	error,
	info,
	success
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
