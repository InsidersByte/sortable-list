/* @flow */

import random from '../utils/random';
import { NEXT_NUMBER } from '../constants';

type DataType = Array<{
    id: number,
    position: number,
}>;

type ParamsType = {
    sourceId: number,
    targetId: number,
    data: DataType,
};

export default function move({ sourceId, targetId, data }: ParamsType): DataType {
    const items = [...data];
    const sourceIndex = items.findIndex(o => o.id === sourceId);
    const targetIndex = items.findIndex(o => o.id === targetId);
    const movingUp = sourceIndex > targetIndex;
    let nextTargetPosition;

    const item = { ...items[sourceIndex] };
    const { position: targetMemberPosition } = items[targetIndex];

    if (targetIndex === 0) {
        nextTargetPosition = 0;
    } else if (targetIndex === items.length - 1) {
        nextTargetPosition = targetMemberPosition + NEXT_NUMBER;
    } else {
        const nextTargetMemberIndex = movingUp ? targetIndex - 1 : targetIndex + 1;
        nextTargetPosition = items[nextTargetMemberIndex].position;
    }

    let newPosition;

    if (movingUp) {
        newPosition = random.integer(nextTargetPosition + 1, targetMemberPosition - 1);
    } else {
        newPosition = random.integer(targetMemberPosition + 1, nextTargetPosition - 1);
    }

    item.position = newPosition;

    items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, item);

    return items;
}
