# group-19-assignment-CS335

this is a repository for cinema hall booking system

To run the project make sure you have NODE JS enviroment installed in your machine.
To check if you have NODE JS installed in your machine, open your command prompt [terminal] and
type [node -v] expected output it's your NODE JS versions number [vx.x.x] if no output make sure you
go at the site [https://nodejs.org/en/] and you download it depend on your machine architecture
and follow installatons procedure.

Afte cloning a remote git project type the following command to successful run the project, make sure
you have internet connections.<br>

cd group-19-assignment-CS335<br/>
npm install<br/>

Also make sure you have web server stack configured in your machine [XAMP or LAMP] with a database
named [cinema] [make sure you star it before you start your project otherwise you are going to end
up with an error]

After having the database [cinema] import the database sql [database.sql] which we have located it under
[project_direactor/database.sql], After that you need to run the following command to insert init data into the database

npm run migration:run<br>
after that to start a project by run the following command

npm run start<br/>

Go to your browser and type the following url [http://localhost:8888]

To test the system run the following command [npm run test] make sure you kill the server started
with [npm run start] command before to continue with system testing.
