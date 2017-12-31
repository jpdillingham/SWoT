# Exercise

The Exercise object contains a name, a url pointing to a description of the exercise, and an associative array containing the metrics associated with the exercise.

Values provided for the 'value' field of a metric serve as the default values and can be overridden by the user at the time the exercise is performed.  If no default value is necessary this field can be omitted.

## Model

```javascript
exercise: {
    id: 'Guid/Uuid',
    name: 'string',
    url: 'string',
    metrics: {
        metric: {
            uom: 'string',
            value: float
        },
    }
}
```

## Examples

```javascript
{ 
    id: 'c4a10b9d-d5de-434e-bac4-c3a4ff014f82',
    name: 'bench press',
    url: 'https://www.bodybuilding.com/exercises/barbell-bench-press-medium-grip',
    metrics: {
        weight: {
            uom: 'lbs',
            value: '205',
        },
        sets: {
            value: 3
        },
        reps: {
            value: 5
        }
    } 
}
```

```javascript
{ 
    id: '29d53257-5eca-4083-9019-81dc62425801',
    name: 'squat',
    url: 'https://www.bodybuilding.com/exercises/barbell-full-squat',
    metrics: {
        weight: {
            uom: 'lbs',
            value: '265',
        },
        sets: {
            value: 3
        },
        reps: {
            value: 5
        }
    } 
}
```

```javascript
{ 
    id: '0f2f3a76-c1a2-4a53-bec9-0f124a1f3b16',
    name: 'running',
    url: 'https://www.bodybuilding.com/exercises/running-treadmill',
    metrics: {
        distance: {
            uom: 'miles',
            value: '1',
        },
        time: {
            uom: 'minutes',
            value: '10',
        }
    } 
},
```

# Routine

The Routine object contains an ordered array of Exercises, keyed by name.

## Model

```javascript
routine: [
    id: 'Guid/Uuid',
    name: 'string',
    exercises: [
        { id: 'Guid/Uuid' },
    ]
]
```

## Examples

```javascript
{
    id: 'f5d161a9-4913-4052-bc80-c82643ba7d25',
    name: 'cardio',
    exercises: [
        { id: '0f2f3a76-c1a2-4a53-bec9-0f124a1f3b16' }, // 'running'
    ]
}
```

```javascript
{
    id: 'f8a39189-0824-4dd6-a621-eb76ea85306d',
    name: 'workout A',
    exercises: [
        { id: 'c4a10b9d-d5de-434e-bac4-c3a4ff014f82' }, // 'bench press'
        { id: '29d53257-5eca-4083-9019-81dc62425801' }, // 'squat'
    ]
}
```