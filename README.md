### Part 1 - Backend Setup:

- Technologies: express, firebase-admin, bcryptjs, jsonwebtoken, cors, ...

- Start: npm run dev

### Part 2 - Front-end Setup:

- Start: npm run dev

- Technologies: Next.js 15, React 19, Redux, React Query, Material-UI, Tailwind, React Hook Form, notistack, ...

### Part 3 - Monorepo setup via Turborepo https://turbo.build/:

- Answer: I have consolidated the source code from the frontend repo, backend repo, and packages libraries into a single monorepo

### Part 4 - Bonus Firebase technical questions:

- Question 1: How should we structure a Firestore query that supports pagination to efficiently retrieve the highest potential users? Please include all mathematical formulas used in the query
- Answer:

  - I added a new field called "potentialScore" and sorted it in descending order to determine the most potential user. The formula for computing "potentialScore" is:
  - potentialScore = totalAverageWeightRatings \_ 1000 (highest priority) + numberOfRents \* 10 + recentlyActive \* 0.0000000000001.
  - This prioritizes the fields in descending order from totalAverageWeightRatings to numberOfRents to recentlyActive. The "potentialScore" field is recalculated whenever any of those three fields changes.

- Question 2: How do you ensure that the 'recently active' field in a Firestore document remains updated? Please explain the method you use to keep the data fresh and the reasoning behind your approach
- Answer:
  - I update "recently active" every time a user performs actions such as login, update, or fetch data, and I do this by updating it in the middleware whenever the user sends a request with a JWT.
  - I update the “recently active” field whenever a user performs actions such as logging in, updating, fetching data, etc. I do this by updating it in middleware each time the user sends a request with a JWT.
  - The reason for this approach is that a user might leave their device on without logging out, which doesn’t mean they’re truly active. I believe a user is only genuinely active if they actually perform some action.

### Part 5 - Personality & technical Questions:

1. What are the most difficult technical problems in your work experience you have encountered and how do you fix them?

   - Answer:
     - The most challenging technical issue I recently resolved was 'Unable to send a GET API request from the server.' The difficulty stemmed from the fact that the root cause was related to the system team rather than the frontend team.Specifically, our project suddenly failed to send API requests from the server side, even though it had been working fine before. Meanwhile, client-side requests continued to function normally. After debugging, I discovered that the HTTPS connection was failing due to a certificate error.I escalated the issue to the system team, but it wasn’t resolved immediately. To work around the problem, I attempted to include an HTTPS agent with a .crt file in the server-side request. However, this approach was unsuccessful because the .crt file was not properly verified. Eventually, I worked closely with the system team to adjust the .crt file, and after reapplying the fix, the request was successfully sent. This issue not only tested my debugging skills but also reinforced the importance of cross-team collaboration in resolving technical challenges effectively“.

2. When you’re working on a project, how do you typically approach it from start to finish?

- Answer: I approach it from the big picture to the details. In other words, I start by understanding the overall vision and objectives of the project, then break it down into smaller, manageable tasks and dive into the specifics. This ensures that my work is aligned with the project’s goals while allowing me to manage each component efficiently.

3. How do you usually approach learning a new topic to absorb as much as possible?

- Answer: I usually begin by getting an overall view of the topic, understanding the big picture. Then, I dive into hands-on practice, which naturally leads me to encounter challenges and issues that require me to explore the underlying theory in depth. I believe that the process of creating something is when I learn the most, as practical experience forces me to solve problems and solidify my understanding.

4. “Consistency” vs “fast & efficient”. Choose one.

- Answer: “Consistency”

5. Do you own any Apple products? Like IMac, Macbook, Ipad, Iphone, etc…

- Answer: Yes, I use a MacBook and an iPhone

6. What is your immediate availability to start this job?

- Answer: I can start on February 20, 2025

### Functions:

- Login with NextAuth

- Authentication and Authorization

- Register new users
- Sign out with NextAuth
- Display user listing with pagination and sort by potential user
- Update user information
- Get user details

- Export common packages

### UI:

##### Login:

![alt text](/public/images/image-1.png)

##### Register:

![alt text](/public/images/image-2.png)

##### Dashboard:

![alt text](/public/images/image-3.png)
