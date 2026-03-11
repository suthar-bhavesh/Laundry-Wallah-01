1. Project Overview

I have developed a Laundry Service Website that allows customers to book services online seamlessly. To enhance the user experience, I integrated Email.js to provide automated communication. This ensures that customers receive a detailed summary of their selected services and total pricing directly in their inbox immediately after booking.

2. Website Structure

The website is organized into several key sections designed for optimal navigation:

Hero Section: A welcoming introduction to the brand and services.
Achievement Section: Highlighting company milestones and key performance statistics.
Service Booking Section: The core functional area where users place their orders.
Newsletter Subscription: A dedicated area for users to register their email for company updates.
Footer: Contains the "About Us" section, important links, contact details, and social media links.

3. How It Works: Service Booking
The booking engine is designed for maximum usability and consists of three main components:
Service List Box: Displays all available laundry options and pricing.
Selection Summary: A dynamic area that updates in real-time as users add items.
Booking Form: The final step where clients provide their personal details to confirm their order.

4. Technologies Used

HTML5: For semantic structure and accessible web layouts.
CSS3: For modern styling, animations, and responsive design across all devices.
JavaScript (ES6+): The engine behind the site’s interactivity, managing the dynamic booking logic and real-time calculations.
Email.js: A service integrated to handle real-time communication, allowing the system to send automated order confirmations and newsletter subscriptions without a custom backend.

5. How to Setup Email.js

Integration: I started by adding the Email.js CDN link to the HTML to enable its functionality on the webpage.
Initialization: I initialized the service using the Public Key found in the Email.js user profile.
Template Configuration: I created and customized an email template within the Email.js admin panel to match the branding.
DOM Manipulation: Using JavaScript, I selected the booking form and added a submit event listener to intercept the data.
Service & Template IDs: I defined variables for the Service ID and Template ID, which are mandatory for routing the emails correctly.
Data Mapping: Finally, I captured the form input values into a parameters object. These variables must match the placeholders defined in the Email.js template to ensure the data populates correctly in the email.