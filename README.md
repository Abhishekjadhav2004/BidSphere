🏷️ Project Title:

BidSphere – Intelligent Online Auction Platform

🚀 Project Overview:

BidSphere is an advanced online auction platform designed to provide a transparent, competitive, and engaging bidding experience. The platform allows users to participate in live auctions, place bids on products, and compete to win. Once an auction ends, the highest bidder (winner) is automatically detected by the system.

When a user wins an auction, they are:

Displayed at the top of the leaderboard as recognition of their success.

Notified via email, confirming their win and providing next steps (e.g., payment or shipping details).

The system uses real-time data updates, secure authentication, and automated backend logic to ensure fairness, performance, and user satisfaction.

💡 Key Features:
🧑‍💻 User Features

User Registration & Login – Secure authentication using JWT and bcrypt for password hashing.

Profile Management – Users can manage their details, track past bids, and view their auction history.

Product Browsing – Browse live and upcoming auctions with detailed product information.

Real-Time Bidding System – Users can place bids dynamically; the highest bid is updated instantly using Socket.io (WebSockets).

Auto Refresh Leaderboard – Displays top users (winners) based on auction victories, bid activity, or total spending.

Email Notifications – Automated email alerts using Nodemailer for events like:

Winning an auction 🏆

Outbid notification ⚠️

Auction start/end reminders ⏰

🏆 Leaderboard System

Maintains a real-time leaderboard showing top auction winners and their statistics (e.g., total wins, bid amount, success rate).

Updates automatically whenever an auction concludes.

Provides gamified experience that motivates user engagement.

📦 Admin Panel Features

Add / Edit / Delete Auctions – Manage auctions and set start/end times.

User Management – View registered users, track participation, and remove inactive users.

Analytics Dashboard – Visual insights into total users, auctions conducted, and most active bidders.
