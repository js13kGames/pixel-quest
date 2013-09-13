# Pixel Quest

A little MMORPG for JS13kGames 2013.

![image](http://io.depold.com/image/1m2H2l2x3z3x/pixel-quest.png)

## Getting started

First of all we need to download the code and install the dependencies:

```
git clone https://github.com/sdepold/pixel-quest.git
cd pixel-quest/server
npm install
npm start
```

You can now open `http://localhost:3000` in the browser. Have fun !

## Development tools

### Building a distribution

```
npm run build
```
This will generate a `dist` folder, that contains all the necessary files but in a minified version. Just `cd` into the `dist/server` folder and run `npm install` and `npm start` afterwards.

### Building a distribution zip file.

```
npm run build-zip
```

This will generate a `client.zip` and a `server.zip` file in the projects root folder.

### Checking the size

```
npm run check
```

This will calculate the size of the client and the server code.
