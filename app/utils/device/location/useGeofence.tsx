import { useEffect, useState } from 'react';

import type { CoverageArea, LocationCoordinates } from './types';

/**
 * Return all polygon point's latitudes.
 *
 * @return number[]
 */
function getLats(coverage_area: CoverageArea): Array<number> {
    const lats = [];

    for (const point of coverage_area) {
        lats.push(point.lat);
    }

    return lats;
}

/**
 * Return all polygon point's longitudes.
 *
 * @returns {Array<number>}
 */
function getLngs(coverage_area: CoverageArea): Array<number> {
    const lngs = [];

    for (const point of coverage_area) {
        lngs.push(point.lng);
    }

    return lngs;
}

/**
 * Determine if given point is contained inside the polygon.
 * Uses the PNPOLY algorithm by W. Randolph Franklin.
 *
 */
function contains(location: LocationCoordinates, coverage_area: CoverageArea): boolean {
    const number_of_points = coverage_area.length;
    const polygonLats = getLats(coverage_area);
    const polygonLngs = getLngs(coverage_area);

    let polygonContainsPoint = false;

    for (let node = 0, altNode = number_of_points - 1; node < number_of_points; altNode = node++) {
        if (
            polygonLngs[node] > location.longitude !== polygonLngs[altNode] > location.longitude &&
            location.latitude <
                ((polygonLats[altNode] - polygonLats[node]) *
                    (location.longitude - polygonLngs[node])) /
                    (polygonLngs[altNode] - polygonLngs[node]) +
                    polygonLats[node]
        ) {
            polygonContainsPoint = !polygonContainsPoint;
        }
    }

    return polygonContainsPoint;
}

const useGeofence = (props: {
    coverage_areas: CoverageArea[] | null;
    location_coordinates: LocationCoordinates | null;
    tracking: boolean;
}) => {
    const { coverage_areas, location_coordinates, tracking } = props;

    const [inside_geofence, setInsideGeofence] = useState(false);

    useEffect(() => {
        function verifySSPCoverage(): boolean {
            let location_covered = false;

            if (!location_coordinates || !coverage_areas) {
                return false;
            }

            coverage_areas.forEach((area) => {
                if (contains(location_coordinates, area)) location_covered = true;
            });

            return location_covered;
        }

        if (tracking) setInsideGeofence(verifySSPCoverage());
    }, [coverage_areas, location_coordinates, tracking]);

    return {
        inside_geofence,
    };
};

export { useGeofence };
