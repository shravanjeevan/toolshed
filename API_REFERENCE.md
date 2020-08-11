# API Reference

### Summary of endpoints
```
GET /search *

GET /posts *
GET /posts/popular?top=10
GET /knowledge/popular?top=10
GET /posts/related
POST /posts *

GET /posts/:post_id *
PUT /posts/:post_id
DELETE /posts/:post_id *

GET /posts/post_id/comments
POST /posts/:post_id/comments
DELETE /posts/:post_id/comments/:comment_id

GET /categories/popular *
GET /categories *
GET /categories/:category_name *
GET /tools *

GET /tags/popular *

POST /login
POST /signup

```



### **`GET /posts/popular`**

**Description**: Fetches the top 6 most popular posts, ordered by likeCount.

**Usage**: App main page's popular posts component.

**Query Parameters**: None

**Sample Response**:
```
[
    {
        "id": 1,
        "title": 'This is a Knowledge Base Post',
        "type": 'knowledge_base_item',
        "tags": ["Videoconferencing", "Zoom", "Security", "Kebabs", "Apple", "Banana"],
        "createdOn": "15 July 2020",
        "authorId": "1234a",
        "authorDisplayName": "Jacky Lee",
        "likeCount": 10,
        "commentCount": 31,
        "content":
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        "id": 2,
        "title": 'This is a Blog Post',
        "type": 'blog_post',
        "tags": ["Shoes", "Pizza", "Baking"],
        "createdOn": "15 July 2020",
        "authorId": "1234a",
        "authorDisplayName": "Jacky Lee",
        "likeCount": 5,
        "commentCount": 3,
        "content":
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    }
]
```

### **`GET /categories/popular`**

**Description**: Fetches the top 10 most popular categories, ordered by number of published posts.

**Usage**: App main page's explore categories component.

**Query Parameters**: None

**Sample Response**:
```
[
    {
        "category": "Course Administration",
        "publishedcount": 1
    },
    {
        "category": "Communication",
        "publishedcount": 2
    },
    {
        "category": "MOOC Platform",
        "publishedcount": 3
    }
]
```



### **`GET /tags/popular`**

**Description**: Fetches the top 10 most popular tags, ordered by number of posts created under that tag. Note that clicking into a tag will simply redirect to the /search endpoint with the tag as a query parameter.

**Usage**: App main page's explore tags component.

**Query Parameters**: None

**Sample Response**:
```
[
    {
        "tag": "security",
        "tagCount": 4
    },
    {
        "tag": "cloud",
        "tagCount": 4
    },
    {
        "tag": "aws",
        "tagCount": 3
    },
    {
        "tag": "azure",
        "tagCount": 2
    }
]
```

### **`GET /categories`**

**Description**: Fetches a list of all categories in the database.

**Usage**: App's category page via the /categories route.

**Query Parameters**:
- limit | integer | optional | maximum number of categories to fetch

**Sample Response**:
```
[
    {
        "category": "Videoconferencing",
        "publishedCount": 1
    },
    {
        "category": "MOOC",
        "publishedCount": 2
    }
]
```


### **`GET /categories/:category_name`**

**Description**: Returns a list of tools for a selected category. The path parameter is just the name of the category (don't think category ID is needed). We don't have any plans for a /tools/:tool_id route, so clicking into a tool will just hit the /search endpoint.

**Usage**: Tools of a category page, e.g. categories/videoconferencing

**Query Parameters**:
- limit | integer | optional | maximum number of tools to fetch

**Sample Response**:
```
[
    {
        "id": 1234
        "tool": "Zoom",   
        "description": "Zoom is... "    // note: can omit this, this is not in data model and we have no plans to describe tools. To discuss how we will populate tools in DB.
    },
    {
        "id": 1234,
        "tool": "Skype",
        "description": "Skype is... "
    }
]
```


### **`GET /posts`**

**Description**: Fetches all posts.

**Usage**: Not sure

**Query Parameters**: None

**Sample Response**:
```
```




### **`GET /search`**

**Description**: Fetches a list of posts (both blog posts and knowledge base items). Ordered by relevance/popularity.

**Usage**: /search page and the search component. (relabelled from /results)

**Query Parameters**:
- query | string | required | text-based search parameter, whatever the user enters.
- type | string | optional | defines what types of posts to search. Values are "all", "blog_posts", "knowledge_items".
- format | string | optional | what formats to search for. Values are "all", "video", "text". (*note this piece of data is not in the DB model)
- limit | integer | optional | maximum number of results to fetch per page. Default value is 10.
- page | integer | optional | the current page of results to view, used for pagination. If value is greater than 1, results will be offset by (limit * (page - 1)) Default value is 1.
- TBC
- tags? how does searching via tags work?

**Sample Response**:
```
[
    {
        "id": 1,
        "title": "This is a Blog Post",
        "type": "blog_post",
        "tags": ["Videoconferencing", "Zoom"],
        "createdOn": "15 July 2020",
        "author": "1234a",
        "likeCount": 10,
        "commentCount": 31,
        "body":
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        "id": 2,
        "title": "This is a Knowledge Base Item",
        "type": "knowledge_base_item",
        "tags": ["Shoes", "Pizza", "Baking"],
        "createdOn": "15 July 2020",
        "author": "1234a",
        "likeCount": 10,
        "commentCount": 31,
        "body":
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    }
]
```

### **`GET /posts/:post_id`**

**Description**: Main post show page

**Usage**: route for the post article, e.g. /posts/4123123213

**Query Parameters**: None 

**Sample Response:**
```
{
        id: 2,
        title: 'This is a Blog Post',
        type: 'blog_post',
        tags: ['Videoconferencing', 'Zoom'],
        createdOn: '15 July 2020',
        "author": "1234a",
        likeCount: 10,
        commentCount: 31,
        body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
}
```


### **`GET /posts/:post_id/comments`**

**Description**: Comments for a blog post (*there will only be comments for blog posts, not knowledge items*)

**Usage**: Comments component underneath a blog post.

**Query Parameters**: None

**Sample Response:**
```
[
    {
        "id": 123,
        "author": "1234a",
        "createdOn": "20 July 2020",
        "body": "comment body..."
    },
    {
        "id": 125,
        "author": "1234a",
        "createdOn": "20 July 2020",
        "body": "comment body..."
    }
]
```


### **`POST /posts/:post_id/comments`**

**Description**: Create a comment under a post.

**Usage**: Comment submit button.

**Query Parameters**: None

**Sample Response:**
```
{
    [
        "authorId":1,
        "body":"Le texte, qui a reçu le soutien de 73 représentants républicains, doit maintenant être ",
        "postId":4125
    ]
}
```


### **`DELETE /posts/:post_id/comments/:comment_id`**

**Description**: Delete a specific comment.

**Usage**: 

**Query Parameters**: None

**Sample Response:**
```
```



### **`GET /posts/related`**

**Description**: Fetches top 3 related posts based on the current post (excluding itself). (*not sure what the best way to implement this is. We could pass in the post id as arg and in the backend we can extract some data from that post and do a normal GET /posts call. Alternatively we don't even need this endpoint and just call the normal GET /posts and pass into query param stuff in the current post.*)

**Usage**: Related posts component on the sidebar of a post page.

**Query Parameters**: 
- postid | string | required | the id of the post to fetch related posts for.

**Sample Response:**
```
[
    {
        "id": 123,
        "title": "Download Zoom",
        "type: "blog_post"
    },
    {
        "id": 124,
        "title": "Download Skype",
        "type: "knowledge_base_item"
    }   
]
```

### **`POST /posts`**

**Description**: Create a blog post (or knowledge item).

**Usage**: used for the route /posts/create.

**Query Parameters**: None


**Sample Response:**
```
[
    {
        "tags":["zoom","install","test"],
        "title":"How to install zoom",
        "content":"PHA+SGV5IHRoaXMgPHN0cm9uZz5lZGl0b3I8L3N0cm9uZz4gcm9ja3M8L3A+"
        "authorId":1,
    }
]
```


### **`PUT /posts/:post_id`**

**Description**: Edit a blog post (or knowledge item).


### **`DELETE /posts/:post_id`**

**Description**: Delete a blog post (or knowledge item).



## Other stuff
(*not sure how Django handles authentication*)
### **`POST /login`**

### **`POST /signup`**

### **`GET /user:user_id`**
```
{
    "id": 123,
    "displayName": "Bob"
}
```
