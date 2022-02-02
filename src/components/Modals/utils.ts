import { goto } from '$app/navigation';
import { omit } from 'lodash-es';
import queryString from 'query-string';
import deposit from './Deposit/deposit';
import { createModals } from './helpers';

const modalsMap = {
	deposit
};

export const modals = createModals(modalsMap);

export type Modals = typeof modalsMap;

export const closeModal = (modal: Modals) => {
	const query = queryString.parse(window.location.search);

	const newUrl = queryString.stringify(omit(query, 'modal'));
	console.log(newUrl);

	const nextUrl = `${window.location.pathname}${newUrl}`;

	goto(nextUrl);
};
