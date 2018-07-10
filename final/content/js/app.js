document.addEventListener(
  "DOMContentLoaded",
  function () {
    var app = new Vue({
      el: "#app",
      data: {
        isNavOpen: false,
        isSidebarOpen: false,
        currentListIndex: 0,
        tempNewList: [
          {
            title: null,
            keyword: null,
          }
        ],
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
            keyword: "skiing",
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
              { name: "Bananas", isCompleted: true },
              { name: "Tomatoes", isCompleted: false },
              { name: "Bread", isCompleted: true },
            ]
          },
        ]
      },
      methods: {
        openSidebar: function () {
          this.isSidebarOpen = true;
          this.isNavOpen = false;
        },
        addNewList: function () {
          if (this.tempNewList.title == null) {
            this.tempNewList.title = "🕵️‍ List with no name"
          };
          if (this.tempNewList.keyword == null) {
            this.tempNewList.keyword = "mars"
          };
          this.todoLists.push(
            {
              title: this.tempNewList.title,
              keyword: this.tempNewList.keyword,
              items: [],
            }
          );
          this.currentListIndex = this.todoLists.length - 1;
          this.isSidebarOpen = false;
          this.tempNewList.title = null;
          this.tempNewList.keyword = null;
        }
      }
    });
  },
  false
);
