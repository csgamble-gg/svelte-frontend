import type { CrashGame } from '$generated/graphql';
import { writable } from 'svelte/store';

export const state = writable<CrashGame | null>(null);
