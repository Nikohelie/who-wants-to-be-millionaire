import { FunctionComponent } from 'react';

interface Props {
  title: string;
}

export const QuestionTitle: FunctionComponent<Props> = ({ title }) => {
  return <div className="bg-gray-900 my-3 border-3 border-blue rounded-lg text-white p-2 text-center">{title}</div>;
};
