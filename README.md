# Product Listing Page

## Usage
The function of `Product Listing Page` application is to allow users to browse products from various categories. Users can filter and sort the products from each collection and add the desired product to their basket by receiving a notification about it.
The application is `responsive` to all display types.

## Summary
The React library was used, which through functional components visualizes all necessary information in an appropriate way. For the purposes of the task, the necessary information is extracted from a JSON file.\

The HTML body is divided into three main parts.\

It starts with a navigation bar that displays company logo and links to relevant product collections.
To make the bar responsive, CSS and conditional rendering with React was used.\

Next is a div container, which is of grid type and is cleverly divided into separate div containers for the needs of the app's appearance. Grid div contains relevant sub-objects - filter function, name and description of the current collection, sorting function and all products of the current collection. All individual products are visualized through a separate component, to which the necessary properties are supplied. Below them is a button with the option to load more products from the current collection. At the moment, each collection consists of 12 products. At initial loading, 3 products are displayed, after pressing the `Load more` button, the next 3 products are loaded, and so on until all the products from the relevant collection are displayed and the load more button is hidden. In the upper left corner above all displayed products is displayed a counter showing the number of currently loaded products.
A filtering feature allows users to filter by color and price. Thus, they only see products matching their preferences according to the selected filter. In order to be responsive and have a good UX, a filtering function changes on smaller displays in a popup window, and this is achieved with conditional rendering with React. At the same time, users can sort the current results by name or price in ascending or descending order.
When the user clicks on the 'Add to cart' button, a modal window pops up for added product in the user's cart. This is achieved by conditional rendering of an individual component.\

A footer is positioned at the bottom, containing links to individual social networks and informative links about the company. The footer is also responsive for all display types.\

## Technologies involved
The following technologies are used in the `Product Listing Page`:\
`JavaScript, React, HTML, CSS`

## How to start the app
All you have to do is run the following commands in the project directory:

`npm install` - to add all the dependencies \
`npm start` - to start the app

The application will then run in your browser on [http://localhost:3000](http://localhost:3000)\

For your convenience, open the application from the link provided.\
[https://geo-tracking-application.vercel.app](https://geo-tracking-application.vercel.app)