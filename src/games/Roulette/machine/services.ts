import { createBaseServices } from '$games/machine/createBaseServices';
import { HouseGameEnum } from '$types/index';
import * as api from '../state/api';
import * as general from '../state/general';

export const { mutationBet } = createBaseServices({
	services: {
		...api
	},
	moduleName: HouseGameEnum.roulette,
	general
});
