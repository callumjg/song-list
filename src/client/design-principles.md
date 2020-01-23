# Utils

Are always:

- Re-useable
- Fill all available width of container (use padding not margin)
- Grow to fill container
- Rely on props not inheritance from parent

Are ideally

- Dumb
- Receive necessary logic/callbacks as props
- Responsive
- Self contained
- Indifferent to parent (styles/size/etc)

## pages

- Contain necessary business logic in highest level component
- Move re-usable business logic to hooks where possible
- Manage layout of children

## layout

Directory containing components responsible for containing large
