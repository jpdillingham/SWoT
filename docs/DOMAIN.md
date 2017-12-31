# Exercise

An Exercise is defined as a physical activity with an associated goal and measurable outcome.

The simplest Exercise is one with a binary state; either completed or not completed.

## Fields

Name | Type | Description
--- | --- | ---
Id | Guid/Uuid | Unique identifier.
Name | string | Friendly/display name.
Description | string | Explanation of the exercise, rich text enabled.

### Pseudocode

```c#
Exercise {
    Guid Id
    string Name
    string Description
}
```
# Simple Exercise

A *Simple* exercise is an activity with an atomic goal and outcome.

## Fields

Name | Type | Description
--- | --- | ---
*Id* | *Guid/Uuid* | *Unique identifier (Inherited from Exercise).*
*Name* | *string* | *Friendly/display name  (Inherited from Exercise).*
*Description* | *string* | *Explanation of the exercise, rich text enabled  (Inherited from Exercise).*
Goal | float | The goal metric of the exercise; distance, duration, etc.
Actual | float | The actual metric of of the exercise.
UOM | string | The unit of measure of the Goal and Actual fields; distance in miles or kilometers, duration in minutes or hours, etc.

### Pseudocode

```c#
Basic: Exercise {
    (Guid Id)
    (string Name)
    (string Description)
    float Goal
    float Actual
    string UOM
}
```