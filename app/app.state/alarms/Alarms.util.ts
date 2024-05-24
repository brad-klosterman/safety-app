import type { AlarmState } from './types/Alarms.types';

const isActiveAlarm = (alarm_state: AlarmState) =>
    !['KEYHOLDER_CLOSED', 'CLOSED'].includes(alarm_state);

export { isActiveAlarm };
