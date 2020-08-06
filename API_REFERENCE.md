# API Reference

```
/posts/popular

```


**`GET /posts/popular`**

**Description**: Fetches the top 6 most popular posts, ordered by likeCount.

**Usage**: App main page's popular posts component

**Query Parameters:**
None

**Sample Response:**
```
[
    {
        id: 1,
        title: 'This is a Knowledge Base Post',
        type: 'knowledge_base_item',
        tags: ['Videoconferencing', 'Zoom', 'Security', 'Kebabs', 'Apple', 'Banana'],
        createdDate: '15 July 2020',
        author: {
            name: 'Name',
            id: 1234
        },
        likeCount: 10,
        commentCount: 31,
        body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
        id: 2,
        title: 'This is a Blog Post',
        type: 'blog_post',
        tags: ['Videoconferencing', 'Zoom'],
        createdDate: '15 July 2020',
        author: {
            name: 'Name',
            id: 1234
        },
        likeCount: 10,
        commentCount: 31,
        body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
        id: 3,
        title: 'This is a Blog Post',
        type: 'blog_post',
        tags: ['Shoes', 'Pizza', 'Baking'],
        createdDate: '20 July 2020',
        author: {
            name: 'Name',
            id: 1234
        },
        likeCount: 0,
        commentCount: 0,
        body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    },
    {
        id: 4,
        title: 'This is a Blog Post',
        type: 'blog_post',
        tags: [],
        createdDate: '20 July 2020',
        author: {
            name: 'Name',
            id: 1234
        },
        likeCount: 0,
        commentCount: 0,
        body: null,
    },
    {
        id: 5,
        title: 'This is a Knowledge Base Post',
        type: 'knowledge_base_item',
        tags: ['Snakes'],
        createdDate: '15 July 2020',
        author: {
            name: 'Name',
            id: 1234
        },
        likeCount: 0,
        commentCount: 0,
        body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
        id: 6,
        title: 'This is a Blog Post',
        type: 'knowledge_base_item',
        tags: ['Videoconferencing', 'Skype'],
        createdDate: '30 July 2020',
        author: {
            name: 'Name',
            id: 1234
        },
        likeCount: 1,
        commentCount: 3,
        body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
]
```


### Explore Categories - Top 10 categories ranked by number of posts

GET /categories/popular
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



### Explore Tags - Top 10 tags ranked by number of posts
*Clicking into a tag will just redirect to search endpoint with a tag search

GET /tags/popular
[
    {
        "tag": "security",
        "tagcount": 4
    },
    {
        "tag": "cloud",
        "tagcount": 4
    },
    {
        "tag": "aws",
        "tagcount": 3
    },
    {
        "tag": "azure",
        "tagcount": 2
    }
]




# Categories Page /categories

### Fetch Categories - Get a list of all categories in the db

GET /categories

[
    {
        "category": "Videoconferencing",
        "publishedcount": 1
    },
    {
        "category": "MOOC",
        "publishedcount": 2
    }
]


### Category Detail Page - detail page of a category which is just a list of tools. path parameter is the category name itself (we don't necessarily need to use the category ID in the path). Returns a list of tools with that category.
*As we don't have any plans for a /tools/:toolid page, clicking into a tool will just hit the search endpoint.

GET /categories/:category_name
[
    {
        "id": 1234
        "tool": "Zoom",   
        "description": "Zoom is... "    // can omit this, this is not in data model
    },
    {
        "id": 1234,
        "tool": "Skype",
        "description": "Skype is... "
    }
]



# Results Page  /search

### Results list of posts (both blog posts and knowledge-base)

GET /posts

[
    {
        id: 2,
        title: 'This is a Blog Post',
        type: 'blog_post',
        tags: ['Videoconferencing', 'Zoom'],
        createdDate: '15 July 2020',
        author: {
            name: 'Name',
            id: 1234
        },
        likeCount: 10,
        commentCount: 31,
        body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
        id: 3,
        title: 'This is a Blog Post',
        type: 'blog_post',
        tags: ['Shoes', 'Pizza', 'Baking'],
        createdDate: '20 July 2020',
        author: {
            name: 'Name',
            id: 1234
        },
        likeCount: 0,
        commentCount: 0,
        body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    }
]


# Post Page     /posts/:post_id

### Post Show page

GET /posts/:post_id
{
        id: 2,
        title: 'This is a Blog Post',
        type: 'blog_post',
        tags: ['Videoconferencing', 'Zoom'],
        createdDate: '15 July 2020',
        author: {
            id: 1234,
            name: 'Name'
        },
        likeCount: 10,
        commentCount: 31,
        body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
}


### Post Comments

GET /posts/:post_id/comments
[
    {
        "id": 123,
        "author": {
            "id": 123,
            "displayName": "Pete"
        }
        "body": "comment body...",
        "createdDate": "20 July 2020"
    },
    {
        "id": 125,
        "author": {
            "id": 124,
            "displayName": "Nancy"
        }
        "body": "comment body...",
        "createdDate": "20 July 2020"
    }
]


### Related Posts - fetches top 3 related posts for the current post

GET /posts/related
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


# Create Post Page

POST /posts/
*Yuhang might have a better idea about the params




# User authentication
*Not sure about how this is handled by Django

### Login form
POST /login


### Signup form
POST /signup





# Extras if time permitting

### User profile page - not really much to include here unless we want to surface posts created, comments created, profile pic...

GET /user/:id
{
    "id": 123,
    "displayName": "Bob"
}
