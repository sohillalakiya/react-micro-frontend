# React Micro-Frontend Architecture

This repository contains a **React Micro-Frontend** project that consists of three separate applications:

* **Host**: Serves as the shell application that loads Client1 and Client2.
* **Client1**: A micro-frontend application loaded within the Host.
* **Client2**: Another micro-frontend application loaded within the Host.

## 🛠 Setup and Installation

### 1️⃣ Install Required Dependencies

Run the following command in each of the three applications (Client1, Client2, and Host) to install dependencies:

```
npm install
```

### 2️⃣ Configure Babel

Create a `<span>babel.config.json</span>` file in each React application with the following configuration:

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### 3️⃣ Clean Up Public Folder

In each application, remove unnecessary parts from the `<span>public</span>` folder:

* **Remove** `<span>favicon.ico</span>`
* **Remove** unused assets
* **Remove** lines containing `<span>%PUBLIC_URL%</span>` from `<span>index.html</span>`

### 4️⃣ Configure Webpack

Create a `<span>webpack.config.js</span>` file in each application with appropriate settings for **Module Federation**. Example configuration for **Host**:

```
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".css", ".scss", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new ModuleFederationPlugin({
      name: "MICRO",
      remotes: {
        HOST_APP: "HOST_APP@http://localhost:8080/remoteEntry.js",
        SECOND_HOST_APP: "SECOND_HOST_APP@http://localhost:8081/remoteEntry.js"
      },
    }),
  ],
};

// For the client1 and client2 change this part
// This is for the client1
new ModuleFederationPlugin({
      name: "CLIENT1",
      filename: "remoteEntry.js",
      exposes: {
        "./app": "./src/App",
      },
    })

// This is for the client2
    new ModuleFederationPlugin({
      name: "CLIENT2",
      filename: "remoteEntry.js",
      exposes: {
        "./app": "./src/SecondHost",
      },
    })
```

Configure `<span>ModuleFederationPlugin</span>` in **Client1** and **Client2** similarly with appropriate `<span>exposes</span>` and `<span>remotes</span>`.

### 5️⃣ Update `<span>package.json</span>` Start Scripts

Modify the `<span>scripts</span>` section in each application’s `<span>package.json</span>`:

#### **Host (**``******)**

```
"scripts": {
    "build": "webpack",
    "start": "webpack serve --watch-files ./src"
  }
```

#### **Client1 (**``******)**

```
"scripts": {
    "build": "webpack",
    "start": "webpack serve --watch-files ./src"
  }
```

#### **Client2 (**``******)**

```
"scripts": {
    "build": "webpack",
    "start": "webpack serve --watch-files ./src"
  }
```

## 🚀 Running the Applications

Start the applications in the following order:

1️⃣ **Start Client1** (Runs on port `<span>8080</span>`):

```
cd client1 && npm start
```

2️⃣ **Start Client2** (Runs on port `<span>8081</span>`):

```
cd client2 && npm start
```

3️⃣ **Start Host (Main App)** (Runs on port `<span>8082</span>`):

```
cd host && npm start
```

Once all applications are running, open [**http://localhost:8082**]() to view **Host**, which integrates **Client1** and **Client2**.

## 📌 Features

* **Micro-Frontend Architecture** with Webpack Module Federation
* **Independent Deployability** of micro-frontends
* **Shared Dependencies** to reduce bundle size
* **Efficient Code Splitting**

## 📜 License

This project is licensed under the MIT License.
