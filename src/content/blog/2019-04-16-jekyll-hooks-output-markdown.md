---
title: "Outputting Markdown from Jekyll using hooks"
author: Nicholas C. Zakas
teaser: "Jekyll hooks provide enough flexibility to modify posts before output."
date: 2019-04-16
categories:
  - Tutorial
tags:
  - Jekyll
  - Liquid
  - Ruby
  - Markdown
---

One of the things I most enjoy about Jekyll[^1] is writing my blog posts in Markdown. I love not worrying about HTML and just letting Jekyll generate it for me when a post is published. Using Liquid tags directly in Markdown is also helpful, as I can define sitewide or page-specific variables and then replace them during site generation. This is a really useful capability that I wanted to take advantage of to output Markdown for use in other sites. Places like Medium and dev.to allow you to post Markdown articles, so I thought repurposing the Markdown I used in Jekyll would make crossposting to those sites easier.

I assumed that there would be a property on the `page` variable that would give me access to the rendered Markdown, but I was wrong. This began a long journey through relatively undocumented corners of the Jekyll plugin ecosystem. I'm sharing that journey here in the hopes that others won't have to go through the same frustrating experience.

## An introduction to Jekyll plugins

I was relatively unfamiliar with the Jekyll plugin system before trying to figure out how to get the rendered Markdown for a post. Jekyll supports a number of different plugin types[^2]. These plugin types affect Jekyll directly:

* **Generators** - plugins that create files. While it's not required that generators create files, this is the most frequent use case. Plugins like `jekyll-archives` use generators to create files that wouldn't otherwise exist. 
* **Converters** - plugins that convert between text formats. Jekyll's default of converting Markdown files into HTML is implemented using a converter. You can add support for other formats to be converted into HTML (or any other format) by creating your own converter.
* **Hooks** - plugins that listen for specific events in Jekyll and then perform some action in relation to the events.

 There are also two plugin types that are used primarily with Liquid:

* **Tags** - create a new tag in the format `{% tagname %}` for use in your templates.
* **Filters** - create a new filter that you can use to transform input, such as `{{ data | filter }}`

There is also a *command* plugin type that allows you to create new commands to use with the `jekyll` command line tool. The `jekyll build` command is implemented using this plugin type.

## Designing the solution

My goal was to get the Liquid-rendered Markdown content (so all data processing was complete) for each post into a `page` property so that I could output that content into a JSON file on my server. That JSON file would then be fetched by an AWS Lambda function that crossposted that content to other locations. I didn't need to generate any extra files or convert from one format to another, so it seemed clear that using a hook would be the best approach.

Hooks are basically event handlers in which you specify a container and the event to listen to. Jekyll passes you the relevant information for that event and you can then perform any action you'd like. There are four containers you can use with hooks:

* `:site` - the `site` object
* `:page` - the `page` object for each non-collection page
* `:post` - the `post` object for each blog post
* `:document` - the `document` object for each document in each collection (including blog posts and custom collections)

Because I wanted this solution to work for all collections in my site, I chose to use `:document` as an easy way to make the same change for all collection types.

There were two events for `:document` that immediately seemed relevant to my goal: 

* `:pre_render` - fires before the document content is rendered
* `:post_render` - fires after the document content is rendered but before the content is written to disk 

It seemed clear that getting the Markdown content would require using the `:pre_render` event, so I started by using this setup:

```ruby
Jekyll::Hooks.register :documents, :pre_render do |doc, payload|

  # code goes here

end
```

Each hook is passed its target container object, in this case `doc` is a document, and a `payload` object containing all of the relevant variables for working with the document (these are the variables available inside of a template when the document is rendered). 

The `:document, :prerender` hook is called just before each document is rendered, meaning you don't need to worry about looping over collections manually.

## The catch: Rendering doesn't mean what you think it means

I figured that the `content` property inside of a `:document, :pre_render` hook would contain the Liquid-rendered Markdown instead of the final HTML, but I was only half correct. The `content` property actually contains the unprocessed Markdown that still contains all of the Liquid variables. It turns out that "prerender" means something different than I thought.

The lifecycle of the `content` property for a given document in Jekyll looks like this[^4]:

1. The `content` property contains the file content with the front matter removed (typically Markdown)
1. `:pre_render` hook fires
1. The `content` property is rewritten with Liquid tags rendered (this is what Jekyll internally refers to as *rendering*)
1. The `content` property is rewritten after being passed through a converter (this is what Jekyll internally refers to as *converting*)
1. The `:post_render` hook fires

While Jekyll internally separates rendering (which is apply Liquid) and converting (the Markdown to HTML conversion, for example), the exposed hooks don't make this distinction. That means if I want Markdown content with Liquid variables replaced then I'll need to get the prerendered Markdown content and render it myself.

## The solution

At this point, my plan was to create a `pre_render` hook that did the following:

1. Retrieved the raw content for each document (contained in `doc.content`)
1. Render that content using Liquid
1. Store the result in a new property called `unconverted_content` that would be accessible inside my templates

I started out with this basic idea of how things should look:

```ruby
Jekyll::Hooks.register :documents, :pre_render do |doc, payload|

  # get the raw content
  raw_content = doc.content

  # do something to that raw content
  rendered_content = doSomethingTo(raw_content)

  # store it back on the document
  doc.rendered_content = rendered_content
end
```

Of course, I'm not very familiar with Ruby, so it turned out this wouldn't work quite the way I thought.

First, `doc` is an instance of a class, and you cannot arbitrarily add new properties to objects in Ruby. Jekyll provides a `data` hash on the document object, however, that can be used to add new properties that are available in templates. So the last line needs to be rewritten:

```ruby
Jekyll::Hooks.register :documents, :pre_render do |doc, payload|

  # get the raw content
  raw_content = doc.content

  # do something to that raw content
  rendered_content = doSomethingTo(raw_content)

  # store it back on the document
  doc.data['rendered_content'] = rendered_content
end
```

The last line ensures that `page.rendered_content` will be available inside of templates later on (and remember, this is happening during `pre_render`, so the templates haven't yet been used).

The next step was to use Liquid to render the raw content. To figure out how to do this, I had to dig around in the Jekyll source[^5] as there wasn't any documentation. Rendering Liquid the exact same way that Jekyll does by default requires a bit of setup and pulling in pieces of data from a couple different places. Here is the final code:

```ruby
Jekyll::Hooks.register :documents, :pre_render do |doc, payload|

  # make some local variables for convenience
  site = doc.site
  liquid_options = site.config["liquid"]

  # create a template object
  template = site.liquid_renderer.file(doc.path).parse(doc.content)

  # the render method expects this information
  info = {
    :registers        => { :site => site, :page => payload['page'] },
    :strict_filters   => liquid_options["strict_filters"],
    :strict_variables => liquid_options["strict_variables"],
  }

  # render the content into a new property
  doc.data['rendered_content'] = template.render!(payload, info)
end
```

The first step in this hook is to create a Liquid template object. While you can do this directly using `Liquid::Template`, Jekyll caches Liquid templates internally when using `site.liquid_renderer.file(doc.path)`, so it makes sense to use that keep the Jekyll build as fast as possible. The content is then parsed into a template object.

The `template.render()` method needs not only the `payload` object but also some additional information. The `info` hash passes in `registers`, which are local variables accessible inside of the template, and some options for how liquid should behave. With all of that data ready, the content is rendered into the new property.

This file then needs to be placed in the `_plugins` directory of a Jekyll site to run each time the site is built.

## Accessing `rendered_content`

With this plugin installed, the Markdown content is available through the `rendered_content` property, like this:

```liquid
{{ page.rendered_content }}
```

The only problem is that outputting `page.rendered_content` into a Markdown page will cause all of that Markdown to be converted into HTML. (Remember, Jekyll internally renders Liquid first and then the result is converted into HTML.) So in order to output the raw Markdown, you'll need to either apply a filter that prevents the Markdown-to-HTML conversion from happening, or use a file type that doesn't convert automatically.

In my case, I'm storing the Markdown content in a JSON structure, so I'm using the `jsonify` filter, like this:

```liquid
---
layout: null
---
{
    {% assign post = site.posts.first %}
    "id": "{{ post.url | absolute_url | sha1 }}",
    "title": {{ post.title | jsonify }},
    "date_published": "{{ post.date | date_to_xmlschema }}",
    "date_published_pretty": "{{ post.date | date: "%B %-d, %Y" }}",
    "summary": {{ post.excerpt | strip_html | strip_newlines | jsonify }},
    "content_markdown": {{ post.rendered_content | jsonify }},
    "content_html": {{ post.content | jsonify }},
    "tags": {{ post.tags | jsonify }},
    "url": "{{ post.url | absolute_url }}"
}
```

Another option is to create a `rendered_content.txt` file in the `_includes` directory that just contains this:

```liquid
{{ page.rendered_content }}
```

Then, you can include that file anywhere you want the unconverted Markdown content, like this:

```liquid
{% include "rendered_content.txt" %}
```

## Conclusion

Jekyll hooks are a useful feature that let you interact with Jekyll while it is generating your site, allowing you to intercept, modify, and add data along the way. While there aren't a lot of examples in the wild, the concept is straightforward enough that with a few pointers, any programmer should be able to get something working. The biggest stumbling point for me was the lack of documentation on how to use Jekyll hooks, so I'm hoping that this writeup will help others who are trying to accomplish similar tasks in their Jekyll sites.

To date, I've found Jekyll to be extremely versatile and customizable. Being able to get the Liquid-rendered Markdown (even though it took a bit of work) has made my publishing workflow much more flexible, as I'm now more easily able to crosspost my writing on various other sites.


[^1]: [Jekyll](https://jekyllrb.com/)
[^2]: [Jekyll Plugins](https://jekyllrb.com/docs/plugins/)
[^3]: [jekyll-archives](https://github.com/jekyll/jekyll-archives)
[^4]: [Jekyll Order of Interpretation](https://jekyllrb.com/tutorials/orderofinterpretation/)
[^5]: [Jekyll renderer.rb](https://github.com/jekyll/jekyll/blob/be78b4246c4513738eb4c18b76569182dd4f8578/lib/jekyll/renderer.rb#L70-L93)
