# Lab Template
File tempate for basic HTML, CSS, and JavaScript classes

## Basic Structure
Here is the basic structure with stub or empty files in place.

```
.
├── index.html
├── css
│   └── site.css
├── img
│   └── cute-grey-kitten.jpg
├── js
│   └── site.js
├── lab1
│   ├── index.html
│   ├── css
│   │   └── lab.css
│   ├── img
│   └── js
│       └── lab.js
├── lab2
│   ├── index.html
│   ├── css
│   │   └── lab.css
│   ├── img
│   └── js
│       └── lab.js
├── lab3
│   ├── index.html
│   ├── css
│   │   └── lab.css
│   ├── img
│   └── js
│       └── lab.js
├── lab4
│   ├── index.html
│   ├── css
│   │   └── lab.css
│   ├── img
│   └── js
│       └── lab.js
├── lab5
│   ├── index.html
│   ├── css
│   │   └── lab.css
│   ├── img
│   └── js
│       └── lab.js
├── lab6
│   ├── index.html
│   ├── css
│   │   └── lab.css
│   ├── img
│   └── js
│       └── lab.js
└── experiments
   └── index.html
```

# Message From Kira
HI! Here's some details to optimize your Web Experiece TM.

## Updating blog
- Each entry is a .md file. You can look at the layout of test1.md to see what kind of stuff you're capable of doing within the file. 
- To make a new entry, create a new .md file, and add it to /entries directory within /blog. Then, go to entries.json and add it to the list of files. Add newer posts on the top so they render first.

Example:
```
{
    "entries": [
        "new_entry.md" <-- Add your new entry here.
        "test1.md",
        "test2.md",
    ]
}
```

## Adding more art to portfolio
- Upload your art image to /img within /portfolio. 
- Go to the manifest.json file. Go to the section of the file that you desire to add the new picture to (twoD, threeD or digital?)

Example:
```
{
   "path": "img/ditigalWork.jpg",
   "title": "Digital Art Compilation"
}
```
Add another one of these entry guys to the end of the section you want to add it to. Paste the image path into the "path" field and type the title into the "title" field. 

## Customizing CSS
- Go into any of the folders (ex. /portfolio, /about...) Find the CSS file. At the top of the files, there should be some variables within the :root css class. You can toggle the colors and change background images from there, and it should apply to the rest of the page.
