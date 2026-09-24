# Remedy Recheck — Group 7

Project website and working web-app prototype for **TEK830 Sustainable Digitalization in Practice** at Chalmers University of Technology.

Remedy Recheck (RR) explores how IKEA sustainability teams could keep two supplier follow-up states separate: **a fix was made** and **the issue improved afterwards**.

## Run locally

The site uses plain HTML, CSS, and object-oriented JavaScript with no build step. You can open `index.html` directly from the folder or serve it locally:

```text
python -m http.server 8765
```

Then open `http://127.0.0.1:8765`.

## Data protection model

The prototype presents operational supplier follow-up data for the Poland context. Case overviews use pseudonymous identifiers, worker identity data is separated from operational evidence, and access is limited by role. The product design also includes encrypted transfer and storage, an audit history, defined retention and deletion dates, and human review before a case can be closed.

## Project structure

- `index.html`: Output 2, the project website explaining the problem, users, concept, team, video placeholder, sustainability dimensions, orders of effects, and references.
- `app.html`: Output 1, the interactive RR supplier follow-up workspace hosted alongside the project website.
- `js/app.js`: Composition root for the project website.
- `js/remedy-recheck-app.js`: Composition root for the operational web app.
- `js/core/`: Shared component lifecycle and application orchestration.
- `js/models/`: Immutable domain objects for cases, rechecks, filters, workflow steps, prototype views, and team members.
- `js/data/`: Editable project and supplier-case data kept separate from interface behaviour.
- `js/repositories/`: Storage boundary with local persistence and a safe in-memory fallback.
- `js/state/`: Observable application state and case selection/filtering.
- `js/services/`: Focused metric and date-formatting services.
- `js/components/`: Focused interface classes with one responsibility each.
- `images/team/`: Team photos and instructions for connecting names, images, and email links.

## Add team members

Add square photos under `images/team/`, then update the six entries in `js/data/team-members.js`. A member with both an image and email becomes a clickable card using a `mailto:` link, with the email also displayed beneath the name.

## Use the working prototype

Open `app.html` and sign in with the course demonstration account:

```text
Email: maria@ikea.com
Password: RemedyRecheck2026
```

Cases are ordered by the nearest next due date, with missing due dates placed last. Select a Polish supplier case and choose **Record outcome recheck**. Saving an outcome updates the dashboard, case status, next action, and audit entry. Case changes are retained in the browser, while the authenticated session ends on sign-out or when the browser session closes.
