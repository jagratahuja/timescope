# TimeScope

TimeScope is a real-time countdown dashboard designed to help users visualize how much time remains until important events.

Instead of simply displaying calendar dates, TimeScope converts upcoming events into **live countdown cards** that update continuously. This makes deadlines and milestones easier to understand and prioritize.

The system transforms static dates into a **dynamic time awareness tool**.

---

# Core Concept

Most calendars show **dates**, but they do not clearly communicate how much time remains until an event.

TimeScope solves this by displaying events in the form:

3 Days  
14 Hours  
22 Minutes  
10 Seconds Remaining

By continuously updating countdown timers, the application helps users stay aware of upcoming deadlines and milestones.

---

# Features

TimeScope Version 1 includes:

- Event creation
- Live countdown timers
- Countdown updates every second
- Event cards dashboard
- Time progress visualization
- Urgency color indicators
- Event deletion
- Persistent storage using browser localStorage

These features create a simple but powerful system for tracking upcoming events.

---

# Dashboard Overview

The main interface displays events as **countdown cards**.

Example card:

Chemistry Exam  
3 Days 12 Hours Remaining  

Progress  
[████████░░░░░░░░░░░░] 40%

Each card represents a tracked event and updates automatically.

Events are automatically sorted by **closest deadline first**.

---

# Time Progress Visualization

Each event includes a **progress bar** showing how much time has passed since the event was created.

The system calculates:

- total time until deadline
- time already passed
- time remaining

This turns time into a **visual progress indicator**, making deadlines easier to understand.

---

# Urgency Indicators

TimeScope visually highlights approaching deadlines using colors.

- More than 7 days remaining → Blue
- 3–7 days remaining → Orange
- Less than 24 hours remaining → Red

This allows users to quickly recognize urgent events.

---

# Technology Stack

TimeScope is built using modern web technologies:

- **Frontend:** React / Next.js
- **Storage:** Browser localStorage
- **Deployment:** Vercel

---

# Future Development

Planned improvements for future versions include:

- Event categories
- User authentication
- Cloud synchronization
- Event editing
- Mobile optimized layouts

These features will expand TimeScope into a more powerful time management system.

---

# License

This project is licensed under the **MIT License**.

---

# Author

**Jagrat Ahuja**
