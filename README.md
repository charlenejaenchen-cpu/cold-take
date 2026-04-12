# Coldtake
### [Publication tagline placeholder — to be defined with final name]

---

## 1. The Idea

Coldtake is an online fashion publication and community platform built for a generation in Germany that is deeply passionate about fashion but has no real place to participate in it. It is not for influencers. It is not for industry insiders. It is for the person who has strong opinions about what fashion means, where it's going, and why the conversation around it needs new voices.

The name is a placeholder. [Name reasoning to be added once final name is decided.]

Coldtake publishes opinion pieces written by verified community members — not a closed editorial team. Anyone can sign up, create a profile, and publish their take. The platform is moderated but open. The editorial voice is not one person's — it is the collective voice of people who were never given a microphone.

Beyond accessibility, Coldtake exists to decentralize trends. In fashion, trends dominate to the point where they override personal taste, individual presentation, and genuine self-expression. By platforming unpopular opinions, Coldtake gives people permission to embrace their own style regardless of the season, regardless of what is systematically liked or disliked. It returns clothing to its actual meaning: personal outward representation. You wear what you are, not what this quarter decided.

**Prototype approach:** For the working prototype, three fake user profiles will be created, each publishing three articles. The application is designed and built as if any verified community member can use it — the fake users simply seed the content to make the prototype feel alive.

---

## 2. Editorial Identity

**Voice:** Confident, direct, occasionally contrarian. Warmly critical of the industry from the inside out. Never cynical, always curious.

**Aesthetic:** Bold editorial typography. Strong use of negative space. Influenced by 032c, Fantastic Man, and System Magazine — but more accessible in tone. Black, white, and one accent color. No stock photography. Either strong editorial images or no images at all.

**Content pillars:**
- **Opinion** — Long and short-form takes on fashion culture, trends, industry practices, and style philosophy. Written by community members. Examples: *"Why all-black will always win"*, *"German fashion has an identity problem"*, *"Fast fashion guilt is a distraction"*
- **Events** — *(Deprioritised for v1. To be built if time allows after core article and user logic is complete.)*

---

## 3. Target User

**Primary:** 18–28 year olds in Germany. Passionate about fashion but not working in it. Frustrated by how closed the scene feels. Digitally fluent, aesthetically aware, opinionated. Likely discovering the site through Instagram or word of mouth.

**Secondary:** Students in fashion-adjacent fields — communication design, media, cultural studies — looking for entry points into the industry and a place to contribute.

**Device behaviour:** Primarily mobile for browsing and reading. Desktop for longer reading sessions and for writing and publishing articles. This split is central to every responsive design decision.

**What they need:**
- To feel like the publication was made for them, not just accessible to them
- To read opinions that reflect their own frustrations and curiosities about fashion
- A place to publish their own voice without needing credentials
- Permission to have taste that ignores trends

---

## 4. Data Models

### User
```
{
  username: String (unique),
  email: String (unique),
  passwordHash: String,
  bio: String,
  profileImage: String (URL or filename),
  joinedAt: Date
}
```

### Article
```
{
  title: String,
  slug: String (auto-generated from title),
  summary: String,
  body: String (HTML),
  tag: String (e.g. "industry", "style", "culture", "trends"),
  coverImage: String (URL or filename),
  publishedAt: Date,
  author: ObjectId (ref: User),
  viewCount: Number (default: 0),
  featured: Boolean (default: false)
}
```

### Event *(deprioritised — model defined for future use)*
```
{
  title: String,
  description: String,
  city: String,
  location: String,
  date: Date,
  link: String,
  type: String,
  accessLevel: String ("open" | "ticketed" | "invite-only")
}
```

---

## 5. Site Structure & Page Anatomy

Every page shares a consistent **Navbar** and **Footer**.

**Navbar (all pages):**
- Left: Publication logo / wordmark (links to Home)
- Center (desktop): Opinion | Events | About
- Right: Login button (if logged out) / Profile avatar + username (if logged in)
- Mobile: Hamburger menu → full-screen overlay with same links + login/profile

**Footer (all pages):**
- Left: Logo + short one-line description
- Center: Nav links — Opinion, Events, About
- Right: Contact email or link to contact form
- Bottom bar: © Coldtake [year] — All rights reserved

---

### 5.1 Home Page `/`

**Purpose:** First impression. Sets the tone of the publication. Draws the visitor into the community.

**Layout (top to bottom):**

**Section 1 — Hero (full viewport height)**
- Full screen on load — visitor must scroll to see more
- Large typographic treatment of the publication slogan: *"Because what is fashion without you"* (placeholder)
- Minimal. Text only or text with subtle background treatment.
- No navigation distraction — the statement lands first

**Section 2 — What is Coldtake**
- Short explanatory paragraph: what the platform is, who it is for, why it exists
- Not a full about page — 3–4 sentences maximum
- CTA button: "Start reading" → links to `/opinions`
- Secondary CTA: "Publish your take" → links to `/register` (if logged out) or `/publish` (if logged in)

**Section 3 — Most Popular Opinions**
- Section heading: "Most read"
- Grid of article preview cards (3 on desktop, 1 column on mobile)
- Each card shows: cover image (if exists), article title, author name + avatar, tag, short summary, view count
- Cards link to individual article pages `/opinions/:slug`
- "See all opinions" link → `/opinions`

**Section 4 — Contact**
- Section heading: "Get in touch"
- Brief copy: invitation to reach out with questions, feedback, or collaboration ideas
- Simple form: Name field, Email field, Message textarea, Submit button
- On submit: displays confirmation message (no page reload — client-side)

---

### 5.2 Opinions Index `/opinions`

**Purpose:** Browse all published articles. Entry point for discovery.

**Layout:**
- Page heading: "Opinions"
- Controls row (below heading):
  - **Search bar** — left aligned, searches across article title and author username as the user types (client-side, no page reload)
  - **Topic filter** — pill/tab style: All | Style | Industry | Culture | Trends
  - **Sort dropdown** — Newest first | Oldest first | Most viewed
- Article grid: 3 columns desktop, 2 tablet, 1 mobile
- Each card: cover image (if exists), title, summary (truncated), author avatar + name, date, tag badge, view count
- Cards link to `/opinions/:slug`
- Pagination or "load more" button at bottom
- If search returns no results: "No opinions found for '[query]'" message

**Interactions:**
- Search bar filters visible cards in real time as the user types — matches on title or author name
- Topic filter pills update the visible cards without page reload — search and sort state is preserved when switching topics
- Sort dropdown re-orders the current visible set client-side
- All three controls work together — a user can search for a keyword, filter by Culture, and sort by most viewed simultaneously
- Clicking a card navigates to the article page

**Technical note on view counter:**
On every `GET /opinions/:slug` request, the route increments the article's `viewCount` field by 1 before rendering using MongoDB's `$inc` operator. This is atomic and safe for concurrent visits. The count is then passed to the EJS template and displayed on the article page and article cards. No additional setup required beyond the `viewCount: Number` field already defined in the Article model.

---

### 5.3 Article Page `/opinions/:slug`

**Purpose:** The full reading experience. Core of the publication.

**Layout:**
- Article title (large, editorial)
- Author row: avatar, username (links to `/profile/:username`), published date, tag badge
- Cover image (full width, if exists)
- Article body (long-form text, well-spaced, readable)
- View count increments on each visit (server-side)
- End of article: author bio card — avatar, username, bio, link to their profile
- "More from this author" — 2 article previews linking to `/opinions/:slug`
- "More opinions" — 2 unrelated article previews

**Interactions:**
- View count silently increments on page load
- Author name and avatar are always linked to the author's profile

---

### 5.4 User Registration `/register`

**Purpose:** Create an account to be able to publish.

**Layout:**
- Page heading: "Join Coldtake"
- Brief copy: what joining means, that it's free, that you can publish
- Form: Username, Email, Password, Confirm password, Short bio (optional), Submit button
- Link below form: "Already have an account? Log in" → `/login`

**Interactions:**
- Client-side validation before submit (password match, required fields)
- On success: redirect to `/profile/:username`
- On error: inline error messages per field

---

### 5.5 Login `/login`

**Layout:**
- Page heading: "Welcome back"
- Form: Email, Password, Submit
- Link: "No account yet? Join" → `/register`

**Interactions:**
- On success: redirect to homepage or previously visited page
- On error: inline error message
- Session persists across pages — navbar updates to show profile state

---

### 5.6 User Profile `/profile/:username`

**Purpose:** Public-facing page for each community member. Shows their identity and their contributions.

**Layout:**
- Profile header: avatar, username, bio, joined date
- Section: "Published opinions" — grid of all articles by this user (same card style as opinions index)
- If viewing your own profile: "Edit profile" button + "Write a new opinion" button

**Interactions:**
- "Edit profile" → `/profile/edit` (protected — only accessible when logged in as that user)
- "Write a new opinion" → `/publish`

---

### 5.7 Edit Profile `/profile/edit` *(protected)*

**Layout:**
- Pre-filled form: username, bio, profile image upload
- Save changes button
- Delete account option (with confirmation step)

---

### 5.8 Publish Article `/publish` *(protected)*

**Purpose:** Where community members write and submit their opinion pieces.

**Layout:**
- Page heading: "Write your take"
- Form:
  - Title field
  - Tag selector (dropdown: Industry / Style / Culture / Trends)
  - Summary field (short, shown in card previews)
  - Body textarea (rich or plain text)
  - Cover image upload (optional)
  - Submit button: "Publish"
- Preview toggle: shows how the article will look before publishing

**Interactions:**
- Only accessible when logged in — redirect to `/login` if not
- On submit: creates article in DB, redirects to the new article page `/opinions/:slug`

---

### 5.9 Edit / Delete Article *(protected)*

- Edit button visible on article page `/opinions/:slug` only when logged in as the author
- Edit → `/opinions/:slug/edit` — same form as publish, pre-filled
- Delete → confirmation modal → deletes from DB → redirect to `/opinions`

---

### 5.10 About Page `/about`

**Layout:**
- Full editorial page
- Publication mission statement
- The decentralization of trends — explained in full
- Who can contribute and how
- CTA: "Join and publish" → `/register`

---

### 5.11 Events `/events` *(deprioritised — build if time allows)*

Placeholder route. Either a "coming soon" page or not linked in nav until built.

---

## 6. User Journeys

### Journey A — First-time visitor (mobile, not logged in)
1. Lands on Home via shared link
2. Reads the hero slogan — scrolls down
3. Reads the short description of Coldtake
4. Browses most popular article cards
5. Taps an article — reads it in full
6. Sees author bio at the bottom — taps author name → visits their profile
7. Scrolls profile, reads another article
8. Returns to home, fills in contact form out of curiosity

### Journey B — Returning reader who wants to publish (desktop)
1. Arrives on Home — clicks "Publish your take"
2. Redirected to `/login` — logs in
3. Redirected back — navbar now shows their avatar
4. Navigates to `/publish`
5. Writes article, selects tag, adds summary, submits
6. Lands on their published article page
7. Visits their own profile to see it listed

### Journey C — Browsing by interest (desktop)
1. Lands on `/opinions`
2. Clicks "Trends" tag filter — grid updates
3. Reads one article
4. Clicks author name — visits their profile
5. Reads a second article by the same author

### Journey D — You seeding the prototype
1. Log in as fake user 1
2. Publish 3 articles
3. Log out — log in as fake user 2
4. Publish 3 articles
5. Repeat for fake user 3
6. Result: 9 articles across 3 distinct author profiles — prototype feels alive

---

## 7. Responsive Design Strategy

### The Module's Real Requirement

ID_19 is not asking you to make a website that works on mobile. It is asking you to demonstrate that you understand *why* design decisions change across contexts — and that you can connect those decisions back to real user needs. The annotated portfolio is where that argument lives.

### The Core Design Argument

Your user is a 20-year-old in Hamburg who found Coldtake through an Instagram story. She is reading on her phone, probably on the U-Bahn, probably with one thumb. She has never been to a fashion event. She has a lot of opinions about fashion that nobody has ever asked for.

Every responsive decision you make should be justifiable by asking: *does this serve her in that moment?*

That is the argument you make in your ID_19 portfolio. Not "I used media queries." But "I designed for a specific person in a specific context, and here is how that thinking shaped every breakpoint."

### Breakpoint System

Use a mobile-first approach. Write base CSS for mobile, then add complexity at larger screens.

```
Base (default):   0px+      — single column, mobile
sm breakpoint:    480px+    — minor adjustments, larger phones
md breakpoint:    768px+    — tablet, 2-column grids appear
lg breakpoint:    1024px+   — desktop, full layout
xl breakpoint:    1280px+   — wide desktop, max content width caps
```

Set a max content width of around 1200px centered — prevents lines from becoming unreadably long on wide screens.

### Typography as Responsive Design

Typography is not decoration — it is the primary design tool for a text-heavy editorial publication. Every type decision carries meaning and has a responsive consequence.

**Headline scaling:**
- Mobile: large enough to stop a scroll, but contained to the screen. Roughly 2.2–2.8rem.
- Desktop: can be much larger and more expressive. 4–6rem for hero moments.
- The shift is not just size — it is presence. On desktop a headline anchors a layout. On mobile it fills the frame.

**Body text:**
- Minimum 17px on mobile. Never go below this for long-form reading — it causes fatigue.
- Line height 1.7–1.8 on mobile for comfortable single-column reading.
- On desktop: constrain the measure (line length) to 65–75 characters. Long lines are harder to read. Use `max-width` on the article body container.
- This decision — limiting line length on desktop — is a meaningful, documentable design choice rooted in typography research (Bringhurst's optimal measure).

**Typeface choices (to decide in Figma):**
- Consider a strong serif for headlines — creates editorial authority and contrast
- A clean sans-serif for body and UI
- The pairing itself is a design decision worth documenting in ID_19

### Layout Shifts Across Breakpoints

Document each of these decisions in your portfolio with reasoning:

**Navigation:**
- Mobile: hamburger icon → full-screen overlay menu. Reasoning: thumb reach. Bottom half of the screen is the natural tap zone. A top-right hamburger is reachable; a full menu that appears from the top keeps interaction in the upper zone for that first tap.
- Desktop: horizontal nav bar, all links visible. No need to hide — screen real estate exists.
- Document: why full-screen overlay rather than a slide-in drawer? Because Coldtake's identity is bold and direct — a full-screen takeover matches the editorial voice.

**Home hero:**
- Mobile: text only, full viewport height, centered. The slogan fills the screen. No image competing with it.
- Desktop: can introduce more typographic complexity — larger text, possible asymmetric layout.
- Reasoning: on mobile, loading a large image above the fold costs performance and attention. The text *is* the design.

**Article grid:**
- Mobile: 1 column. Each card full width. Thumb-tappable.
- Tablet (768px+): 2 columns.
- Desktop (1024px+): 3 columns.
- Reasoning: grid density should match how much of each card the user can evaluate at a glance. On a small screen, two columns makes each card too narrow to read the title comfortably.

**Article reading page:**
- Mobile: full-width body text, 17px minimum, generous padding left and right (16–20px) so text never touches the screen edge.
- Desktop: centered column, max-width ~680px for body text regardless of screen width. This is the most important responsive decision on the whole site — it makes long articles readable.
- Document this explicitly in ID_19: the decision to *constrain* width on desktop is counter-intuitive (more space, but you use less of it) and shows typographic understanding.

**Contact form:**
- Mobile: stacked full-width fields. Large tap targets (min 48px height on inputs).
- Desktop: could introduce a 2-column layout for name + email side by side.
- Reasoning: 48px minimum tap target is an accessibility standard (WCAG), not just an aesthetic choice. Document it as such.

**Profile page:**
- Mobile: header stacked vertically (avatar above name above bio), articles in 1-column grid below.
- Desktop: header in a horizontal row, articles in 2–3 column grid.

### Accessibility as Responsive Design

ID_19 mentions "user needs" — accessibility is user needs. Include these in your portfolio:

- Colour contrast minimum AA standard (4.5:1 for body text)
- Focus states on all interactive elements (for keyboard navigation)
- Alt text on all images
- Semantic HTML: `<article>`, `<nav>`, `<main>`, `<header>`, `<footer>` — not just `<div>` everywhere
- These are not bonuses — they are part of designing for real users

### What to Show in the ID_19 Portfolio

- Mood board and design references (032c, Fantastic Man, System Magazine)
- Typography experiments — show 2–3 typeface combinations you tried and why you chose the final one
- Wireframes for mobile and desktop for at least: Home, Article page, Profile page
- Annotated screenshots of the final design explaining specific decisions
- Side-by-side mobile vs desktop comparisons of the same page
- At least one documented "failure" — a layout direction that didn't work and why
- The user context argument — who is reading, where, on what device, and how that drove decisions
- Reflection on what you would do differently

---

## 8. Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Templating | EJS |
| Database | MongoDB (Community Server) |
| ODM | Mongoose |
| Auth | Express-session + bcrypt (for user login) |
| Styling | Plain CSS (mobile-first) |
| Version control | Git + GitHub |
| Deployment | Railway or Render (free tier) |

---

## 9. Module Plans

### SE_19 Web Technologies Basics — Pass/Fail

**How Coldtake covers every qualification goal:**
- Dynamic routes: every article, profile, and opinion page is dynamically rendered from the DB
- CRUD: users can create accounts, publish articles, edit and delete their own articles
- Server-side rendering: EJS templates render all pages
- Client-side JS: tag filtering on opinions index, contact form submission, client-side validation
- Database: MongoDB with Mongoose schemas for User and Article
- Deployment: live URL on Railway or Render

**How to secure the pass:**
- Build the user + article CRUD early — that is the core requirement
- Every route must be dynamic — no hardcoded content in templates
- Write a solid README: what the project is, how to run it locally, what the routes do
- Keep code clean — consistent naming, no dead code, short comments where logic is non-obvious

---

### SE_01 Software Development Basics — Pass/Fail

**How to secure the pass:**
- Commit every time something works — not at the end of sessions
- Commit messages describe what changed: `add article publish route` not `update`
- Use feature branches: `feature/user-auth`, `feature/article-crud`, `feature/profile-page`
- No AI-generated code — write everything yourself, use documentation as reference
- Aim for 3–5 meaningful commits per working session

---

### SE_10 Automated Software Testing — Graded

**Recommended setup:** Jest + Supertest + MongoDB Memory Server

**Tests to write:**

Unit tests (pure functions — write these first, they are easiest to explain):
- `slugify(title)` — generates URL-safe slugs from article titles
- `formatDate(date)` — formats dates for display
- `truncate(text, length)` — truncates article summaries for cards
- `filterByTag(articles, tag)` — filters article array by tag
- `sortArticles(articles, method)` — sorts by date ascending, date descending, or viewCount descending
- `searchArticles(articles, query)` — filters by matching query against title and author username

Integration tests (Express routes via Supertest):
- `GET /` returns 200
- `GET /opinions` returns 200 and renders articles
- `GET /opinions/:slug` returns correct article or 404
- `GET /profile/:username` returns correct user or 404
- `POST /register` creates a new user
- `POST /login` authenticates a user and sets session
- `POST /publish` creates article when authenticated, redirects to login when not
- `DELETE /opinions/:slug` deletes article when author is logged in, 403 when not

End-to-end (at least one):
- User visits home, clicks an article card, arrives at the correct article page

**How to secure a good grade:**
- Be able to explain every test — what it catches, why it exists
- Use MongoDB Memory Server for DB tests — be ready to explain what a test double is and why it makes tests faster and reproducible
- Know your coverage number and discuss what it does and doesn't tell you
- Write at least one test that would have caught a real bug you encountered

---

### ID_19 Responsive Design — Graded

**Deliverables:**
- Annotated PDF portfolio (design process, decisions, experiments, reflection)
- 5-minute video walkthrough showing the site responding across device sizes
- 500-word self-assessment

**How to secure a high grade:**
- Lead with the user argument — every design decision traces back to your specific user in their specific context
- Show genuine experiments and dead ends — not a straight line from idea to outcome
- Document the typographic decisions in depth — the measure constraint on desktop, the minimum size on mobile
- The video should show the site on a real phone if possible
- Reflect honestly on what you would do differently and what gaps remain in your knowledge

---

## 10. Build Order

**Phase 1 — Design (Figma)**
1. Design system — type scale, colour palette, spacing, reusable components (cards, buttons, nav, footer)
2. Core pages designed in Figma — Home, Opinions index, Article page, Profile page
3. Secondary pages — Register, Login, Publish, About
4. Responsive variants — mobile and desktop for each core page

**Phase 2 — Static frontend (HTML + CSS)**
5. Project setup — folder structure, git init, static HTML files
6. Build HTML structure for core pages — Home, Opinions index, Article page, Profile page
7. Apply CSS — implement design system from Figma (type, colour, spacing variables)
8. Responsive CSS — mobile-first, breakpoints added progressively matching Figma designs
9. Remaining pages — Register, Login, Publish, About in HTML + CSS

**Phase 3 — Backend (Node + Express + MongoDB)**
10. Convert project to Node/Express — add EJS, connect MongoDB, restructure folders
11. User model + registration + login + session auth
12. Convert static HTML pages to EJS templates
13. Article model + seed data (3 fake users × 3 articles)
14. Basic read routes — Home, Opinions index, Article page, Profile page rendering from DB
15. Article CRUD routes — publish, edit, delete (protected)
16. Profile edit route (protected)
17. Client-side JS — search, topic filter, sort, contact form, client-side validation

**Phase 4 — Polish + Submission**
18. Tests — unit tests first, then integration tests per route
19. Deployment — Railway or Render, environment variables, test live
20. README — written last, reflects what was actually built
21. Events section — only if all above is complete and time allows
