# SurveyWeb
A full-stack dynamic survey platform that allows administrators to manage surveys and users to participate in them through an intuitive web interface.
---

## Features

### Admin Panel

- Create, preview, edit, and delete surveys
- Save surveys as drafts or publish them
- View user responses and summary statistics

### User Interface

- Fill out published surveys before their expiration
- Preview answers before submission
- Submit final responses securely

---

## Tech Stack

| Layer      | Technology                |
|------------|----------------------------|
| Frontend   | Angular 19, Angular Material |
| Backend    | Spring Boot (Java)         |
| Database   | MySQL                      |
| Tools      | VS Code, Eclipse, MySQL Workbench |

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

### Home page
![homepage Preview](pictures/homepage.png)
## Admin Panel
### admin page
![admin Preview](pictures/adminpage.png)
### Create survey
![survey1 Preview](pictures/q1.png)
![survey2 Preview](pictures/q2.png)
### Preview 
![survey2 Preview](pictures/cp.png)
### dashboard
![survey2 Preview](pictures/result.png)
## User Interface
### fillin page
![Survey Preview](pictures/filin1.png)
![Survey Preview](pictures/fillin2.png)
### Preview
![Survey Preview](pictures/fp.png)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
