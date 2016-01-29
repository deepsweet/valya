import Start from 'start';
import logger from 'start-simple-logger';
import clean from 'start-clean';
import eslint from 'start-eslint';

const start = Start(logger);

export function lint() {
    return start(
        eslint()
    );
}

export function cleanBuild() {
    return start(
        clean('build/')
    );
}

export function cleanCoverage() {
    return start(
        clean('coverage/')
    );
}
