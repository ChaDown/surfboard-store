Surf Stock is a surfboard inventory application, and it's the first full-stack app that I've built. It's built using NodeJS, ExpressJS and MongoDB as a database.

Surf Stock is a CRUD app, where users can create, read, update and delete files. These files are stored in seperate collections in MongoDB, and the server communicates with Mongo using Mongoose.

The app is built with a Model View Controller (MVC) architecture. This structure makes it clean and easily readable. The different data models are stored in the models folder where an individual Schema is set for each one. The routes folder designates a callback function for each path, which are all stored in the controller folder.

The controller designates how the data will be accessed/manipulated and then renders a view. I learned about and used the Async node module many times in controller functions. The views are all written using Pug HTML template engine. I also had to learn pug for this project, and found it very useful to render dynamic data.

All the image files are stored in an AWS S3 bucket. The database then contains a link for each image which is how they're accessed. I had to learn about AWS and S3, how it works and how to access files. The functionality for storing a file in the bucket is all in the S3.js file.

Overall this was a very fulfilling project for me. All my previous projects were front-end based, so it's extremely satisfying to understand how it works on the other side. The flow of information is clear and . Server-side programming has opened my eyes to a lot of possibilities!

(base) MacBook-Pro:surfboard-store apple$ git remote add origin git@github.com:ChaDown/surfboard-store.git
(base) MacBook-Pro:surfboard-store apple$ git branch -M main
(base) MacBook-Pro:surfboard-store apple$ git push -u origin main
