Overview
The SBA Automation Framework is a Cypress-based automated testing solution designed for regression testing of the Small Business Administration (SBA) website. The SBA website is a public-facing platform maintained by the U.S. federal government to showcase information about small businesses across the United States, including their contact details, services, and other relevant data. This framework aims to ensure the reliability, functionality, and consistency of the website by automating repetitive testing tasks.
This project was initiated to streamline quality assurance efforts for the SBA website but remains incomplete due to layoffs and contract terminations enacted by the new administration in 2025.
Purpose
The primary goal of this framework is to:
Automate regression testing for the SBA website to validate core functionalities after updates or changes.

Reduce manual testing efforts and improve efficiency in identifying defects.

Ensure the website remains a reliable resource for small business owners, stakeholders, and the public.

Key features tested (or intended to be tested) include:
Display of small business listings.

Accuracy of contact information.

Search and filter functionalities.

Accessibility compliance (e.g., WCAG standards).

Cross-browser compatibility.

Technology Stack
Cypress: An end-to-end testing framework chosen for its ease of use, real-time debugging, and robust support for modern web applications.

JavaScript: The primary language for writing test scripts and custom commands.

Node.js: Runtime environment for executing Cypress tests.

Project Status
This framework is incomplete and was halted mid-development due to external factors:
Layoffs and Contract Terminations: In 2025, the new administration’s budget cuts and restructuring led to the termination of contracts and personnel involved in this project.

Current State: While some test suites and configurations are functional, the framework lacks full coverage of the SBA website’s features and requires additional development to meet its original scope.

Contributions to complete or enhance this framework are welcome, though no official support is currently available.

Completed Work
As of the project’s suspension:
Basic test suites for the SBA website’s homepage and business listing pages.

Custom Cypress commands for reusable actions (e.g., login, search).

Initial setup for cross-browser testing.

Pending Work
Full regression suite covering all SBA website features.

Integration with a CI/CD pipeline (e.g., GitHub Actions, Jenkins).

Enhanced reporting (e.g., Mochawesome reports).

Tests for edge cases and performance validation.

Challenges Faced
Dynamic Content: The SBA website’s reliance on real-time data made fixture creation and test stability challenging.

Resource Constraints: Limited team size and time prior to layoffs impacted progress.

Policy Shifts: Abrupt contract terminations in 2025 disrupted continuity and planning.

