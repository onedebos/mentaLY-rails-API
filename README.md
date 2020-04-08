# MentaLLy

This is the API that serves a tablet(intended to be viewed on tablets) web app that allows people schedule
appointments with mental health service providers in Nigeria.

![screenshot](./app_screenshot.png)

The app includes a Rails API that renders JSON to be consumed
by React Views.

## Built With

- Rails
- React
- Bootstrap
- Node
- Axios
- Redux
- FontAwesomeIcons
- Circular std font

## Live Demo

[Live Demo Link](https://mentallly.herokuapp.com)

## Front-end Repo

[Front end git repo](https://github.com/onedebos/mentaLLy-frontend)

## Getting Started

**To get started, follow the instructions below**

To get a local copy up and running follow these simple example steps.

- git clone the frontend repo

```
git clone https://github.com/onedebos/mentaLLy-frontend.git
```

- git clone the backend repo if you want to run the server on your local machine. Otherwise, skip the next 3 steps.

```
git clone https://github.com/onedebos/mentaLY-rails-API.git
```

- cd into the backend repo and install the gems

```
bundle install
```

- run the rails server on port 3001

```
rails s -p 3001
```

- If you decide to run the server locally, cd into the frontend repo. Navigate to src/components/helper/apiUrl.js and change the API_URL string to

```
http://localhost:3001
```

- run

```
npm install
```

to install all packages. then

```
npm start
```

- to start the app in the browser.

- To access the Admin account/panel, use the following information.

- email: admin@mentallybook.com
- password: password

- Admin can create a new provider.

### Prerequisites

- Make sure to have Rails 6.0 and Ruby 2.5.1

### Install

Install the Ruby Gems required by rails

```
bundle install
```

### Usage

To serve up the endpoints from the API, start the rails server using

```
rails s -p 3001
```

To access the Admin account/panel, use the following information.

- email: admin@mentallybook.com
- password: password

- Admin can create a new provider.

- Api endpoint [here](https://mentallly-api.herokuapp.com/api/v1/providers)

### Run tests

Run model tests

```
bundle exec rspec
```

## Planned Features
- Implementing a search endpoint to search for a provider.

## Authors

👤 **Adebola**

- Github: [@githubhandle](https://github.com/onedebos)
- Twitter: [@twitterhandle](https://twitter.com/debosthefirst)
- Linkedin: [linkedin](https://www.linkedin.com/in/adebola-niran/)
- Portfolio: [Website](https://elegant-borg-4081b7.netlify.com/#)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](issues/).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- Thanks to [Murat Kohmaz](https://www.behance.net/gallery/26425031/Vespa-Responsive-Redesign) for his design.
- Thanks to [Jessica Felicio](https://unsplash.com/photos/QS9ZX5UnS14) for images
- logos used from [hatchful](https://www.bookmarks.design/media/image/hatchful.jpg)
- Wikimedia for the [O Logo](https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png)

## 📝 License

This project is [MIT](lic.url) licensed.
