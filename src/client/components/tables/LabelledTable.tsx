import React from 'react';
import { Table, Column, Props as TableProps } from './Table';

interface Props extends Partial<TableProps> {
  data: string[][];
}

const columns: Column[] = [
  { target: 'left' },
  { target: 'right', style: { textAlign: 'right' } },
];

const LabelledTable: React.FC<Props> = ({ data = [], ...props }) => {
  const formattedData = data.map(([left, right], id) => ({ left, right, id }));

  return (
    <Table
      noHeader
      keyId="id"
      data={formattedData}
      columns={columns}
      {...props}
    />
  );
};

export default LabelledTable;
