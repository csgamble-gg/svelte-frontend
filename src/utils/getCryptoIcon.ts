import { BTC, DOGE, ETH, LTC, XRP } from '@csgamble-gg/nebula-ui';

const Cryptos = {
	BTC,
	ETH,
	DOGE,
	XRP,
	LTC
};

export const getCrytpoIcon = (symbol: string): keyof typeof Cryptos => {
	return Cryptos[symbol];
};
