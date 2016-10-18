/* @flow */

export default {
    integer: (minimum: number, maximum: number): number => Math.floor((Math.random() * (maximum - minimum)) + minimum),
};
