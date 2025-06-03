// Based off of https://devforum.roblox.com/t/waitfor-easier-handling-of-multiple-events/340851.

import { Trove } from "@rbxts/trove";
import Signal from "@rbxts/sleitnick-signal";

export function waitForAny(...signals: Signal<unknown>[]): [Signal<unknown>, ...unknown[]] {
    const anySignal = new Signal<[Signal<unknown>, ...unknown[]]>();
    const trove = new Trove();

    for (const signal of signals) {
        trove.add(signal.Connect((...args: unknown[]) => {
            trove.destroy();
            const result: [Signal<unknown>, ...unknown[]] = [signal, ...args];
            anySignal.Fire(...result);
        }));
    }

    return anySignal.Wait();
}
