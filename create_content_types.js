
const { execSync } = require('child_process');

const contentTypes = {
  News: {
    singular: 'news',
    plural: 'news-list',
    fields: {
      title: 'string',
      slug: 'uid:title',
      summary: 'text',
      cover_image: 'media',
      content: 'richtext',
      category: 'relation:oneToOne:api::category.category',
      tags: 'relation:manyToMany:api::tag.tag',
      seo_title: 'string',
      seo_description: 'text',
      featured: 'boolean',
      status: 'enumeration:draft,published',
      published_at: 'datetime',
    },
  },
  KnowledgeBase: {
    singular: 'knowledge-base',
    plural: 'knowledge-bases',
    fields: {
      title: 'string',
      slug: 'uid:title',
      summary: 'text',
      cover_image: 'media',
      content: 'richtext',
      category: 'relation:oneToOne:api::category.category',
      tags: 'relation:manyToMany:api::tag.tag',
      seo_title: 'string',
      seo_description: 'text',
      featured: 'boolean',
      status: 'enumeration:draft,published',
      published_at: 'datetime',
    },
  },
  Blog: {
    singular: 'blog',
    plural: 'blogs',
    fields: {
      title: 'string',
      slug: 'uid:title',
      summary: 'text',
      cover_image: 'media',
      content: 'richtext',
      category: 'relation:oneToOne:api::category.category',
      tags: 'relation:manyToMany:api::tag.tag',
      seo_title: 'string',
      seo_description: 'text',
      featured: 'boolean',
      status: 'enumeration:draft,published',
      published_at: 'datetime',
    },
  },
  Case: {
    singular: 'case',
    plural: 'cases',
    fields: {
      title: 'string',
      slug: 'uid:title',
      summary: 'text',
      cover_image: 'media',
      content: 'richtext',
      category: 'relation:oneToOne:api::category.category',
      tags: 'relation:manyToMany:api::tag.tag',
      seo_title: 'string',
      seo_description: 'text',
      featured: 'boolean',
      status: 'enumeration:draft,published',
      published_at: 'datetime',
    },
  },
  Skill: {
    singular: 'skill',
    plural: 'skills',
    fields: {
      title: 'string',
      slug: 'uid:title',
      summary: 'text',
      cover_image: 'media',
      content: 'richtext',
      category: 'relation:oneToOne:api::category.category',
      tags: 'relation:manyToMany:api::tag.tag',
      seo_title: 'string',
      seo_description: 'text',
      featured: 'boolean',
      status: 'enumeration:draft,published',
      published_at: 'datetime',
      install_guide: 'richtext',
      usage_examples: 'richtext',
      repo_link: 'string',
      version: 'string',
    },
  },
  Hardware: {
    singular: 'hardware',
    plural: 'hardwares',
    fields: {
      title: 'string',
      slug: 'uid:title',
      summary: 'text',
      cover_image: 'media',
      content: 'richtext',
      category: 'relation:oneToOne:api::category.category',
      tags: 'relation:manyToMany:api::tag.tag',
      seo_title: 'string',
      seo_description: 'text',
      featured: 'boolean',
      status: 'enumeration:draft,published',
      published_at: 'datetime',
      scenario: 'text',
      configuration: 'richtext',
      selling_points: 'json',
      buy_link: 'string',
    },
  },
  Event: {
    singular: 'event',
    plural: 'events',
    fields: {
      title: 'string',
      slug: 'uid:title',
      type: 'enumeration:public,bootcamp,enterprise',
      start_time: 'datetime',
      end_time: 'datetime',
      location: 'string',
      signup_deadline: 'datetime',
      agenda: 'richtext',
      gallery: 'media:multiple',
      recap_content: 'richtext',
      status: 'enumeration:upcoming,open,finished',
    },
  },
  Signup: {
    singular: 'signup',
    plural: 'signups',
    fields: {
      event: 'relation:oneToOne:api::event.event',
      name: 'string',
      phone: 'string',
      email: 'string',
      company: 'string',
      role: 'string',
      note: 'text',
      status: 'enumeration:new,contacted,confirmed',
    },
  },
  Category: {
    singular: 'category',
    plural: 'categories',
    fields: {
      name: 'string',
      slug: 'uid:name',
      type_scope: 'enumeration:news,kb,blog,case,skill,hardware,event',
      order: 'integer',
    },
  },
  Tag: {
    singular: 'tag',
    plural: 'tags',
    fields: {
      name: 'string',
      slug: 'uid:name',
      type_scope: 'string',
    },
  },
};

function generateContentType(name, config) {
  console.log(`Generating content type: ${name}...`);
  const { singular, plural, fields } = config;
  const attributes = Object.entries(fields)
    .map(([key, value]) => `--attributes.${key}=${value}`)
    .join(' ');

  const command = ` \
    cd /home/ubuntu/tokenstar/backend && \
    yarn strapi generate content-type \
    --content-type-name=${singular} \
    --plural-name=${plural} \
    ${attributes}
  `;

  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`Successfully generated content type: ${name}`);
  } catch (error) {
    console.error(`Failed to generate content type: ${name}`, error);
  }
}

// Generate base types first
generateContentType('Category', contentTypes.Category);
generateContentType('Tag', contentTypes.Tag);

// Generate other types
for (const [name, config] of Object.entries(contentTypes)) {
  if (name !== 'Category' && name !== 'Tag') {
    generateContentType(name, config);
  }
}

