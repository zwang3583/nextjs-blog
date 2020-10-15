---
title: 'Creating inRainbows: a LGBTQ+ Resource Web-App'
date: '2020-06-02'
---

**inRainbows** is a web application for high school and college-age LGBTQ+ members in Boston to allow easily access to queer-friendly mental health resources based on preferences that matter to them.

This project idea was first pitched by my friend and colleague <a href='http://hannahhuang.me/'>Hannah</a>, which was then accepted by BU Spark and funded by its Innovation Fellows program. 

Originally, the team composed of 3 software engineers and a design fellow. Unfortunately, due to COVID-19, one of the software engineers had to take a leave.

<img src='/images/inRainbows/inRainbows_home.png'>

Through extensive user testing, we scraped some features, modified others, and came up with brand new one as well. 

As the semester progressed, the team and I learned about **agile software development**, and began our series of sprints to deploy a prototype of this web-app. In 8 sprints, we were finally able to present <a href='https://inrainbows-171a7.web.app/'>inRainbows</a>!

Unfortunately, due to **API key** expiring and lack of recent engagement in the project, the maps component does not function. However, everything else stll does!

Of course, this project is far from perfect. For example, because of time restrictions, we were not able to switch from **gmapsJS** to **vue-gmaps**, causing a major headscratch dealing with map markers and responsiveness with our app. 

The **geocoder** also had a **query limit**, and because of our huge list of therapists, I had to hard code certain restrictions to make sure the query gets through.

<img src='/images/inRainbows/inRainbows_use.png'>

Prior to this project, I had no experience with backend development. I also was not familiar with web scraping and the Google Maps API. Through this project, my team and I supported each other with what we are familiar with, and I learned to:

- Webscrape
- Deploy a Firebase app
- Utilize gmaps
- Connect our database to the app
- Use Jira

Hannah and I are both interested in making this prototype into something more; we just need the right kickstart (and plenty of free time of course) and get going again!

<div style="text-align: right"> - Zheng </div>