import { Trove } from "@rbxts/trove";
import InternalSignal from "@rbxts/sleitnick-signal";

interface Signal<T extends unknown[]> {
    Once(callback: (...args: T) => void): Trove.Trackable;
}

export function waitForSignal<T extends unknown[]>(signal: Signal<T>, timeout: number) {
    const waitSignal = new InternalSignal<unknown[]>();
    const trove = new Trove();

    trove.add(task.delay(timeout, () => {
        waitSignal.Fire();
    }));
    trove.add(signal.Once((...args) => {
        waitSignal.Fire(...args);
    }));

    const res = waitSignal.Wait();

    // Using task.defer to prevent a specific task.cancel error from Trove destroy.
    task.defer(() => {
        trove.destroy()
    });

    return res;
}
