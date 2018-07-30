# Domain

The following describes the data objects used within the application.

# Exercise

The Exercise object contains a name, a url pointing to a description of the exercise, and an array containing the metrics associated with the exercise.

Values provided for the 'value' field of a metric serve as the default values and can be overridden by the user at the time the exercise is performed.  If no default value is necessary this field can be omitted.

## Model

```javascript
exercise: {
    id: 'guid',
    name: 'string',
    type: 'weightlifting' | 'cardio' | 'stretching' | 'balance',
    url: 'string',
    metrics: [
        {
            name: 'string'
            uom: 'string'
        },
    ]
}
```

## Example

```javascript
{
    "id": "4465b1e2-5af9-81ae-2335-84e09598d63c",
    "name": "Bench Press",
    "type": "Weightlifting",
    "url": "https://www.bodybuilding.com/exercises/barbell-bench-press-medium-grip"
    "metrics": [
        {
            "name": "Weight",
            "uom": "Lbs"
        },
        {
            "name": "Sets",
            "uom": null
        },
        {
            "name": "Reps",
            "uom": null
        }
    ],
}
```

# Routine

The Routine object contains a name and an ordered array of Exercise ids.

## Model

```javascript
routine: {
    id: 'guid',
    name: 'string',
    color: 'hex string', 
    exercises: [
        { 
            sequence: int,
            id: 'guid',
            name: 'string',
            type: 'weightlifting' | 'cardio' | 'stretching' | 'balance',
            url: 'string',
            metrics: [
                {
                    name: 'string'
                    uom: 'string'
                },
            ]
        },
    ]
}
```

## Example

```javascript
{
    "id": "fae96198-80a7-da98-0602-d807669692f7",
    "name": "Just Bench",
    "color": "#000000",
    "exercises": [
        {
            "sequence": 1,
            "id": "4465b1e2-5af9-81ae-2335-84e09598d63c",
            "name": "Bench Press",
            "type": "Weightlifting",
            "url": "https://www.bodybuilding.com/exercises/1"
            "metrics": [
                {
                    "name": "Weight",
                    "uom": "Lbs"
                },
                {
                    "name": "Sets",
                    "uom": null
                },
                {
                    "name": "Reps",
                    "uom": null
                }
            ],
        }
    ],
}
```

# Workout

The Workout object represents a single instance of a Routine and mirrors the Routine structure but adds a few additional fields to contain results.

Note that the application treats completed Workouts separately, but the schema is the same.

## Model

```javascript
{
    id: 'guid',
    scheduledTime: long, 
    startTime: long,
    endTime: long, 
    routine: {
        id: 'guid',
        name: 'string',
        color: 'hex string',
        exercises: [
            {
                sequence: int,
                id: 'guid',
                name: 'string',
                type: 'weightlifting' | 'cardio' | 'stretching' | 'balance',
                url: 'string',
                startTime: long,
                endTime: long,
                metrics: [
                    {
                        name: 'string',
                        uom: 'string',
                        value: 'string'
                    }
                ],
                notes: 'string',
            }
        ],
    },
    notes: 'string',
}
```

## Example

```javascript
{
    "id": "75088a40-8bf9-1727-f362-0cb05dc77a2b",
    "scheduledTime": 1524963480000, 
    "startTime": 1524963550635, //result
    "endTime": 1524963566741, //result
    "routine": {
        "id": "b2a2b789-b4f0-f154-9da3-de27112b5585",
        "name": "Running",
        "color": "#FFFFFF",
        "exercises": [
            {
                "id": "0f2f3a76-c1a2-4a53-bec9-0f124a1f3b16",
                "type": "Cardio",
                "name": "Running",
                "url": "https://www.bodybuilding.com/exercises/running-treadmill"
                "startTime": 1524963554264, //result
                "endTime": 1524963559694, //result
                "metrics": [
                    {
                        "name": "Distance",
                        "uom": "Miles",
                        "value": "1" //result
                    },
                    {
                        "name": "Time",
                        "uom": "Minutes",
                        "value": "5" //result
                    }
                ],
                "notes": "notes about this particular exercise", //result
            }
        ],
    },
    "notes": "some workout notes", //result
}
```