import { useEffect, useState, useCallback, useMemo } from "react";

/**
 *
 * @param experimentID
 * @returns {unknown}
 */
export default function useGoogleOptimize(experimentID) {
    const [variant, setVariant] = useState(null);
    const updateVariant = useCallback((value) => setVariant(value === undefined || value === null ? "0" : value), []);

    /**
     *
     * @type {(...args: any[]) => any}
     */
    const delayedInitialization = useCallback(() => {
        const { google_optimize } = window;
        const value = google_optimize && google_optimize.get(experimentID);
        updateVariant(value);
    }, []);
    /**
     *
     */
    useEffect(() => {
        const { dataLayer } = window;
        if (dataLayer) {
            const hideEnd = dataLayer && dataLayer.hide && dataLayer.hide.end;

            if (hideEnd) {
                dataLayer.hide.end = () => {
                    delayedInitialization();
                    hideEnd();
                };
            } else {
                delayedInitialization();
            }

            dataLayer.push("event", "optimize.callback", {
                name: experimentID,
                callback: updateVariant,
            });
        }

        return () => {
            dataLayer.push("event", "optimize.callback", {
                name: experimentID,
                callback: updateVariant,
                remove: true,
            });
        };
    }, []);

    return useMemo(() => variant, [variant]);
}
