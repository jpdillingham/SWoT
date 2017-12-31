# Exercise

An Exercise is defined as a physical activity with an associated goal and measurable outcome.

The simplest Exercise is one with a binary state; either completed or not completed.

## Fields

Name | Type | Description
--- | --- | ---
Id | Guid/Uuid | Unique identifier.
Name | string | Friendly/display name.
Description | string | Explanation of the exercise, rich text enabled.

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
Id | Guid/Uuid | Unique identifier (Inherited from Exercise).
Name | string | Friendly/display name  (Inherited from Exercise).
Description | string | Explanation of the exercise, rich text enabled  (Inherited from Exercise).

```c#
Basic: Exercise {
    (Guid Id)
    (string Name)
    (string Description)
    float Goal
    float Outcome
    string UOM
}
```