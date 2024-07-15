# DataMade Code Challenge: Parserator


## **About the Challenge**
This repository solves the [Datamade coding challenge](https://github.com/datamade/code-challenge)

For this challenge I recreated the **address parsing form** in DataMade's
[Parserator](https://parserator.datamade.us) web service. Parserator receives
input strings that represent addresses (e.g. `123 main st chicago il`)
and splits them up into their component parts, such as street number, street name, city, and state.

## Tech Stack
* **Backend**: Python, Django
* **Testing**: Pytest
* **Frontend**: Vanilla JavaScript
* **Containerization**: Docker, Docker Compose

## Running the App Locally
1. Build and run the application 
```sh
docker-compose up
```
2. Open  the app in your browser on [http://localhost:8000](http://localhost:8000)

## Run Unit Tests
```sh
docker-compose -f docker-compose.yml -f tests/docker-compose.yml run --rm app
```

