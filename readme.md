# CoinRank ReadMe

# Description

This was the second project completed on the GA bootcamp. The purpose of this project was to showcase our ability to build a React web app, consume a public RESTful API and manage multiple routes using React Router. I created a simple web app which provides current information on the top 50 cryptocurrencies and a search function for a larger number of coins.

# Deployment link

[Link](https://coinrank.netlify.app/)


# Getting Started/Code Installation

The application utilises a syncfusion package to create the sparkline on the index view for each coin, which can be installed via : https://ej2.syncfusion.com/react/documentation/sparkline/getting-started#installation-and-configuration . 
I used a week-long free trial of this software for this project which unfortunately has led to a license validation message being displayed on the app currently.

The other vital dependencies which need to be installed are axios, react-router-dom, react-bootstrap and sass, all of which can be installed using node package manager. Vite was also used to set up and manage the React app.

The public API - coinranking - can be found here : https://developers.coinranking.com/api

# Timeframe & Working Team (Solo/Pair/Group)

This was a solo project for which I had 48 hours to complete.

# Technologies Used

* React.js
* JSX
* CSS & SASS

# Brief

## Overview

The second project is to **build a React application** that consumes a **public API**.

### Technical Requirements

Your app must:

* **Consume a public API** – this could be anything but it must make sense for your project.
* **Have several components**
* **The app can have a router** - with several "pages", this is up to you and if it makes sense for your project.
* **Include wireframes** - that you designed before building the app.
* **Be deployed online** and accessible to the public (hosted on your public github, not GA github!)

---

## Necessary Deliverables

* A **working application**, hosted somewhere on the internet
* A **link to your hosted working app** in the URL section of your Github repo
* A **git repository hosted on Github**, with a link to your hosted project, and frequent commits dating back to the _very beginning_ of the project
* **A `readme.md` file** with:
  * Explanations of the **technologies** used
    * A couple of paragraphs about the **general approach you took**
    * **Installation instructions** for any dependencies
    * Link to your **wireframes** – sketches of major views / interfaces in your application
   * Descriptions of any **unsolved problems** or **major hurdles** your team had to overcome

---

# Planning

The planning began by designing a wireframe of the home, single coin and search routes, seen below. 
It was kept simple due to the small timeframe of the project. 
I mapped the three API endpoints needed for each route and created an initial design of each page. 
This included detailing which sections would be stand alone components or whether they would be containers / other JSX elements. 
I also planned how I wanted each page to interact and respond to DOM events, for example clicking a coin on the home page generating the single coin route for that coin.

# Build/Code Process

## Root
The Root component makes an initial API call to retrieve the coin data, storing it to state and passing this data down as props to StatsBar and CoinList components. This is achieved with a simple axios GET request to the /coins endpoint. 
This component also handles routing between the three routes. If there is an error retrieving the data it will be displayed. If the data is retrieved successfully it will generate the Stats Bar at the head of the page, otherwise it will display a loading spinner.
An API call is made every 5 seconds, updating the data in state, triggering a re-render of the page, both in the Stats Bar and Coin List route.


## StatsBar
The stats bar is generated from the data retrieved from the initial API call. This is a stand alone component as it is displayed on every page. The data is passed down as a prop from the Root component and formatted to display a few general cryptocurrency market stats. The app logo is also in the statsbar, which is a clickable link to the CoinList component.

## CoinList
The CoinList component generates the home page and displays the top 50 coins in a list. Coin information is displayed in columns, such as rank, name, price, by mapping through the coin data. Bootstrap was used to structure the rows and columns. The below code is returned for each item in the coin data list, generating each row. The columns are clickable, generating the single coin page for that coin.


## SingleCoin
The SingleCoin component is split into the left and right sections. When the route is loaded, a GET request to the coin/:uuid endpoint is made, retrieving data relating to a single coin. The left section contains an informational card about the coin and a sparkline of the last 24 hour price action. There was a little bit of manipulation needed on the sparkline data to enable the use of the syncfusion sparkline component, coordinating the x and y values, and adding the current price as the final price point:

The right container contains a list of current price and supply data of the coin,  a back button and the search component. This was generated simply by formatting the single coin data and handling a few inconsistencies in the data retrieved, such as missing prices or formatting prices with a large number of decimals.

## Search
The search function is seen on multiple pages on the app and is split into two components; one for displaying/receiving the input and button, and another for generating the page and displaying the results. 
Typing in the search box updates state to the typed value and when submitted will navigate to the Search component, and make a request to the /search-suggestions endpoint.
The results are mapped through and list items returned/generated for each query result. These list items are clickable and will generate the SingleCoin route for the coin clicked. 
There is also the ability to continue to another search, or go back to the previous page from the Search route.

# Challenges

The main challenge of this project was the time restraint. I was at this point in the course already very comfortable consuming APIs and formatting/manipulating data, however I set myself the goal of making the app visually appealing as this was something I wanted to improve on. Therefore I budgeted one day for working on the technicalities of the project and the second day I spent the majority of which on the visual design. The SearchInput component was the piece I was most satisfied with as I was able to design and configure it to be reusable across multiple routes while also making it visually pleasing. 
I also wanted to enhance the user experience of the application by changing colours on hovering and having seamless backward and forward navigation from route to route, which was time consuming.

# Wins

I was most proud of the visual design of this project as it was something I had identified on a personal level as needing improvement. The user experience moving seamlessly between routes has a great feel to it and I was very happy with how much I managed to achieve in that regard in a small amount of time. The search component being easily reusable within other components was a big win also.
In general I think the project was a very standard/simple, but well-designed and structured implementation of a web app which consumes a public API. 
I was also very happy with my planning for this project. I had a clear vision, a simple but effective plan and wireframe, which proved to be extremely beneficial for this project, especially under the time constraints.

# Key Learnings/Takeaways

After this project I became much more comfortable with React, Axios and also CSS/SASS. I utilised many important concepts, such as making http requests, using React state and re-rendering, passing props, Routing and also visual design using bootstrap and sass. The majority of these concepts were relatively new to me before this project and I felt I had a great understanding of these things after the project. I am very confident building a fully functional react app from scratch after this project, including setting up the routing, designing components and making API requests.

# Bugs

There is a licence validation message from syncfusion which is covering the StatsBar. I can only remove this by paying for the package so unfortunately that will have to remain for now. 

# Future Improvements

The search page does not load the back button and search input component if the user makes a blank search. I would like to improve this to improve the user experience.

The SingleCoin page does not update at regular intervals as the CoinList and StatsBar components do. This was a trade-off due to the time constraints of the project, and is not necessarily needed, however it is somewhere that could be improved.

When the page updates with new data, I would love to have implemented updated prices to green or red depending on the previously shown price, however this would have demanded a strong restructure of the CoinList component, and something to achieve at a later date.

