# JavaScript architecture

The website uses small namespaced classes and composition instead of one large controller. Files are loaded as ordered classic scripts so the site also works when `index.html` is opened directly from the filesystem.

## Where to make common changes

- Edit workflow wording in `data/workflow-steps.js`.
- Edit public project explanations in `index.html`; operational case details must remain inside `app.html`.
- Add team names, roles, email addresses, and photos in `data/team-members.js`.
- Edit operational supplier cases in `data/supplier-cases.js`.
- Add or change domain rules in `models/`.
- Add interface behaviour in a focused class under `components/`.
- Register a project-site component in `app.js` or a workspace component in `remedy-recheck-app.js`.

## Responsibilities

- `core/Component.js` provides DOM lookup, event cleanup, and component lifecycle helpers.
- `core/Application.js` only starts and stops components.
- `models/` contains immutable domain objects.
- `data/` creates the content objects used by the interface.
- `repositories/` owns browser persistence, session storage, data rehydration, and small migrations.
- `state/` owns filtering, selection, updates, and subscriber notifications.
- `services/` contains authentication, reusable calculations, and formatting.
- `components/` contains one interface responsibility per class. Controllers subscribe to state; focused view classes create presentation markup.
- `core/namespace.js` creates the single `window.RemedyRecheck` namespace used by the class files.
- `app.js` and `remedy-recheck-app.js` are composition roots and contain no feature logic.

Every component must continue to work when its target element is absent. The two pages use separate composition roots while sharing the same small lifecycle abstractions.

The authentication shell starts the operational workspace only after a valid session is available. Authentication state uses `sessionStorage`; supplier case changes remain independently stored in `localStorage`.

The project website reads only aggregate totals through `PublicCaseSummaryRepository` and `PublicMetrics`. It never initializes, rewrites, or renders operational case records. `CaseMetrics` accepts both domain objects and stored record snapshots so the metric definitions remain shared between the two pages.
