# jobPortal

## **Frontend update** 
Now the frontend app uses Angular Material based components, please, for any frontend task follow the general theming + design offered by [Angular Materials](https://material.angular.io).

## *NOTE*
npm_modules are not included in the fronetd folder (they are big in size so i added them to .gitignore). Once you clone the project, cd into `frontend` folder and run the command `npm install`. This will install all the npm_moduels you need. 
## Database connection:

Each one of us will have a database setup in their machine (this is the only free option). 
Once you clone the project, navigate to [this application.properties](https://github.com/Yazeed1s/JobBoard/blob/main/backend/src/main/resources/application.properties)

you will find the following configs:
```
#--- db_test is the name of the database i have in my machine
spring.datasource.url=jdbc:mysql://localhost:3306/db_test 
spring.datasource.username=yourUserName
spring.datasource.password=yourPassowrd
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql: true
spring.jpa.hibernate.ddl-auto=create 
```
### To connect the database with the application:
\
1- You need to create a database in your machine and substitute its name with `db_test`.
\
2- Since the database is hosted locally, leave `localhost` as is.
\
3- `3306` is the default port mysql uses, (can be different in your case, double check).
\
4- The values of `spring.jpa.hibernate.ddl-auto` can be any of `create, update, validate, or create-drop`. 

- `create` tells the application (hibernate's sessionFactory) to drop the old tables and recreate new tables everytime the app strats. **if you want to keep the old tables do not use this vlaue** 
- `update` tells the application to keep the old tables and update them with every app run or API request.
- `create-drop` tells the application to drop the tables at the end of the session. (tables will be created at run time, then destroyed when the app stops)
- `validate` no idea, google it!\
Usually, you will need to switch values between `create` & `update` as you test your APIs or test the proper hibernate annotations.


## API testing:  

To test the API, you will need to download [postman](https://www.postman.com/downloads/) or [insomnia](https://insomnia.rest), then once you set it up, run the spring application and send the http request to localhost:8080/followed/by/the/api/endpoint from the API tester. (i will elaborate more on this with some pictures)

## Usefull links:

[install mysql on windows](https://www.mysqltutorial.org/install-mysql)
\
[install mysql on windows](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html)
\
[Official documentation for Angular](https://angular.io/start)
\
[Official documentation for Angular](https://spring.io/guides)
\
[Angular Routing](https://angular.io/guide/routing-overview)
\
[Hibernate Inheritance Mapping](https://www.baeldung.com/hibernate-inheritance)
\
[SpringBoot tuturial](https://www.javatpoint.com/spring-boot-jpa)
