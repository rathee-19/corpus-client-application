export var EventStatus;
(function (EventStatus) {
    EventStatus["todo"] = "rgba(255,255,255,0.65)";
    EventStatus["urgent"] = "#f5222d";
    EventStatus["doing"] = "#faad14";
    EventStatus["processing"] = "#1890ff";
})(EventStatus || (EventStatus = {}));
// type MinusKeys<T, U> = Pick<T, Exclude<keyof T, keyof U>>
// type Defined<T> = T extends undefined ? never : T
// type MergedProperties<T, U> = { [K in keyof T & keyof U]: undefined extends T[K] ? Defined<T[K] | U[K]> : T[K] }
// type Merge<T extends Object, U extends Object> = MinusKeys<T, U> & MinusKeys<U, T> & MergedProperties<U, T>
