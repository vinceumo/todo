# vue-101-damdigital-workshop

## Introduction

Clone the project

Copy `starter-materials` folder on your machine

## I - Toggle navigation on mobile

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

By default we want the nav to be close so we are going to set `isNavOpen: false`.

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
* [Form Input Bindings - Checkbox](https://vuejs.org/v2/guide/forms.html#Checkbox)
* [v-model](https://vuejs.org/v2/api/#v-model)


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