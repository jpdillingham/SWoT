export const EXERCISE_TYPES = [ 'Weightlifting', 'Bodyweight', 'Cardio', 'Stretching', 'Balance' ]

export const EXERCISE_URL_BASE = 'https://www.bodybuilding.com/exercises/'

export const EXERCISE_AVATAR_COLOR = '#00c853'

export const ROUTINE_AVATAR_COLOR = '#ffab00'
export const CARD_WIDTH = 390

export const ROUTINES = [
    {
        id: 'f5d161a9-4913-4052-bc80-c82643ba7d25',
        name: 'Cardio',
        exercises: [
            {
                id: "0f2f3a76-c1a2-4a53-bec9-0f124a1f3b16",
                name: "Running",
                type: "Cardio",
                url: "https://www.bodybuilding.com/exercises/running-treadmill",
                metrics: [
                    {
                        name: "Distance",
                        uom: "Miles"
                    },
                    {
                        name: "Time",
                        uom: "Minutes"
                    }
                ]
            }
        ]
    },
    {
        id: 'f8a39189-0824-4dd6-a621-eb76ea85306d',
        name: 'Workout A',
        exercises: [
            {
                id: "c4a10b9d-d5de-434e-bac4-c3a4ff014f82",
                name: "Bench Press",
                type: "Weightlifting",
                url: "https://www.bodybuilding.com/exercises/barbell-bench-press-medium-grip",
                metrics: [
                    {
                        name: "Weight",
                        uom: "Lbs"
                    },
                    {
                        name: "Sets"
                    },
                    {
                        name: "Reps"
                    }
                ]
            },
            {
                id: "29d53257-5eca-4083-9019-81dc62425801",
                name: "Squat",
                type: "Weightlifting",
                url: "https://www.bodybuilding.com/exercises/barbell-full-squat",
                metrics: [
                    {
                        name: "Weight",
                        uom: "Lbs"
                    },
                    {
                        name: "Sets"
                    },
                    {
                        name: "Reps"
                    }
                ]
            },
            {
                id: "0f2f3a76-c1a2-4a53-bec9-0f124a1f3b15",
                name: "Chinups",
                type: "Bodyweight",
                url: "https://www.bodybuilding.com/exercises/chin-up",
                metrics: [
                    {
                        name: "Sets"
                    },
                    {
                        name: "Reps"
                    }
                ]
            },
        ]
    }
]