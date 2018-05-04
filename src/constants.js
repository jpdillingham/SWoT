export const API_ROOT = "https://u8sie6ns6c.execute-api.us-east-1.amazonaws.com/deployment"

export const EXERCISE_TYPES = [ 'Weightlifting', 'Bodyweight', 'Cardio', 'Stretching', 'Balance' ]

export const EXERCISE_URL_BASE = 'https://www.bodybuilding.com/exercises/'

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
    { caption: '50', value: 25 } 
];

export const FILTER_SORT_ORDER_OPTIONS = [ 
    { caption: 'Oldest First', value: 'asc' }, 
    { caption: 'Newest First', value: 'desc' } 
];