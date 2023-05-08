# Blog Style CMS

## Description

This week marks the first time I'm building a full-stack web application from scratch! And what better way to kick things off than with a blog? Wordpress ain't got nothing on me. (Kidding. I actually love working with Wordpress.)

| **Scenario**                                                                                                                                         |
| :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| _I want to create a public forum where users can create a login, create blog posts, comment on each other's posts, and edit and delete their posts._ |

Here's a GIF of it in action:
![GIF of app in use](/images/app-in-use.gif)

---

## Usage

Play around with it here on Heroku:
[Blog Style CMS](https://blog-style-cms.herokuapp.com/)

Make a login, make some posts, make some comments!

---

## My Approach

The app uses Node and Express with [Handlebars](https://handlebarsjs.com/guide/) as the templating language.

Individually, none of the code is particularly special, but I really enjoyed putting it all together. It was incredibly informative, even on this relatively small project, to start to see how easy it is to get yourself mixed up, tracing bugs back through the routes to find that missing character, etc, etc, etc.

Because I just read an article about it, I might as well structure the highlights in terms of an MVC paradigm.

---

### The Model

I continue to love working in MySQL. This project didn't require a very complicated database structure at all. Just four tables: `Users`, `Posts`, `Comments`, and `Sessions`.

> I did not generate the `Sessions` table myself. That's generated underneath the hood by a Node package, [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) in conjunction with [express-session](https://www.npmjs.com/package/express-session) and [sequelize](https://www.npmjs.com/package/sequelize).

---

### The View

This was my first time working with Handlebars and it took a little getting used to. I definitely see the appeal of templating, given that it vastly reduced the amount of HTML and Javascript I had to write. Rendering repeating content types is as easy as:

```handlebars
    {{#if posts}}
    {{#each posts as |post|}}
        {{> dashboard-post-details}}
    {{/each}}
    {{else}}
    <h3>You have not created any blog posts.</h3>
    {{/if}}
```

Combine that with a CSS framework (I used Bootstrap here) and - **chef's kiss** - it all moves so quick!

---

### The Controller

This is where, I now know, the sausage really gets made. Individually, each route is pretty simple, but as the web gets more complicated it becomes easier and easier to get stuck.

For example, I wanted to give the user access to a Dashboard from which they could create new posts, edit/delete old posts, etc. That part was relatively easy. The thing that took me **ages** to track down was why my header wasn't rendering correctly.

> Once a user is logged in, the menu in the header should have an option to Logout and the Login and Sign Up options should be hidden.

The behavior above was working fine on my Home page, but the Dashboard was showing the old header even though I **knew** the user was logged in.

The answer, of course, was that I forgot to include the User's "logged in" status in the response to the /dashboard get request.

```javascript
res.render("dashboard", {
    user: user,
    posts: posts,
    comments: comments,
    // I forgot this!
    loggedIn: req.session.loggedIn,
});
```

---

### Form Handlers

Rather than route to a few different pages to create, update, and delete posts, I wanted to allow the User to do it all from the Dashboard page directly. As such, I had a bunch of buttons that all basically did the same thing, but whose exact behavior depended on a specific post id.

I liked the solution I came up with. A little mini-delegator:

```javascript
const handleClick = (event) => {
    event.preventDefault();
    let target = event.target;
    if (target.classList.contains("update-button")) {
        openUpdateForm(event);
    }
    if (target.classList.contains("update-submit-button")) {
        submitUpdate(event);
    }
    if (target.classList.contains("delete-button")) {
        deletePost(event);
    }
};

blogPostSection.addEventListener("click", handleClick);
```

Each button gets generated with its associated `post_id` stored as a data-attribute, so it's really simple to get that information right off the `event.target` and feed it into a fetch request.

```javascript
const deletePost = async (event) => {
    let postId = event.target.dataset.postid;

    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to update post.");
    }
};
```

---

## Learnings / Reflections

All told, I really had fun on this one. Looking forward, now that I'm more familiar with the basic concepts, I'm excited to start exploring things like React/Angular/Vue to see what they bring to the table.
