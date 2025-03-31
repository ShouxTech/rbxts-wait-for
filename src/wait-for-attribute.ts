import { waitForSignal } from "./wait-for-signal";

export function waitForAttribute(instance: Instance, attribute: string, timeout: number) {
    const res = instance.GetAttribute(attribute);
    if (res) return res;

    waitForSignal(instance.GetAttributeChangedSignal(attribute), timeout);

    return instance.GetAttribute(attribute);
}

