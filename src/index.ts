import { waitForAny } from "./wait-for-any";
import { waitForAttribute } from "./wait-for-attribute";
import { waitForSignal } from "./wait-for-signal";

export namespace WaitFor {
    export const signal = waitForSignal;
    export const attribute = waitForAttribute;
    export const any = waitForAny;
}
