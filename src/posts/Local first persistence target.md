---
title: 'Local first persistence target'
slug: 'local-first-persistence-target'
---

*Like* the filesystem, but with a few extra features
- Networked - can receive and send over local HTTP - streaming, sockets
- Granular permissions/capabilities
- Given structured schemas, can support arbitrary data transformations for export & interop
- Gives the user guardrails against privacy leaks, bounds for disk usage, and monitors usage per client app
- Can *serve* a persistent local copy of an entire web app making updates opt-in
Could manage data and expose local endpoints as a standalone binary, as a browser extension, 