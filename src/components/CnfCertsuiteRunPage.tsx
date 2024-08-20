import * as React from 'react';
import {
  ListPageHeader,
  ListPageBody,
  ListPageCreate,
  VirtualizedTable,
  useK8sWatchResource,
  K8sResourceCommon,
  TableData,
  RowProps,
  ResourceLink,
  ResourceIcon,
  TableColumn,
} from '@openshift-console/dynamic-plugin-sdk';
import { useTranslation } from 'react-i18next';

type CnfCertificationSuiteRunTableProps = {
  data: K8sResourceCommon[];
  unfilteredData: K8sResourceCommon[];
  loaded: boolean;
  loadError: any;
};

const CnfCertificationSuiteRunTable: React.FC<CnfCertificationSuiteRunTableProps> = ({ data, unfilteredData, loaded, loadError }) => {
  const { t } = useTranslation();

  const columns: TableColumn<K8sResourceCommon>[] = [
    {
      title: t('plugin__certsuite-operator-plugin~Name'),
      id: 'name',
    },
    {
      title: t('plugin__certsuite-operator-plugin~Namespace'),
      id: 'namespace',
    },
  ];

  const CnfCertificationSuiteRunRow: React.FC<RowProps<K8sResourceCommon>> = ({ obj, activeColumnIDs }) => {
    return (
      <>
        <TableData id={columns[0].id} activeColumnIDs={activeColumnIDs}>
          <ResourceLink kind="cnf-certifications.redhat.com~v1alpha1~CnfCertificationSuiteRun" name={obj.metadata.name} namespace={obj.metadata.namespace}  />
        </TableData>
        <TableData id={columns[1].id} activeColumnIDs={activeColumnIDs}>
          <ResourceLink kind="Namespace" name={obj.metadata.namespace} />
        </TableData>
      </>
    );
  };

  return (
    <VirtualizedTable<K8sResourceCommon>
      data={data}
      unfilteredData={unfilteredData}
      loaded={loaded}
      loadError={loadError}
      columns={columns}
      Row={CnfCertificationSuiteRunRow}
    />
  );
};

const ListPage = ({namespace,name}) => {
  const { t } = useTranslation();

  const [resources, loaded, loadError] = useK8sWatchResource<K8sResourceCommon[]>({
    groupVersionKind: {
      group: 'cnf-certifications.redhat.com', 
      version: 'v1alpha1',                         
      kind: 'CnfCertificationSuiteRun',      
    },
    namespace,
    name,
    isList: true,
    namespaced: true,
  });

  return (
    <>
      <ListPageHeader title={t('plugin__certsuite-operator-plugin~CnfCertificationSuiteRun CRs List')}>
   
      </ListPageHeader>
      <ListPageHeader title={t('')}>
      <ListPageCreate groupVersionKind={{ group: 'cnf-certifications.redhat.com', version: 'v1alpha1', kind: 'CnfCertificationSuiteRun' }}>
          {t('plugin__certsuite-operator-plugin~Create a CnfCertificationSuiteRun CR')}
        </ListPageCreate>
      </ListPageHeader>
      <ListPageBody>
        <CnfCertificationSuiteRunTable
          data={resources}
          unfilteredData={resources}
          loaded={loaded}
          loadError={loadError}
        />
      </ListPageBody>
      <ListPageBody>
        <p>{t('plugin__certsuite-operator-plugin~Sample ResourceIcon for CnfCertificationSuiteRun')}</p>
        <ResourceIcon kind="CnfCertificationSuiteRun" />
      </ListPageBody>
    </>
  );
};

export default ListPage;
