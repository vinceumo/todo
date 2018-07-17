# Vue.js 101 todo PWA tutorial

The goal of this tutorial is to give an introduction to vue.js ❤. It was initially written for a workshop for [DAMDigital London](https://www.damdigital.com/).

Vue.js is a progressive framework for building user interfaces.

This tutorial assumes that you already have some intermediate knowledge about HTML, CSS and Javascript. If you don't have any knowledge of these fields check out [freeCodeCamp](https://www.freecodecamp.org/), they have great resources to learn these topics 😉.

Here are the subjects this tutorial will cover:

- Class and Style Bindings
- Event Handling
- v-bind directive
- Data binding in attributes
- List Rendering
- Interpolations - Mustache
- Form Input Bindings - Checkbox
- v-model
- Methods
- Conditional Rendering
- v-if
- v-else
- Introduction to PWA

## Table of Contents

- [Getting started](#Getting-started)
- [Toggle navigation on mobile](#toggle-navigation-on-mobile)
- [Bind our todo lists to the side navigation](#bind-our-todo-lists-to-the-side-navigation)
- [Main section](#main-section)
  - [Header](#header)
  - [Todos](#todos)
- [Change current list](#change-current-list)
- [Create a new list](#create-a-new-list)
  - [Toggle the sidebar](#toggle-the-sidebar)
  - [Add the new list](#add-the-new-list)
- [Edit a list](#edit-a-list)
  - [Toggle sidebar content](#toggle-sidebar-content)
  - [Edit list form](#edit-list-form)
    - [Delete a list](#delete-a-list)
    - [Change the title and keyword value](#change-the-title-and-keyword-value)
- [Create and edit a todo](#create-and-edit-a-todo)
  - [Create a todo](#create-a-todo)
  - [Edit a todo](#edit-a-todo)

## Getting started

Clone the [starter materials from github](https://github.com/vinceumo/vue-101-damdigital-workshop). It includes the base HTML, CSS and JS.

The final version of this tutorial can be found on [this repo](#)

Vue CDN is already included in our index.html, as well as our CSS and content/js/app.js 😃.

## Toggle navigation on mobile

We are going to show and hide the side navigation on mobile (📱 < 850px).

When we click on **Menu** we want `<nav>` to toggle the class `.is-open`.

To do so we are going to use `v-bind` in our markup. `v-bind` allow us to bind data inside an html attribute. E.g. `v-bind:id=""`, `v-bind:style=""`, `v-bind:data-target=""`, etc. The shorthand for `v-bind` is `:`.

In `index.html`, we are going to dynamically pass `.is-open` using `v-bind:class`. If `isNavOpen` is true, then we will add our class.

```html
<nav v-bind:class="{'is-open': isNavOpen}">
<!-- ... -->
</nav>
```

In `content/js/app.js`, we are going to had `isNavOpen` to our data. If you change our data to **true** the nav will show up.

The **data** property in vue.js is where we store the data of our application but as well the state of our UI. For example, if _isNavOpen_ is by default set to false but by changing its value to true we can bind the class _is-open_ to the DOM.

We are going to add `isNavOpen: false` to our app.js.

```javascript
var app = new Vue({
  el: "#app",
  data: {
    isNavOpen: false
  }
});
```

Now we want to change the value of `isNavOpen` when we click on the **Menu** button.

We are going to use the event handler 'on click'. In vue.js we can use `v-on:`, or `@` (Shorthands) to listen to DOM events. In our case, we want to listen to a click event. We are then going to use `v-on:click`/`@click`.

```html
<button v-on:click="isNavOpen = !isNavOpen" class="menu">Menu</button>
```

As you can see we can pass an inline javascript statement, we can as well use a method (function), we will see later in this tutorial how to use this last one.

### Documentation references

- [Class and Style Bindings](https://vuejs.org/v2/guide/class-and-style.html)
- [Event Handling](https://vuejs.org/v2/guide/events.html)
- [v-bind directive](https://vuejs.org/v2/api/#v-bind)
- [Data binding in attributes](https://vuejs.org/v2/guide/syntax.html#Attributes)

## Bind our todo lists to the side navigation

In `content/js/app.js`, we are going to add some dummy lists so we can start to integrate our side navigation.

```javascript
var app = new Vue({
  el: "#app",
  data: {
    isNavOpen: false,
    todoLists: [
      {
        title: "✈️ Trip to japan",
        keyword: "japan",
        items: [
          { name: "Eat ramen", isCompleted: true },
          { name: "Visit mt Fuji", isCompleted: false },
          { name: "Learn japanese", isCompleted: false }
        ]
      },
      {
        title: "🏂 Ski trip to the Alps",
        keyword: "Alps",
        items: [
          { name: "Find a chalet", isCompleted: true },
          { name: "Learn how to ski", isCompleted: false }
        ]
      },
      {
        title: "🍉 Groceries",
        keyword: "Food",
        items: [
          { name: "Apples", isCompleted: false },
          { name: "Banana", isCompleted: true },
          { name: "Tomatoes", isCompleted: false },
          { name: "Bread", isCompleted: true }
        ]
      }
    ]
  }
});
```

Now we are going to use the `v-for` directive in our markup to render the todo lists in the side navigation.

```html
<nav v-bind:class="{'is-open': isNavOpen}">
  <ul>
    <li v-for="todoList in todoLists">
      <button>
        {{todoList.title}}
        <span>
          {{todoList.items.length}}
        </span>
      </button>
    </li>
    <li>
      <button class="is-add">Create a new list</button>
    </li>
  </ul>
</nav>
```

`todoLists` is the source data and `todoList` is the alias used to iterate in our array.

We are using the 'moustache' syntax `{{}}` to bind our text to the view. The moustache tag gets replace by the targeted value in `todoLists`.

### Documentation references

- [List Rendering](https://vuejs.org/v2/guide/list.html)
- [Interpolations - Mustache](https://vuejs.org/v2/guide/syntax.html#Text)

## Main section

### Header

Now we want to be able to see our todos in the main section. For now, we will only render the first `todoLists` list (index 0).

In `content/js/app.js` in `data` we are going to add `currentListIndex: 0`

```javascript
var app = new Vue({
  el: "#app",
  data: {
    isNavOpen: false,
    currentListIndex: 0,
    todoLists: [
      //...
    ]
  }
});
```

First, we are going to bind the title of the list using the moustache syntax in the header.

```html
<h1>{{todoLists[currentListIndex].title}}</h1>
```

The header has a background image. We are using [Unsplash Source](https://source.unsplash.com/) to get a random image. We can specify a keyword to get a relevant image for our header.

```
https://source.unsplash.com/featured/?{KEYWORD},{KEYWORD}
```

As we are going to bind our keyword inside an attribute we are going to use `v-bind`:

```html
<header v-bind:style="'background-image: url(https://source.unsplash.com/featured/?' + todoLists[currentListIndex].keyword + ')'">
  <!-- ... -->
</header>
```

### Todos

To render our todos in the main section we are going to use `v-for`. As we want an individual ID and names for each input we are going to pass the index in our for loop `v-for="(value, index) in object"`.

We are going to use `v-bind` to checked our todos if these ones are already checked.

We are using `v-model` to update the value of `isCompleted` from our todos when we click on the checkbox. When our checkbox is checked isCompleted will get the value of true and the parent `li` will automatically get the class `is-completed` as isCompleted is `true`.

The `v-model` directive creates a two-way data bindings meaning when the value gets updated the UI will be updated as well.

```html
<ul>
  <li v-for="(todo, index) in todoLists[currentListIndex].items" v-bind:class="{'is-completed': todo.isCompleted}">
    <label v-bind:for="'todo' + index">
      <input
      type="checkbox"
      v-bind:name="'todo' + index"
      v-bind:id="'todo' + index"
      v-bind:checked="todo.isCompleted"
      v-model="todo.isCompleted">
      {{todo.name}}
    </label>
    <button class="is-danger">Edit todo</button>
  </li>
  <li>
    <button class="is-add">New Todo</button>
  </li>
</ul>
```

### Documentation references

- [Form Input Bindings - Checkbox](https://vuejs.org/v2/guide/forms.html#Checkbox)
- [v-model](https://vuejs.org/v2/api/#v-model)

## Change current list

We want to be able to change the current list being displayed. The current list being displayed is set by `currentListIndex` in our app's data. When we click on one of the list items we want to change `currentListIndex` to the index of this one and close the side navigation if open.

We want as well, to show the user the current list behind display, to do so we are going to add the class `.is-active` if `currentListIndex === index`

```html
<li v-for="(todoList, index) in todoLists"  v-bind:class="{'is-active' : currentListIndex === index}">
    <button v-on:click="currentListIndex = index; isNavOpen = false">
        {{todoList.title}}
        <span>
            {{todoList.items.length}}
        </span>
    </button>
</li>
```

## Create a new list

### Toggle the sidebar

When clicking on **Create a new list** we want to show the `.sidebar`. To do so we want to add the class `.is-open` to this one, then close the nav bar if this one is open on mobile. The way to do this is quite similar to what we have done with the navigation on mobile.

In our data we are going to add a new entry of `isSidebarOpen: false`:

```js
var app = new Vue({
  el: "#app",
  data: {
    isNavOpen: false,
    isSidebarOpen: false,
    currentListIndex: 0
    //...
  }
});
```

Now we want to bind our class `.is-open` to our `.sidebar`:

```html
<div class="sidebar" v-bind:class="{'is-open' : isSidebarOpen}">
 <!-- ... -->
</div>
```

We need to add on event handler on click on **Create a new list** that will open the sidebar and close the navigation on mobile:

```html
<button class="is-add" v-on:click="isSidebarOpen = true; isNavOpen = false;">Create a new list</button>
```

Nice, now we can open our sidebar 🎉.

Now lets close the sidebar when we click on **cancel**:

```html
<button type="button" class="is-danger" v-on:click="isSidebarOpen = false">Cancel</button>
```

### Add the new list

To create a new list we want to field the _title_ and _keyword_ inputs. When the user clicks on **Create List** we want to push our new values to `todoLists` in our data. If one of our input is empty we want a default text to show up.

In our _app.js_ we are going to add a `tempNewList` array, it will store the values of our inputs.

```js
var app = new Vue({
  el: "#app",
  data: {
    isNavOpen: false,
    isSidebarOpen: false,
    currentListIndex: 0,
    tempNewList: [
      {
        title: null,
        keyword: null
      }
    ]
    //...
  }
});
```

Now we are going to bind our inputs using `v-model`.

```html
<form>
  <h3>Create a new list</h3>
  <label for="listTitle">Title:</label>
  <input id="listTitle" name="listTitle" type="text" placeholder="My amazing next trip to south america" v-model="tempNewList.title">
  <label for="listKeyword">Keyword:</label>
  <input id="listKeyword" name="listKeyword" type="text" placeholder="Colombia" v-model="tempNewList.keyword">
  <div class="buttons">
      <button type="button" class="is-danger" v-on:click="isSidebarOpen = false">Cancel</button>
      <button type="button" class="is-confirm">Create List</button>
  </div>
</form>
```

Alright, now lets push our new `tempNewList` values to `todoLists`.

We are going to create a **method** called `addNewList`. A **method** is a function stored as an object property. Here the object is the vue instance. In vue our method will be stored in a `methods` object.

Our `addNewList` method will follow this scenario:

1.  If _title_ is empty use a default string of `"🕵️‍ List with no name"`
1.  If _keyword_ is empty use a default string of `""earth"`
1.  Push our values to `todoLists`
1.  Change our current list to our new list
1.  Close the sidebar
1.  Reset the values of our inputs

```js
var app = new Vue({
  el: "#app",
  data: {
    //...
  },
  methods: {
    addNewList: function() {
      var listTitle = this.tempNewList.title;
      var listKeyword = this.tempNewList.keyword;
      if (listTitle == null) {
        listTitle = "🕵️‍ List with no name";
      }
      if (listKeyword == null) {
        listKeyword = "earth";
      }
      this.todoLists.push({
        title: listTitle,
        keyword: listKeyword,
        items: []
      });
      this.currentListIndex = this.todoLists.length - 1;
      this.isSidebarOpen = false;
      this.tempNewList.title = null;
      this.tempNewList.keyword = null;
    }
  }
});
```

Finally, we are going to bind our method to our **Create list** button.

```html
<button type="button" class="is-confirm" v-on:click="addNewList">Create List</button>
```

### Documentation references

- [Method Event Handlers](https://vuejs.org/v2/guide/events.html#Method-Event-Handlers)

## Edit a list

Good, now that we can create a new list we want to be able to edit existing ones. For now, we want to be able to change the title, the keyword and delete a list.

### Toggle sidebar content

First, we are going to create a new method `openSidebar`. This one will:

1.  Open the sidebar
2.  Show the form that we want to use
3.  close the navigation if this one is open

In data lets add `sidebarContentToShow: null`, This will allow us to know what form should be shown.

```js
var app = new Vue({
  el: "#app",
  data: {
    isNavOpen: false,
    isSidebarOpen: false,
    sidebarContentToShow: null,
    currentListIndex: 0
    //...
  },
  methods: {
    //...
  }
});
```

We are going to have 4 forms in our sidebar that we will toggle:

1.  `"createNewList"`
1.  `"editList"`
1.  `"createNewTodo"`
1.  `"editTodo"`

In our HTML we will conditionally render our forms depending on the value of `sidebarContentToShow`. To do so we are using the `v-if` directive that will allow us to render our block if a condition is true. We need to uncomment our forms and add a `v-if` directive.

```html
<div class="sidebar" v-bind:class="{'is-open' : isSidebarOpen}">
  <div class="sidebar-content">
      <form v-if="sidebarContentToShow === 'createNewList'">
          <h3>Create a new list</h3>
          <!-- ... -->
      </form>
      <form v-if="sidebarContentToShow === 'editList'">
        <h3>Edit list</h3>
          <!-- ... -->
      </form>
      <form v-if="sidebarContentToShow === 'createNewTodo'">
        <h3>Create a new todo</h3>
          <!-- ... -->
      </form>
      <form v-if="sidebarContentToShow === 'editTodo'">
        <h3>Edit todo</h3>
          <!-- ... -->
      </form>
  </div>
</div>
```

Now when we click on the **Create a new list** the sidebar appears and we see... Nothing 😱. That normal remember, `sidebarContentToShow` is set to null 😉.

To change the value of `sidebarContentToShow` we are going to create an `openSidebar` method that will open the sidebar and change the form that we want to show.

```js
var app = new Vue({
  el: "#app",
  data: {
    //...
  },
  methods: {
    openSidebar: function(contentToShow) {
      this.isSidebarOpen = true;
      this.isNavOpen = false;
      this.sidebarContentToShow = contentToShow;
    }
    //...
  }
});
```

Now we can change **Create a new list** so we can use `openSidebar`

```html
<button class="is-add" v-on:click="openSidebar('createNewList')">Create a new list</button>
```

And ta-dah we are now rendering the create a new list form. As you may have already guessed we are going to reuse our method with the **Edit list** button.

```html
<button class="is-primary" v-on:click="openSidebar('editList')">Edit list</button>
```

### Edit list form

#### Delete a list

We are going to start with the **delete list** button. We are going to create a new method, `deleteList`. It will remove the currently shown list and show the first one.

```js
//...
deleteList: function() {
  this.todoLists.splice(this.currentListIndex, 1);
  this.currentListIndex = 0;
  this.isSidebarOpen = false;
}
//...
```

```html
<button type="button" class="is-danger" v-on:click="deleteList">Delete list</button>
```

Now we can remove lists, but if we try to remove all lists we get an error and our app stop to work.

```
[Vue warn]: Error in render: "TypeError: todoLists[currentListIndex] is undefined"
```

As you might guess we have this error because our `todoLists` is empty and we still try to render some part of our application that relies on the values of `todoLists`. We are going to use to use conditional rendering `v-if` and `v-else`.

We are going to render our main content only if `todoLists.length > 0` moreover we want the user to able to create a new list, we are going to use `v-else` to show an alternative main content that will help the user create a new list.

```html
<main v-if="todoLists.length > 0">
  <!-- ... -->
</main>
<main v-else>
  <header style="background-image: url(https://source.unsplash.com/featured/?cat">
      <div class="header-content">
          <h1>Please create a new list</h1>
          <button class="is-add" v-on:click="openSidebar('createNewList')">Create a new list</button>
      </div>
  </header>
</main>
```

#### Change the title and keyword value

Let's get back to our **editList** form. We are going to:

- Bind our inputs with the right `todoLists` element using `v-model`.
- When we click on **done** we want to close our slider.
- Only want to render this form if `todoLists.length > 0`

```html
<form v-if="sidebarContentToShow === 'editList' && todoLists.length > 0">
    <h3>Edit list</h3>
    <label for="listTitle">Title:</label>
    <input id="listTitle" name="listTitle" type="text" placeholder="My amazing next trip to south america" v-model="todoLists[currentListIndex].title">
    <label for="listKeyword">Keyword:</label>
    <input id="listKeyword" name="listKeyword" type="text" placeholder="Colombia" v-model="todoLists[currentListIndex].keyword">
    <div class="buttons">
        <button type="button" class="is-danger" v-on:click="deleteList">Delete list</button>
        <button type="button" class="is-confirm" v-on:click="isSidebarOpen = false">Done</button>
    </div>
</form>
```

### Documentation references

- [Conditional Rendering](https://vuejs.org/v2/guide/conditional.html)
- [v-if](https://vuejs.org/v2/api/#v-if)
- [v-else](https://vuejs.org/v2/guide/conditional.html#v-else)

## Create and edit a todo

This tutorial is almost finished, in this last part we are going to create two features:

- Create a new todo in a list
- Edit and delete an existing todo

Sound similar to what we have done with the lists right? It is going to be almost the same steps.

#### Create a todo

In our data we are going to create a new element of `tempNewList`:

```js
tempNewTodo: [
  {
    name: null,
    isCompleted: false
  }
],
```

We now need a new method so we can add our new todo to a list in `todoLists`

```js
addNewTodo: function() {
  var todoName= this.tempNewTodo.name;
  var todoCompleted = this.tempNewTodo.isCompleted;
  if (todoName == null) {
    todoName = "🕵️‍ unnamed todo";
  }
  this.todoLists[this.currentListIndex].items.push({
    name: todoName,
    isCompleted: todoCompleted
  });
  this.isSidebarOpen = false;
  this.tempNewTodo.name = null;
  this.tempNewTodo.isCompleted = false;
}
```

Now let's dive in our HTML.

First, we need to open the sidebar with the **createNewTodo** render.

```html
<button class="is-add" v-on:click="openSidebar('createNewTodo')">New Todo</button>
```

As we did before we are going to bind our inputs using `v-model` and use the `addNewTodo` method to push our new values.

```html
<form v-if="sidebarContentToShow === 'createNewTodo'">
    <h3>Create a new todo</h3>
    <label for="todoName">Name:</label>
    <input id="todoName" name="todoName" type="text" placeholder="Do things..." v-model="tempNewTodo.name">
    <label for="todoCompleted"><input name="todoCompleted" id="todoCompleted" type="checkbox" v-bind:checked="tempNewTodo.isCompleted" v-model="tempNewTodo.isCompleted"> Is completed</label>
    <div class="buttons">
        <button type="button" class="is-danger" v-on:click="isSidebarOpen = false">Cancel</button>
        <button type="button" class="is-confirm" v-on:click="addNewTodo">Create todo</button>
    </div>
</form>
```

As we are now binding the data for `isCompleted` in our todos, we are going to show, in our navigation the number of completed todos.

In our **app.js** we are going to create a `totalTodosCompleted` method passing the index of the current todoList.

```js
totalTodosCompleted: function(i){
  var total = 0;
  for (var j = 0; j < this.todoLists[i].items.length; j++) {
    if(this.todoLists[i].items[j].isCompleted){
      total++;
    }
  }
  return total;
}
```

And now in our `navigation` we are going to use our new method to return the total of completed todos.

```html
<li v-for="(todoList, index) in todoLists" v-bind:class="{'is-active' : currentListIndex === index}">
    <button v-on:click="currentListIndex = index; isNavOpen = false">
        {{todoList.title}}
        <span>
            {{totalTodosCompleted(index)}} / {{todoList.items.length}}
        </span>
    </button>
</li>
```

#### Edit a todo

Last but not least we want to edit our todo.

First, we need to know the index of the todo we are going to edit, in our data we are going to create `currentTodoIndex`.

```js
currentTodoIndex: 0,
```

We will need a `deleteTodo` method that will remove the current todo.

```js
deleteTodo: function() {
  this.todoLists[this.currentListIndex].items.splice(this.currentTodoIndex, 1);
  this.isSidebarOpen = false;
  this.currentTodoIndex = 0;
}
```

Now let's have look at our HTML.

First, we want to open our slider and change the value of `currentTodoIndex`.

```html
<button class="is-primary" v-on:click="openSidebar('editTodo'); currentTodoIndex = index">Edit todo</button>
```

In our **editTodo** form we want to:

- Show our form only if `todoLists[currentListIndex].items.length > 0`
- Bind the todo name and if completed using `v-model`
- When we click on _Delete todo_ we trigger the method `deleteTodo`
- when we click on _Done_ we close our sidebar

```html
<form v-if="sidebarContentToShow === 'editTodo' && todoLists[currentListIndex].items.length > 0">
  <h3>Edit todo</h3>
  <label for="todoName">Todo:</label>
  <input id="todoName" name="todoName" type="text" placeholder="Do things..." v-model="todoLists[currentListIndex].items[currentTodoIndex].name">
  <label for="todoCompleted"><input name="todoCompleted" id="todoCompleted" type="checkbox" v-bind:checked="todoLists[currentListIndex].items[currentTodoIndex].isCompleted" v-model="todoLists[currentListIndex].items[currentTodoIndex].isCompleted"> Is completed</label>
  <div class="buttons">
      <button type="button" class="is-danger" v-on:click="deleteTodo">Delete todo</button>
      <button type="button" class="is-confirm" v-on:click="isSidebarOpen = false">Done</button>
  </div>
</form>
```

🎉🎉🎉🎉🎉 The UI of our todo is now done

## LocalStorage

When we reload the page of our application, it goes back to our dummy values. How great would it be if we could store our lists and todos locally?

We are going to use [window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). It is part of the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

**localStorage** allow us to store data with no expiration date.

In our **app.js** we are going to create a new method `updateTodoLocalStorage`

```js
//...
updateTodoLocalStorage: function () {
  localStorage.setItem('todoLocalStorage', JSON.stringify(this.todoLists));
}
//...
```

We are using `setItem()` method from the Web Storage API. We pass the following parameters:

- `setItem(keyName, keyValue);`
  - `keyName`: name of the key we want to create/update (`'todoLocalStorage'`).
  - `keyValue`: value we want to give the key you are creating/updating (`JSON.stringify(this.todoLists)`).

We want now to use this method every time we update the values of our todos or lists. Vue allow us to react to data changes with the `watch` option. Every time with have a change in our `todoLists` we want to call our `updateTodoLocalStorage` method. As our object have nested values, we want to detect changes inside this values. We can pass `deep: true` to do so.

```js
var app = new Vue({
  el: "#app",
  data: {
    //...
  },
  watch: {
    todoLists: {
      handler() {
        this.updateTodoLocalStorage();
      },
      deep: true
    }
  },
  methods: {
    //...
    updateTodoLocalStorage: function() {
      localStorage.setItem("todoLocalStorage", JSON.stringify(this.todoLists));
    }
  }
});
```

Now lets inspect our app and look into **Local Storage**. If we create/update a list or a todo we can see our `todoLocalStorage` storage being updated.

Now, when we load our page, we want to set our `todoLists` as our `todoLocalStorage`. Vue comes with a some [Lifecycle Hooks](https://vuejs.org/v2/api/#created). We re going to use the `created: function()` one to set our values. We are going as well to remove our dummy values.

```js
var app = new Vue({
  el: "#app",
  data: {
    //...
    todoLists: []
  },
  created: function() {
    this.todoLists = JSON.parse(
      localStorage.getItem("todoLocalStorage") || "[]"
    );
  },
  watch: {
    //...
  },
  methods: {
    //...
  }
});
```

Now if we reload, close and reopen our app all our todos and list have been saved 🤟.

### Documentation references

- [Watchers](https://vuejs.org/v2/guide/computed.html#Watchers)
- [Created](https://vuejs.org/v2/api/#created)

# Bonus - Offline Progressive Web App (PWA)

In this bonus part of this tutorial we are going to set up a Progressive Web App (PWA) and our services workers so we can use this web application offline on our smartphone.

## Set up a PWA

A PWA is:

> Progressive Web Apps are web applications that are regular web pages or websites, but can appear to the user like traditional applications or native mobile applications. The application type attempts to combine features offered by most modern browsers with the benefits of a mobile experience. _[wikipedia](https://en.wikipedia.org/wiki/Progressive_Web_Apps)_

It is basically a web app that take advantages of the latest technologies to act and look like a native app.

To set up our PWA we will need to create a `manifest.json` file and set up our service workers.

PWA must be served from a secure origin (HTTPS).

- [A Beginner's Guide To Progressive Web Apps](https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/)
- [Progressive Web Apps - Google](https://duckduckgo.com/?q=progressive+web+app+definition&t=ffab&atb=v123-1&ia=about)

### Generate icon assets

First we are going to include all the icon assets in our project. The icons have already been generated using https://realfavicongenerator.net/. They are included in `content/img/`.

In the head of our HTML we want to include:

```html
<link rel="apple-touch-icon" sizes="180x180" href="content/img/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="content/img/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="content/img/favicon-16x16.png">
<link rel="mask-icon" href="content/img/safari-pinned-tab.svg" color="#5bbad5">
<link rel="shortcut icon" href="content/img/favicon.ico">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-config" content="content/img/browserconfig.xml">
<meta name="theme-color" content="#77c4d3">
```

### Web App Manifest

Web App Manifest (manifest.json) is basically a file that provides information about our web app such as icons, name of our application, etc. It is part of the technologies used for PWAs. You can get more information about the Web App Manifest on [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/Manifest).

Now let's create this file at the root of our project.

```json
{
  "name": "todo",
  "short_name": "todo",
  "author": "Vincent Humeau",
  "lang": "en-GB",
  "icons": [
    {
      "src": "content/img/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "content/img/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#77c4d3",
  "background_color": "#77c4d3",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/todo/",
  "start_url": "/todo/"
}
```

In our HTML file we want to include it.

```html
<link rel="manifest" href="manifest.json">
```

### Service workers

What are service workers?

> Service workers are a new browser feature that provide event-driven scripts that run independently of web pages. Unlike other workers, service workers can be shut down at the end of events, note the lack of retained references from documents, and they have access to domain-wide events such as network fetches. Service workers also have scriptable caches. Along with the ability to respond to network requests from certain web pages via script, this provides a way for applications to “go offline”. _[w3c/ServiceWorker - Github](https://github.com/w3c/ServiceWorker)_

This tutorial do not aim to go into depth about service workers, you can find some great tutorial and resources online:

- [How to Setup a Basic Service Worker (with Caching) - bitsofcode (Video)](https://www.youtube.com/watch?v=BfL3pprhnms)
- [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/primers/service-workers/)
- [pwabuilder - service workers](https://www.pwabuilder.com/serviceworker)
- [pwabuilder - service workers](https://www.pwabuilder.com/serviceworker)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse/)
- [Making a Simple Site Work Offline with ServiceWorker](https://css-tricks.com/serviceworker-for-offline/)
- [Getting Started with Service Workers](https://www.sitepoint.com/getting-started-with-service-workers/)

https://gist.github.com/Omranic/4e648fa38caab7b8207d3e237fde0c77#create-service-worker

For our services workers we are going to follow this [gist from Omranic](https://gist.github.com/Omranic/4e648fa38caab7b8207d3e237fde0c77#create-service-worker)

First create a `sw.js` file at the root of our project.

In our **index.html**

```html
<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js');
        });
    }
</script>
```

Then in our **sw.js** we are going to cache all our assets that will allow our app to be usable offline:

```js
var shellCacheName = 'pwa-todo-v1';
var filesToCache = [
  './',
  './index.html',
  './content/css/screen.min.css',
  './content/js/app.js',
  'https://cdn.jsdelivr.net/npm/vue',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css'
];
```

Then we only have to follow this gist and add the parts **Listen to installation event**, **Update Assets Cache** and **Serve App Shell Offline From Cache**.

---------

This tutorial is now finally done. Our **todo vue.js PWA** can now be access here https://vinceumo.github.io/todo

TODO
- Get screen shoots
- Create material starter pack
