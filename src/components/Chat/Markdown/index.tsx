import Markdown from 'react-markdown';
import rehypeAddClass from 'rehype-class-names';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface IProps {
  text: string;
  addClass?: {
    [key: string]: string;
  };
  components?: {
    [key: string]: React.FC<any>;
  };
}

const defaultComponents: { [key: string]: React.FC<any> } = {
  del: ({
    node,
    children,
    ...props
  }: {
    node: any;
    children: React.ReactNode;
    [key: string]: any;
  }) => {
    return <span>{children}</span>;
  },
  // 다른 기본 커스터마이징된 컴포넌트 추가 가능
};

const MarkdownView: React.FC<IProps> = ({ text, addClass, components }) => {
  const escapeDel = text.replace(/~(.*?)~/g, '\\~$1\\~');
  const mergedComponents = { ...defaultComponents, ...components };

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, [rehypeAddClass, addClass]]}
      components={mergedComponents}
    >
      {escapeDel}
    </Markdown>
  );
};

export default MarkdownView;
