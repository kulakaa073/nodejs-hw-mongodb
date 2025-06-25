IMPORTANT NOTE: express can be weird with '\*' path for 404 handling, because of `path-to-regexp` issues.
For now downgrade it to 4.18.2 version as so far i've had best results with it.

How to:

1. Change your package.json dependency:
   `"express": "^4.18.2"`
2. Run in your terminal:
   `npm install express@^4.18.2`
