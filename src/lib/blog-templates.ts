import Template1 from '@/components/blogs/templates/Template1'
import Template2 from '@/components/blogs/templates/Template2'
import Template3 from '@/components/blogs/templates/Template3'
import Template4 from "@/components/blogs/templates/Template4";

// All valid template keys
export const TEMPLATE_KEYS = ['template1', 'template2', 'template3', 'template4'] as const
export type TemplateKey = typeof TEMPLATE_KEYS[number]

// Map of key -> actual React component
export const BLOG_TEMPLATES: Record<TemplateKey, React.FC<any>> = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
  template4: Template4,
}
