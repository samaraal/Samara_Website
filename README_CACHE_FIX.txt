Samara Website cache fix

Replace:
1. index.html
2. js/app.js

The homepage now loads app.js with version ?v=20260825-v237 so Edge/Chrome request the new WhatsApp-logo script instead of reusing the older cached v236 file.

For other HTML pages, if required later, change only the app.js query from v236 to v237; do not replace those pages unless they are separately updated.
