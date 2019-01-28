## Vault Dragon Coding Test

### Pre Requested
Node.js
CouchDB
Set CouchDB IP, Port and Hostname in constant.js

### Object Schema

```
name: String (required)
value: Any (required)
timestamp: Date (not required)
```

## How to use the API

### URL

### POST

```
POST /api/create http://localhost:3001/api/create
Live URL:
POST /api/create http://13.127.83.183:3001/api/create
```

Example payload:

```javascript
    {
        "object": {
            "a": "b",
            "c": "d",
            "e": "f"
        }
    }

    OR

    {
      "Hello": "Welcome"
    }
    OR

    {
      "123": "456"
    }
```

### GET

```
GET api/find/{key} http://13.127.83.183:3001/api/find/:{key}

GET /api/find/{key}?timestamp={unixTimestamp}  http://13.127.83.183:3001/api/:key?timestamp=############
```

## Setting Up (If needed)

```sh
npm install
npm start
```

## Running Tests

```sh
npm install -g mocha

cd > Project Dir
> mocha
```
