import * as React from 'react';
import {
  ListPageHeader,
  ListPageBody,
  VirtualizedTable,
  K8sResourceCommon,
  TableData,
  RowProps,
  TableColumn,
} from '@openshift-console/dynamic-plugin-sdk';
import { useTranslation } from 'react-i18next';

interface CnfCertificationSuiteRun extends K8sResourceCommon {
  status: {
    report: {
      results:Results[]
  };
  };
}
interface Results {
  testCaseName: string;
  result: string;
  reason?: string;
};

const columns: TableColumn<CnfCertificationSuiteRun>[] = [
  {
    title: 'Test Case Name',
    id: 'testCaseName',
  },
  {
    title: 'Result',
    id: 'result',
  },
  {
    title: 'Reason',
    id: 'reason',
  },
];

const CnfCertificationSuiteRunRow: React.FC<RowProps<Results>> = ({ obj, activeColumnIDs }) => {
  console.log(obj)
  return (
    <>
          <TableData id={columns[0].id} activeColumnIDs={activeColumnIDs}>
            {obj.testCaseName}
          </TableData>
          <TableData id={columns[1].id} activeColumnIDs={activeColumnIDs}>
            {obj.result}
          </TableData>
          <TableData id={columns[2].id} activeColumnIDs={activeColumnIDs}>
            {obj.reason || 'N/A'}
          </TableData>
      
    </>
  );
};

const CnfCertificationSuiteRunTable: React.FC<{ data: Results[]; loaded: boolean; loadError: any }> = ({
  data,
  loaded,
  loadError,
}) => (
  <VirtualizedTable<Results>
    data={data}
    unfilteredData={data}
    loaded={loaded}
    loadError={loadError}
    columns={columns}
    Row={CnfCertificationSuiteRunRow}
  />
);

const NavPage = ({obj}) => {
  const { t } = useTranslation();
  return (
    <>
      <ListPageHeader title={t('Cnf Certification Suite Run Results')} />
      <ListPageBody>
        <CnfCertificationSuiteRunTable data={obj.status.report.results} loaded loadError={null} />
      </ListPageBody>
    </>
  );
};

export default NavPage;