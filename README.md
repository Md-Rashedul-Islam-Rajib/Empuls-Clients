# Empuls Employee Services



-[Empuls Employee Services](https://assignment-12-20a84.web.app)

Overview: <br /><br />
Empuls Employee Service is an employee management system designed to facilitate efficient daily work data collection. It enables higher authorities to review and verify employee performance, aiding in informed decision-making and appropriate action based on employees' work activities.

Features:

1. The website is easy to navigate with a clean layout.
2. A user can login to the system using Email/Password Authentication or via Google Authentication.
3. This site has different levels of access based on roles.
4. By default, all users have the employee role
5. An employee can submit their work data with details and see their payment history.
6. Another role, HR can be promoted only by the admin.
7. An HR can verify any employee, see their progress in details and pay their salary.
8. Most powerful role is Admin, who can look after all the employee including HR of this site.
9. An admin can fire any one in any time from this site.
10. An admin can adjust anyone's salary of this but he can only increase the salary.

Technologies Used:
- Front End : React, Tailwind CSS
- Back End]  ExpressJs, NodeJs
- Data Base : MongoDB



Resources:

- [React Router Dom](https://reactrouter.com/en/main)
- [React Hot Toast](https://react-hot-toast.com/)
- [Swiper Slider](https://swiperjs.com/react)
- [React Hook Form](https://swiperjs.com/react)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Lottie React](https://lottiereact.com/)
- [Daisy UI](https://daisyui.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Sweet Alert 2](https://sweetalert2.github.io/)
- [Axios](https://axios-http.com/)
- [react-datepicker](https://reactdatepicker.com/)
- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async)
- [react-rating-stars-component](https://www.npmjs.com/package/react-rating-stars-component)
- [ReCharts](https://recharts.org/)
- [AOS](https://michalsnik.github.io/aos/)


Admin Email : admin@empuls.com <br />
Admin password : Admin@empuls


## How to Clone and Run

1. **Clone Repositories**
   - Clone both repositories to your computer:
     ```bash
     git clone https://github.com/Md-Rashedul-Islam-Rajib/Empuls-Server
     git clone https://github.com/Md-Rashedul-Islam-Rajib/Empuls-Clients
     ```

2. **Configure Firebase Credentials**
   - Replace your Firebase credentials and other necessary environment variables in `.env.local` file in the clients repository.

3. **Configure MongoDB Credentials**
   - Replace your MongoDB username, password, and other necessary environment variables in `.env` file in the server repository.
   - Add your localhost URL to CORS in `index.js` file in the server repository.

4. **Install Dependencies**
   - Open both the clients and server repository folders in the command line interface (CLI).
   - Install necessary npm packages by running:
     ```bash
     npm install
     ```

5. **Start the Server**
   - Navigate to the server repository folder and start the server using nodemon:
     ```bash
     cd Empuls-Server
     nodemon index.js
     ```

6. **Start the Client**
   - Navigate to the clients repository folder and start the client development server:
     ```bash
     cd Empuls-Clients
     npm run dev
     ```
