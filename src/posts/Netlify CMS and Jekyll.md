---
title: Netlify CMS and Jekyll
isPublished: true
date: "20200503"
image: markdown.png
alt:
  a screenshot showing two vertical panels with markdown text on the left and
  the rendered rich text on the right
tags:
  - radical-directory
  - projects
---

**This post is made up of messages I sent in the Radical Directory Discord,
trying to explain the tech to the other collective members**

so I did a bunch of research into the platform which I think would, at this
point, be the easiest to use to get a functional website set up. when we had the
meeting on zoom, i assumed that it would be hard to get the core functionality
of the website - the calendar and the directory - working in an effective way.
after a bit of research, i think it is not going to be that hard after all and
can be implemented on the platform that I was proposing to make a simple site
on - Github Pages using Jekyll as a Static Site Generator. since I am pretty
sure that using Jekyll we can make a functional, adaptable website, I think
ultimately it will be easier to start with Github Pages from the get go rather
than potentially building a landing page on Wix as a trial. I am feeling excited
and motivated, I have a fair bit of capacity I think and if it's ok with others,
I feel happy to lead the more technical/code specific parts of this process of
getting the site up and running. I also feel very much able to outline and open
that process up so that anyone else can be as involved as they want, which would
be really great! to that end i'll try and outline my proposal below in more
detail

Github is a website where people can put files online as part of a project. As
well as hosting the files, it provides an interface to interact with the files
using 'git', which is software that enables 'version control'. Version control
is about keeping track of different versions of a project, and helps prevent
conflicts when different people work on things at the same time. It tracks every
change that is made, so if something goes wrong, it's easy to go back to an
earlier version. It's kind of like Google Docs or Google Drive, except that you
can't edit the same document simultaneously in real time and see each others
changes. On the plus side, it is really good at tracking the way entire folders
are changed with multiple interacting files. It is not difficult to use but
definitely has a little bit of jargon that might take a sec to wrap your head
around. There are helpful videos on youtube with quick explanations of the
github language, and there is also a longer series of videos called 'github for
poets' which is a cute and funny as well as pretty in depth overview. Github
ALSO have a service where the files that they host as part of a project can be
automatically hosted as a website. It's called Github Pages. It's free for non
commercial projects. Lots of things are hosted on Github Pages. They give you a
free web address (domain name, or in this case, subdomain) at
yourproject.github.io, which anyone can access. So really easy free way to go
public. We can also buy a custom domain name but still use Github Pages as host.
(hosting is usually the most expensive part of having a website, more than the
domain name, so this is good!)

Github Pages is set up to work with something called Jekyll. Jekyll is a 'static
site generator' (SSG) which basically means that it takes a bunch of files, like
ingredients, it runs a bit of code to transform them, like cooking, into the
different files that make up a real actual 'static' website, like a delicious
meal. In the process, it formats everything and combines it all in a way that
would be really hard to do manually. For example, if we had a cute slogan at the
top of every page, and you wanted to change the manually, you would have to go
into every single HTML file and edit the code in each one in exactly the same
way. with Jekyll, the HTML code for the top of the page, including the slogan,
is kept in one place, and the content of the pages is kept in a different place,
and the footer is in another place. When it generates the actual pages, it goes
to each separate ingredient file and combines them for you in a way that looks
nice, because the formatting information is kept in a different place. that's
how Jekyll works.

A static site is one where, once it's generated, it doesn't have to change.
Static sites are not 'interactive' - they don't by themselves generate content
in reaction to people visiting the site. Once it's generated, all the different
files that make up the site stay the same until a new version is generated. That
said, they can still do a lot of stuff - cool visual things that move, forms
that save data, etc. That stuff happens through 'client side scripting' -
usually Javascript. What static sites can't do is server side scripting. That's
when you need a dynamic site. Dynamic sites require a server, like, a computer,
to be constantly running, and they usually have databases stored in a way where
the server code can manipulate it in real time. The difference is a little bit
confusing and I'm still fully wrapping my head around it BUT it's important
because Github Pages will only allow us to have a static site.

so with Jekyll, it's built so it can run as a blog. The idea is that you have
text files, which are kept in a certain folder, and each text file is a blog
post. You just need to put a bit of particular info at the start of each file,
formatted in a particular way, so that Jekyll knows what to do with it. there's
also ways to put formatting on the content of the blog post, so you can have
headers, bold, italics, links, images etc. You just have to put certain
characters to tell it to do the formatting. That text formatting is called
'Markdown' and it's really easy to learn. then when you generate the website, it
takes all the text files and processes them and orders them by date and time in
a list, and that's how it makes the blog.

![](../public/ed39a703c6054ee510abcb086c52cb24.png)

That's a little example of markdown. the different colours and italics etc on
the left are not actually in the text - it's just a text file but whatever app
they are using is colouring the code to make it easier for the person writing it

So the difference between this and something like Wordpress is that with
Wordpress, you don't have to manually create text files - you have an online
interface which allows you to put in the content and see how it will be
formatted in real time. that feature of wordpress is called its Content
Management System or CMS.

The reason i'm talking about blogs is that they work similarly to how
directories and calendars work. Blogs, directories and calendars all collate
lots of individual packets of information. The main difference is the way that
they organise them. And unlike other preexisting blog platforms like Wordpress,
Squarespace or Wix, coding our own website using Jekyll will allow us to use our
little packets of data (whether it's a blog post, an entry to the directory, or
a description/invitation to an upcoming event) in any way that we want.

![](../public/e1964d8aa16d9de4c7ada050e87e943f.png)

For illustration, this is what a blog post looks like in Jekyll. The stuff at
the top, between the lines with three dashes, is where the information ~about~
the blog post is kept, like the title. Tags and categories also go there.

![](../public/704d863a42e184d844449a65c37ad57d.png)

so the types of information put into these headers can be set arbitrarily, which
is useful, because then you can set code in the layout pages that refers to a
certain category of information. so for example if categories and tags didn't
work for our directory, then we could organise the listings a different way.
like I was saying in the video chat, the way that we organise data about
activist orgs seems pretty important and could have interpersonal and political
implications, so it feels important to me that we can arbitrarily change the way
it is organised. so when I was talking about little packets of information, like
blog posts, directory listings, events, etc, the word Jekyll uses to talk about
that is 'collections'. Since it's built with blogs in mind to be particularly
easy, it comes installed with a preexisting collection called 'posts' and has
certain settings built in for interpreting them in a way that makes sense for
blogging. While I know we talked about action reports, I think there is still a
bit to be fleshed out about exactly what that would look like and whether it
would fit well into that 'blog' format, but either way that's probably a good
thing to know.

So obviously the major drawback to this entire approach is that in order to make
changes to the website, somebody has to change certain text files in line with
the correct formatting, upload them to Github, and then the Jekyll site needs to
be generated. Now in terms of basic use of Jekyll, github can handle the
generating part by itself, but my understanding is that when we want to do more
complex things such as using non-approved plugins, then we will have to generate
the site manually and upload the contents. This isn't hard per se, but the way
you do it is in the shell terminal on your computer, and you have to have all
the relevant software installed on your computer. This is actually the reason
I've been holding off from making a start on any of this - my computer is
currently at the repair shop. I should be getting it back tomorrow, so I can do
things then. But the point is that it's a bit of a bottleneck which is not ideal
for a site that needs to be changed and updated by multiple people, and
potentially changes will have to be made quite quickly, especially for events
that get cancelled etc. BUT I think I have a solution. So earlier I mentioned
that the difference between Wordpress and a Jekyll blog is that Wordpress has a
CMS feature. Actually, it's possible to get CMS on Jekyll too! There are a few
options, most of them are paid services, but I think the best is this one which
is actually open source, free and has instructions how to install it on Jekyll:
https://www.netlifycms.org/

Once there is a CMS installed, anyone on the Radical Directory team can just
like on wordpress, go to an 'admin' page and log in, then add, edit or delete
listings from the calendar, directory or blog if we make one. what I'm not sure
about is whether the site needs to be manually re-generated every time a change
is made. This website kind of looks like maybe it will be fine? But the truth is
that all of this is a bit theoretical for me and I'm not 100% sure if this will
work exactly how I hope it will when we put it into practice. The worst case
scenario, I think, is that we will put in a lot of work to building this site on
Github Pages only to realise that that service doesn't support dynamic CMS, so
at that point we will have to decide whether to stick with the 'text editing'
and maybe 'regenerating' situation, and getting people to upskill around that,
or to decide that the CMS is crucial and we look into the costs of hosting the
website somewhere else so the site can be dynamic. Best case scenario is that it
works fine on Github Pages and we end up with a completely functional site for
freeeee! The other thing that might be a bit ambiguous or confusing here is that
while I described earlier how the Static Site Generation of Jekyll works, I
don't know ~exactly~ how it works. So I don't know if it's fully static once
it's generated or if it can still pull different files together, like the 'blog
post' or 'collections' type text files. Because I'm not sure about that, that's
why I'm not 100% sure that the CMS we install will work to automatically update
the website while it is hosted on Github Pages. but i think it's worth a shot!

![](../public/b17161af7688492c77dda0625bf6fef9.png)

![](../public/97d12e8ff9700b483255497b58f301b7.png)

![](../public/dfcde64ed3f1b7f63a463f776cbf4da0.png)
