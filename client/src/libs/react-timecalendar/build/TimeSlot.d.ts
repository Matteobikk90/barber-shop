/// <reference types="react" />
import PropTypes from 'prop-types';
import { TimeSlotProps } from './types';
declare function TimeSlot(props: TimeSlotProps): JSX.Element;
declare namespace TimeSlot {
    var propTypes: {
        classSet: PropTypes.Requireable<string>;
        time: PropTypes.Requireable<string>;
        onTimeClick: PropTypes.Requireable<(...args: any[]) => any>;
    };
    var defaultProps: {
        classSet: string;
        time: string;
        onTimeClick: any;
    };
}
export default TimeSlot;
