# vue-101-damdigital-workshop

## Introduction

Clone the project

Copy `starter-materials` folder on your machine

## Toggle navigation on mobile

We are going to show and hide the side navigation on mobile.

When we click on **Menu** we want `<nav>` to toggle the class `.is-open`.

To do so we are going to use `v-bind` in our markup. `v-bind` allow us to bind data inside an html attribute. E.g. `v-bind:id=""`, `v-bind:style=""`, `v-bind:data-target=""`, etc. The shorthand for `v-bind` is `:`.

In `index.html`, we are going to dynamically pass `.is-open` using `v-bind:class`. If `isNavOpen` is true, then we will add our class.

```html
<!--index.html -->
<nav v-bind:class="{'is-open': isNavOpen}">
<!-- ... -->
</nav>
```

In `content/js/app.js`, we are going to had `isNavOpen` to our data. If you change our data to **true** the nav will show up.

The **data** property in vue.js is where we store the data of our application but as well the state of our UI. For example if _isNavOpen_ is by default set to false but by changing its value to true we can bind the class _is-open_ to the DOM.

We are going to add `isNavOpen: false` to our app.js.

```javascript
//content/js/app.js
var app = new Vue({
  el: "#app",
  data: {
    isNavOpen: false
  }
});
```

Now we want to change the value of `isNavOpen` when we click on the **Menu** button.

We are going to use the event handler 'on click'. In vue.js we can use `v-on:`, or `@` (Shorthands) to listen to DOM events. In our case we want to listen to a click event. We are then going to use `v-on:click`/`@click`.

```html
<button v-on:click="isNavOpen = !isNavOpen" class="menu">Menu</button>
```

![Animation showing the navigation panel opening and closing](https://image.ibb.co/j2gUBd/toggle_nav.gif)

### Documentation references

- [Class and Style Bindings](https://vuejs.org/v2/guide/class-and-style.html)
- [Event Handling](https://vuejs.org/v2/guide/events.html)
- [v-bind directive](https://vuejs.org/v2/api/#v-bind)
- [Data binding in attributes](https://vuejs.org/v2/guide/syntax.html#Attributes)

## Bind our todo lists to the side navigation

In `content/js/app.js`, we are going to add some dummy lists so we can start to integrate our side navigation.

```javascript
//content/js/app.js
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

`todoLists` is the source data and `todoList` is the alias use to iterate in our array.

We are using the 'mustache' syntax `{{}}` to bind our text to the view. The mustache tag get replace by the targeted value in `todoLists`.

### Documentation references

- [List Rendering](https://vuejs.org/v2/guide/list.html)
- [Interpolations Text - Mustache](https://vuejs.org/v2/guide/syntax.html#Text)

## Main section

### Header

Now we want to be able to see our todos in the main section. For now we will only render the first `todoLists` list (index 0).

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

First we are going to bind the title of the list using the mustache syntax in the header.

```html
<h1>{{todoLists[currentListIndex].title}}</h1>
```

The header have a background image. We are using [Unsplash Source](https://source.unsplash.com/) to get a random image. We can specify a keyword to get a relevant image for our header.

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

To render our todos in the main section we are going to use `v-for`. As we want an individual ID and names for each inputs we are going to pass the index in our for loop `v-for="(value, index) in object"`.

We are going to use `v-bind` to checked our todos if these ones are already checked.

We are using `v-model` to update the value of `isCompleted` from our todos when we click on the checkbox. When our checkbox is is checked isCompleted will get the value of true and the parent li will automatically get the class `is-completed` as isCompleted is `true`.

The `v-model` directive creates a two way data bindings meaning when the value get updated the UI will be updated as well.

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
    <button class="is-danger">Delete item</button>
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

We want to be able to change the current list being displayed. The current list being displayed is set by `currentListIndex` in our app's data. When we click on one of our list items we want to change `currentListIndex` to the index of this one and close the side navigation if open.

```html
<li v-for="(todoList, index) in todoLists">
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

When clicking on **Create a new list** we want to show the `.sidebar`. To do so we want to add the class `.is-open` to this one and close the nav bar if this one is open on mobile. The way to do this is quite similar to what we have done with the navigation on mobile.

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

Last but not least, we need to add on event handler on click on **Create a new list** that will open the sidebar and close the navigation on mobile:

```html
<button class="is-add" v-on:click="isSidebarOpen = true; isNavOpen = false;">Create a new list</button>
```

Nice, now we can open our sidebar.

Now lets close the sidebar when we click on **cancel**:

```html
<button type="button" class="is-danger" v-on:click="isSidebarOpen = false">Cancel</button>
```

### Add the new list

To create a new list we want to field the _title_ and _keyword_ inputs. When the user click on **Create List** we want to push our new values to `todoLists` in our data. If one of our input is empty we want a default text to show up.

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

We are going to create a **method** called `addNewList`. A **method** is a function stored as an object property. Here the object is the vue instance. In vue our method will be stored in a a `methods` object.

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

Finally we are going to bind our method to our **Create list** button.

```html
<button type="button" class="is-confirm" v-on:click="addNewList">Create List</button>
```

### Documentation references

- [Method Event Handlers](https://vuejs.org/v2/guide/events.html#Method-Event-Handlers)

## Edit a list

Good, now that we can create a new list we want to be able to edit existing ones. For now we want to be able to change the title, the keyword and delete a list.

### Toggle sidebar content

First we are going to create a new method `openSidebar`. This one will:

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

In our html we will conditionally render our forms depending on the value of `sidebarContentToShow`. To do so we are using the `v-if` directive that will allow us to render our block if a condition in true. We need to uncomment our forms and add a `v-if` directive.

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

Now when we click on the **Create a new list** the sidebar appear and we see... Nothing 😱. That normal remember, `sidebarContentToShow` is set to null 😉.

To change the value of `sidebarContentToShow` we are going to create a `openSidebar` method that will open the sidebar and change the form that we want to show.

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
    },
    //...
  }
});
```

Now we can change **Create a new list** so we can use `openSidebar`

```html
<button class="is-add" v-on:click="openSidebar('createNewList')">Create a new list</button>
```

And ta-dah we are now rendering the create a new list form. As you may have already guest we are going to reuse our method with the **Edit list** button.

```html
<button class="is-primary" v-on:click="openSidebar('editList')">Edit list</button>
```

### Edit list form

We are going to start with the **delete list** button. We are going to create a new method, `deleteList`. It will remove the current shown list and show the first one.

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

### Documentation references

- [Conditional Rendering](https://vuejs.org/v2/guide/conditional.html)
- [v-if](https://vuejs.org/v2/api/#v-if)

## Create a new todo

## Edit a todo
