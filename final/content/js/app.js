document.addEventListener(
  "DOMContentLoaded",
  function() {
    var app = new Vue({
      el: "#app",
      data: {
        isNavOpen: false,
        isSidebarOpen: false,
        sidebarContentToShow: null,
        currentListIndex: 0,
        tempNewList: [
          {
            title: null,
            keyword: null
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
              { name: "Bread", isCompleted: true }
            ]
          }
        ]
      },
      methods: {
        openSidebar: function(contentToShow) {
          this.isSidebarOpen = true;
          this.isNavOpen = false;
          this.sidebarContentToShow = contentToShow;
        },
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
        },
        deleteList: function() {
          this.todoLists.splice(this.currentListIndex, 1);
          this.currentListIndex = 0;
          this.isSidebarOpen = false;
        }
      }
    });
  },
  false
);
