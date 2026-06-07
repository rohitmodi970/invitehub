import { notFound } from 'next/navigation';
import { getTemplateById } from '@/lib/utils/template-helpers';
import { EditorWorkspace } from '@/app/editor/[templateId]/EditorWorkspace';

interface EditorPageProps {
  params: Promise<{ templateId: string }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { templateId } = await params;
  const initialTemplate = getTemplateById(templateId);

  if (!initialTemplate) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <EditorWorkspace initialTemplateId={initialTemplate.id} />
    </div>
  );
}
