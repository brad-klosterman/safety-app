import { type CoverageArea } from '@device';

type SSPContextValue = {
    close_alarm_reasons: string[];
    coverage_areas: CoverageArea[] | null;
};

export type { SSPContextValue };
