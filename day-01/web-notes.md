# Day 01 - What Happens When We Type a URL?

When we type a URL into a web browser and press Enter, several steps happen before the webpage appears on our screen.

## 1. Typing the URL

First, the user enters a URL such as:

https://www.google.com

The browser reads the URL to understand which website the user wants to visit.

## 2. DNS Lookup

The browser needs the IP address of the website's server. It uses DNS (Domain Name System) to find the IP address associated with the domain name.

For example:

google.com → IP address

DNS works like a phone book that helps the browser find the correct server.

## 3. Connecting to the Server

After finding the IP address, the browser connects to the website's server.

If the website uses HTTPS, a secure connection is established between the browser and the server.

## 4. Sending an HTTP Request

The browser sends an HTTP request to the server asking for the webpage and its required resources.

The request may include information about the browser and the type of content it can receive.

## 5. Server Sends a Response

The server receives the request and sends a response back to the browser.

The response can contain files such as:

- HTML
- CSS
- JavaScript
- Images
- Fonts

## 6. Browser Processes HTML, CSS and JavaScript

The browser reads the HTML first and creates the basic structure of the webpage.

Then it processes CSS to apply styles such as colors, fonts, spacing and layout.

JavaScript is then used to add interactions and dynamic behavior to the webpage.

## 7. Rendering the Page

Finally, the browser combines everything and renders the webpage on the screen.

The user can now see and interact with the website.

## Simple Diagram

User types URL
        ↓
Browser reads URL
        ↓
DNS finds IP address
        ↓
Browser connects to server
        ↓
HTTP Request
        ↓
Server sends Response
        ↓
HTML + CSS + JavaScript
        ↓
Browser processes the files
        ↓
Page is rendered
        ↓
User sees the webpage
