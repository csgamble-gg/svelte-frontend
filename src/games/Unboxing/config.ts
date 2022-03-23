import { createGameConfig } from '$games/state/setup';
import { HouseGameEnum } from '$types/index';
import { getSession } from '$utils/session';

export const { config, requestClient } = createGameConfig({
	name: HouseGameEnum.unboxing,
	getSession
});
