# Project policy

Project release profile: release-managed

This repository contains a static Vercel country-only response endpoint. Keep source, deployment and URLs independent of application repositories. Do not add cookies, storage, analytics SDKs, IP response fields, middleware or functions.

Develop on a development branch. Commit, push, create the remote repository/project, merge and publish only with explicit user approval. Validate response-header configuration locally, then verify real Vercel country headers, CORS, forged input and warm-cache behavior before production acceptance.
