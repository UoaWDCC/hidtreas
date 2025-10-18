import Template1 from '@/components/blogs/templates/Template1'
import Template2 from '@/components/blogs/templates/Template2'
import Template3 from '@/components/blogs/templates/Template3'

// All valid template keys
export const TEMPLATE_KEYS = ['template1', 'template2', 'template3'] as const
export type TemplateKey = typeof TEMPLATE_KEYS[number]

// Map of key -> actual React component
export const BLOG_TEMPLATES: Record<TemplateKey, React.FC<any>> = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
}
