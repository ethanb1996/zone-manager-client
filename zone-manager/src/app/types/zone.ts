export type Zone = ZoneDetails & {
    id: number;
}

export type ZoneDetails = {
    name: string;
    points: Array<Array<number>>;
}