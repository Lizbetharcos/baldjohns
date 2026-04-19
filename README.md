# Mariana Trench Cleanup

A web-based simulation for ocean conservation developed for FullyHacks 2026. This project integrates AI-driven image verification with a dynamic PostgreSQL backend to gamify environmental cleanup.

**Deployment:** [https://fullyhacks2026.vercel.app](https://fullyhacks2026.vercel.app)

---

## Technical Stack
- **Framework:** Next.js 14 (App Router)
- **Database:** Neon (PostgreSQL)
- **AI Service:** Human Delta (Computer Vision)
- **Deployment:** Vercel

---

## The Team
| Name | Role | Focus |
| :--- | :--- | :--- |
| **Konner Rigby** | Lead Backend | Infrastructure, Database, API Routing |
| **Oscar Sanchez** | Frontend Architecture | UI Components, State, UX Flow |
| **Lizbeth Arcos** | AI Integration | Camera Logic, Verification Pipeline |
| **Tania Rivera** | Content & Assets | Data Management, Asset Curation |

---

## Core Features
- **Asset Management:** Custom admin portal for team members to populate the deep-sea catalog.
- **AI Verification:** Server-side proxy to verify user-captured images against specific trash IDs.
- **Relational Data:** Zone-specific trash items with associated impact data and unlock requirements.

---

## API Documentation

### GET `/api/trash`
Fetches all active trash items from the `trash_catalog` table.

### POST `/api/verify`
Handles image verification requests. 
**Body:** `{ "image": string, "trashId": string }`

---

## Local Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/slimkonrad/baldjohns-1.git](https://github.com/slimkonrad/baldjohns-1.git)