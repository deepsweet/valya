import clean from 'start-clean';
import eslint from 'start-eslint';

export const lint = eslint();
export const cleanBuild = clean('build/');
export const cleanCoverage = clean('coverage/');
