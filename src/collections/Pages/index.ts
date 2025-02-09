import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import { AccordionBlock } from '../../blocks/AccordionBlock/config';
import TabsBlock from '../../blocks/TabsBlock/config';

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

const validateSingleHomePage = async ({ data, req, operation }) => {
  if (data.isHomePage) {
    const existingHomePage = await req.payload.find({
      collection: 'pages',
      where: {
        isHomePage: {
          equals: true,
        },
        id: {
          not_equals: data.id,
        },
      },
    })

    if (existingHomePage.docs.length > 0) {
      throw new Error('No se puede guardar: Ya existe una página marcada como inicio.')
    }
  }
  return data
}

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar', // Esto lo pondrá en la barra lateral
      },
    },
    {
      name: 'isHomePage', // Campo para identificar la página de inicio
      type: 'checkbox',
      label: '¿Es esta la página de inicio?',
      defaultValue: false, // Por defecto no será la página de inicio
      required: false,
      validate: async (val, { req, id }) => {
        if (val) {
          const existingHomePage = await req.payload.find({
            collection: 'pages',
            where: {
              isHomePage: {
                equals: true,
              },
              id: {
                not_equals: id,
              },
            },
          })

          if (existingHomePage.docs.length > 0) {
            return 'Ya existe una página marcada como inicio. Por favor, desmarca la página existente antes de marcar esta.'
          }
        }
        return true
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                {
                  slug: 'iframeBlock', // Identificador único para el bloque
                  labels: {
                    singular: 'Iframe',
                    plural: 'Iframes',
                  },
                  fields: [
                    {
                      name: 'size', // Selector de tamaño
                      label: 'Size',
                      type: 'select',
                      options: [
                        { label: 'Full', value: 'full' },
                        { label: 'Half', value: 'half' },
                        { label: 'One Third', value: 'oneThird' },
                        { label: 'Two Thirds', value: 'twoThirds' },
                      ],
                      defaultValue: 'full', // Valor por defecto
                    },
                    {
                      name: 'iframeCode',
                      type: 'textarea', // Campo para insertar el código del iframe
                      label: 'Código del iframe',
                      required: true,
                    },
                  ],
                },
                {
                  slug: 'htmlBlock', // Identificador único del bloque
                  labels: {
                    singular: 'Bloque HTML',
                    plural: 'Bloques HTML',
                  },
                  fields: [
                    {
                      name: 'size', // Selector de tamaño
                      label: 'Size',
                      type: 'select',
                      options: [
                        { label: 'Full', value: 'full' },
                        { label: 'Half', value: 'half' },
                        { label: 'One Third', value: 'oneThird' },
                        { label: 'Two Thirds', value: 'twoThirds' },
                      ],
                      defaultValue: 'full', // Valor por defecto
                    },
                    {
                      name: 'html', // Nombre del campo
                      type: 'textarea', // Campo de texto largo para introducir HTML
                      label: 'Código HTML',
                      admin: {
                        description: 'Introduce el código HTML que se renderizará.',
                      },
                    },
                  ],
                },
                {
                  slug: 'code', // Identificador del bloque
                  labels: {
                    singular: 'Bloque de Código',
                    plural: 'Bloques de Código',
                  },
                  fields: [
                    {
                      name: 'size', // Selector de tamaño
                      label: 'Size',
                      type: 'select',
                      options: [
                        { label: 'Full', value: 'full' },
                        { label: 'Half', value: 'half' },
                        { label: 'One Third', value: 'oneThird' },
                        { label: 'Two Thirds', value: 'twoThirds' },
                      ],
                      defaultValue: 'full', // Valor por defecto
                    },
                    {
                      name: 'language', // Lenguaje del código para el resaltado
                      type: 'select', // Campo select para elegir el lenguaje
                      options: [
                        { label: 'JavaScript', value: 'javascript' },
                        { label: 'HTML', value: 'html' },
                        { label: 'CSS', value: 'css' },
                        { label: 'Python', value: 'python' },
                        // Agrega más lenguajes si los necesitas
                      ],
                      label: 'Lenguaje',
                    },
                    {
                      name: 'code', // Campo para el código
                      type: 'textarea', // Área de texto para introducir el código
                      required: true,
                      label: 'Código',
                    }
                  ],
                },
                AccordionBlock,
                TabsBlock
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },

          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [validateSingleHomePage, populatePublishedAt],
    beforeDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
