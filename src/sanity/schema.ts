export const blog = {
  name: "blog",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } },
    { name: "content", title: "Content", type: "array", of: [{ type: "block" }] },
    { name: "date", title: "Date", type: "date" },
    { name: "author", title: "Author", type: "string" },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Blog", value: "Blog" },
          { title: "News", value: "News" },
        ],
      },
    },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
  ],
};

export const event = {
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "date", title: "Date & Time", type: "datetime" },
    { name: "time", title: "Time", type: "string" },
    { name: "location", title: "Location", type: "string" },
    { name: "description", title: "Description", type: "text" },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Fundraiser", value: "Fundraiser" },
          { title: "Youth", value: "Youth" },
          { title: "Ministry", value: "Ministry" },
          { title: "Study", value: "Study" },
        ],
      },
    },
    { name: "attendees", title: "Attendees", type: "string" },
  ],
};
export const preacher = {
  name: "preacher",
  title: "Preacher",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
  ],
};

export const sermon = {
  name: "sermon",
  title: "Sermon",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "preacher", title: "Preacher", type: "reference", to: [{ type: "preacher" }] },
    { name: "date", title: "Date", type: "date" },
    { name: "type", title: "Type", type: "string", options: { list: ["Video", "Audio", "Text"] } },
    { name: "description", title: "Description", type: "array", of: [{ type: "block" }] },
    { name: "duration", title: "Duration (minutes)", type: "number" },
    { name: "image", title: "Thumbnail", type: "image", options: { hotspot: true } },
    { name: "youtubeUrl", title: "YouTube URL", type: "url" },
    { name: "notes", title: "Sermon Notes", type: "array", of: [{ type: "block" }] },
  ],
};

export const schema = {
  types: [blog, event, sermon, preacher],
};
