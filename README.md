

# GNews API Broker

API Broker for fetching articles from Gnews .

## Install
- Run Docker Build command:

`docker build . -t root/gnews-broker `

- Docker run server:

`docker run -p 5000:5000 -d root/gnews-broker`


## API Details:
#### Endpoint:
`/get-articles`

#### Query Parameters:
| Param | Description |
|--|--|
| `apikey` | API Key generated after signup in gnews.io  |
| `q` | Keyword Search parameter to search in articles |


### Method:
`GET`

#### Sample cURL:
```
curl --location 'http://localhost:5000/get-articles?q=google&apikey=<API_KEY>&in=title'
```

> You can get `API_KEY` from https://gnews.io/

#### Sample Response:

```
{
  "totalArticles": 54904,
  "articles": [
    {
      "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
      "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
      "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
      "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
      "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
      "publishedAt": "2022-09-28T08:14:24Z",
      "source": {
        "name": "PhoneArena",
        "url": "https://www.phonearena.com"
      }
    }
  ]
}
```


## Develop:

- Install packages or dependencies:

`npm i`

- Build Scripts:

`npm run build:staging`

- Run app on local:

`npm run start`

- Check Lints or Faults:

`npm run lint`

- Run Unit Tests:

`npm run test`


## Folder structure

```
├── Dockerfile
├── README.md
├── docker-compose.yml
├── index.js
├── lib
│   ├── http
│   │   ├── error.ts
│   │   ├── interfaces
│   │   │   └── error-response.interface.ts
│   │   └── response.ts
│   ├── log
│   │   └── interfaces
│   │       └── index.ts
│   └── utils
│       └── fetch-with-timeout.ts
├── package-lock.json
├── package.json
├── src
│   ├── __tests__
│   │   ├── fetch-article
│   │   │   └── handler.test.ts
│   │   └── fixtures
│   │       └── fetch-article
│   │           ├── invalid.json
│   │           ├── success-response.json
│   │           └── valid.json
│   └── fetch-article
│       ├── controllers
│       │   └── gnews.controller.ts
│       ├── index.ts
│       ├── interfaces
│       │   └── handler.interface.ts
│       └── lib
│           └── repositories
│               └── gnews.repository.ts
├── tsconfig.json
└── webpack.config.js
```
