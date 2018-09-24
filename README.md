# Fast-Food-Fast

[![Build Status](https://travis-ci.org/davidshare/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/davidshare/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/davidshare/Fast-Food-Fast/badge.svg?branch=ft-server)](https://coveralls.io/github/davidshare/Fast-Food-Fast?branch=ft-server)
[![Maintainability](https://api.codeclimate.com/v1/badges/bb0fb6c0ea6be7e66123/maintainability)](https://codeclimate.com/github/davidshare/Fast-Food-Fast/maintainability)


Fast-Food-Fast is a food delivery service app for a restaurant. A user can create an account, signin to the account and make orders for food items.

## UI hosted on gh pages
https://davidshare.github.io/fast-food-fast/UI/index.html

## Server side hosted on Heroku
https://fast-food-fast-essien.herokuapp.com/

## Table of Content
 * [Getting Started](#getting-started)

 * [Prerequisites for installation](#Prerequisites)
 
 * [Installation](#installation)

 * [Test](#test)
 
 * [ API End Points Test Using Postman](#api-end-points)

 * [Coding Style](#coding-style)
 
 * [Features](#features)
 
 * [Built With](#built-with)
 
 * [Author](#author)

 * [License](#lincense)

 * [Acknowledgement](#acknowledgement)

## Getting Started

### Prerequisites for installation
1. Node js
2. Express
3. Git

### Installation
1. Clone this repository into your local machine:
```
e.g git clone https://github.com/davidshare/Fast-Food-Fast
```
2. Install dependencies 
```
e.g npm install.
```
3. Start the application by running the start script.

e.g npm start

4. Install postman to test all endpoints on port 3000.

### Test
run test using 'npm test'.

### API End Points Test Using Postman

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>/api/v1/auth/signup</td>  <td>User signup</td></tr>

<tr><td>POST</td> <td>/api/v1/auth/login</td>  <td>User signin</td></tr>

<tr><td>POST</td> <td>/api/v1/menu</td>  <td>Add a meal</td></tr>

<tr><td>POST</td> <td>/api/v1/orders</td>  <td>Posts a order</td></tr>

<tr><td>PUT</td> <td>/api/v1/orders/:orderId</td>  <td>Updates the status of an order</td></tr>

<tr><td>GET</td> <td>/api/v1/menu</td>  <td>Get menu</td></tr>

<tr><td>GET</td> <td>/api/v1/menu/:mealId</td>  <td>Get a meal by mealId</td></tr>

<tr><td>GET</td> <td>/api/v1/orders</td>  <td>Gets all orders</td></tr>

<tr><td>GET</td> <td>/api/v1/orders/:orderId</td>  <td>Gets an order by orderId</td></tr>
</table>

### Coding Style
* Airbnb style guide. 

## Features

 ### Admin
 * Admins can add food items
 * Admins can edit food items
 * Admins can delete food items
 * Admins can see food orders
 * Admins can decline food orders
 * Admins can mark food orders as completed

 ### Users
 * A user can create an account
 * A user can signin to his/her account
 * A user can view available food items
 * A user can make orders and cancel the orders
 * A user can see history of orders
 

## Built With
* NodeJs-EXPRESS: Node.js is a javascript runtime built on Chrome's V8 javascript engine.

* html5: It is used for structuring the frontend.

* css: It is used for styling the frontend.

* Vannila Javascript: It is used for scripting the client side.


## Author
* David Essien

## License
This project is licensed under the GNU General Public License v3.0 - see the LICENSE.md file for details.

## Acknowledgement
I acknowledge the individuals from the organisation and groups below. They were a great source of motivation in completing this project.
* Andela.
* Andela Learning Facilitators.
* Andela 21
