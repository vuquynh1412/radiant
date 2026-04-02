# Layout Decision Checklist

- Is every dynamic content region inside auto layout?
- Is the screen broken into meaningful nested groups rather than one flat frame?
- Does each important frame have an explicit flow direction?
- Does each important child have a clear resize rule?
- Are gap and padding tokens consistent with the design-system scale?
- Is wrapping used where content count can grow?
- Does the layout preserve reading order when it collapses on smaller screens?
- Are decorative layers isolated so they do not corrupt layout behavior?
