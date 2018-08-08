import { 
    red500, blue500, green500, orange500,
    purple500, indigo500, lime500, yellow500,
    pink500, cyan500, teal500, deepOrange500,
    deepPurple500, lightBlue500, lightGreen500, amber500,
} from "material-ui/styles/colors";

export const API_ROOT = "https://u8sie6ns6c.execute-api.us-east-1.amazonaws.com/deployment"

export const EXERCISE_TYPES = [ 'Weightlifting', 'Bodyweight', 'Cardio', 'Stretching', 'Balance' ]

export const WORKOUT_AVATAR_COLOR = '#f44336'
export const EXERCISE_AVATAR_COLOR = '#00c853'

export const ROUTINE_AVATAR_COLOR = '#ffab00'
export const CARD_WIDTH = 390

export const INTENTS = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    COPY: 'COPY',
}

export const COGNITO_POOLID = 'us-east-1_OhnX3yEY5'
export const COGNITO_CLIENTID = '18b132av2gkfgl3m793qcgjsd3'

export const FILTER_LIMIT_OPTIONS = [ 
    { caption: '5', value: 5 }, 
    { caption: '10', value: 10 }, 
    { caption: '25', value: 25 }, 
    { caption: '50', value: 50 }, 
];

export const FILTER_SORT_ORDER_OPTIONS = [ 
    { caption: 'Oldest First', value: 'asc' }, 
    { caption: 'Newest First', value: 'desc' },
];

export const CHART_SERIES_COLORS = [
    red500, blue500, green500, orange500,
    purple500, indigo500, lime500, yellow500,
    pink500, cyan500, teal500, deepOrange500,
    deepPurple500, lightBlue500, lightGreen500, amber500,
];

export const CHART_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
    },
    hover: {
        mode: 'nearest',
        intersect: true,
    },
};

export const CHART_SERIES_OPTIONS = {
    fill: false,
    pointRadius: 4,
    pointHoverRadius: 6,
};