import { goto } from '$app/navigation';
import { omit } from 'lodash-es';
import queryString from 'query-string';
import caseBattle from './CaseBattle/caseBattle';
import deposit from './Deposit/deposit';
import { createModals } from './helpers';

const modalsMap = {
	deposit,
	createBattle: caseBattle
};

export const modals = createModals(modalsMap);

export type Modals = typeof modalsMap;

export const closeModal = (modal: Modals) => {
	const query = queryString.parse(window.location.search);

	const newUrl = queryString.stringify(omit(query, 'modal'));

	const nextUrl = `${window.location.pathname}${newUrl}`;

	goto(nextUrl);
};
