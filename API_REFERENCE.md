# API Reference

```
/posts/popular

```

**`GET /posts/popular`**

**Description**: Fetches the top 6 most popular posts, ordered by likeCount.

**Usage**: App main page's popular posts component.

**Query Parameters:** None

**Sample Response:**




**`GET /posts/popular`**

**Description**: Fetches the top 6 most popular posts, ordered by likeCount.

**Usage**: App main page's popular posts component.

**Query Parameters:** None

**Sample Response:**
```
[
    {
        "id": 1,
        "title": 'This is a Knowledge Base Post',
        "type": 'knowledge_base_item',
        "tags": ["Videoconferencing", "Zoom", "Security", "Kebabs", "Apple", "Banana"],
        "createdDate": "15 July 2020",
        "author": {
            "id": 1,
            "displayName": "Name"
        },
        "likeCount": 10,
        "commentCount": 31,
        "body":
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        "id": 2,
        "title": 'This is a Blog Post',
        "type": 'blog_post',
        "tags": ["Shoes", "Pizza", "Baking"],
        "createdDate": "15 July 2020",
        "author": {
            "id": 2,
            "displayName": "Name"
        },
        "likeCount": 5,
        "commentCount": 3,
        "body":
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    }
]
```


**`GET /categories/popular`**

**Description**: Fetches the top 10 most popular categories, ordered by number of published posts.

**Usage**: App main page's explore categories component.

**Query Parameters:** None

**Sample Response:**
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


