# References

This document lists the references, resources, credits, and acknowledgments for the **24gantanepal** and **sharesanskar** projects.

---

### 24gantanepal (https://www.instagram.com/24ghantanepal/)

### sharesanskar (https://sharesanskar.com/)

```
    // Split items into 3 columns manually for better control
    const columnCount =
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const columns: FeedItem[][] = Array.from(
        { length: columnCount },
        () => [] as FeedItem[]
    );

    // Distribute items across columns in a way that preserves order
    allItems.forEach((item, index) => {
        const columnIndex = index % columnCount;
        columns[columnIndex].push(item);
    });
```

I'd be happy to explain this section in detail:

### Column Count Determination

```javascript
const columnCount =
    window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
```

This line determines how many columns to create based on the current viewport width:

-   If the window width is 1024 pixels or larger (desktop), use 3 columns
-   If the window width is between 640 and 1023 pixels (tablet), use 2 columns
-   If the window width is less than 640 pixels (mobile), use 1 column

This matches the responsive behavior in your Tailwind classes (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).

### Empty Columns Array Creation

```javascript
const columns = Array.from({ length: columnCount }, () => []);
```

This line creates an array of empty arrays. For example:

-   On mobile: `[[], [], []]` (1 empty array)
-   On tablet: `[[], []]` (2 empty arrays)
-   On desktop: `[[], [], []]` (3 empty arrays)

The `Array.from()` method creates a new array from an iterable. The first argument `{ length: columnCount }` is an array-like object with a specified length. The second argument is a mapping function that gets called for each element, and in this case, it returns an empty array `[]` for each position.

### Item Distribution

```javascript
allItems.forEach((item, index) => {
    const columnIndex = index % columnCount;
    columns[columnIndex].push(item);
});
```

This is where the magic happens for the masonry layout. For each item:

1. We calculate which column it should go into using the modulo operator (`%`). The modulo operator returns the remainder after division.
2. `index % columnCount` cycles through the column indices (0, 1, 2, 0, 1, 2, etc. for 3 columns).

3. We then push the item into the appropriate column array.

For example, with 3 columns and 7 items:

-   Item 0 goes to column 0 (0 % 3 = 0)
-   Item 1 goes to column 1 (1 % 3 = 1)
-   Item 2 goes to column 2 (2 % 3 = 2)
-   Item 3 goes to column 0 (3 % 3 = 0)
-   Item 4 goes to column 1 (4 % 3 = 1)
-   Item 5 goes to column 2 (5 % 3 = 2)
-   Item 6 goes to column 0 (6 % 3 = 0)

This creates a balanced distribution that maintains item order. When new items are loaded, they'll continue this pattern, ensuring that:

1. Items maintain their relative order within each column
2. New items are distributed evenly across all columns
3. Items don't "jump" between columns during loads

The key advantage of this approach over CSS columns is that it gives you explicit control over which items go where, preventing the browser's automatic reflow behaviors that were causing your issue.
