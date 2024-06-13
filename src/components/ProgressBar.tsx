import * as React from 'react';
import {
  Progress,
  ProgressVariant,
  ProgressMeasureLocation,
} from '@patternfly/react-core';

interface Summary {
  errored: number;
  failed: number;
  passed: number;
  skipped: number;
  total: number;
}

interface ProgressBarProps {
  summary: Summary;
  onFilterChange: (filter: string) => void; // Callback to handle filter changes
}

export const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({
  summary,
  onFilterChange,
}) => {
  const {  failed, passed, skipped, total } = summary;

  const handleFilterClick = (filter: string) => {
    onFilterChange(filter);
  };

  return (
    <div className="progress-bar-container" style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleFilterClick('passed')}>
        <div>{passed}</div>
        <Progress
          value={passed}
          title="Passed"
          variant={ProgressVariant.success}
          measureLocation={ProgressMeasureLocation.none}
          aria-label="Passed Progress"
          style={{ height: '20px', width: '200px' }}
        />
      </div>
      <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleFilterClick('failed')}>
        <div>{failed}</div>
        <Progress
          value={failed}
          title="Failed"
          variant={ProgressVariant.danger}
          measureLocation={ProgressMeasureLocation.none}
          aria-label="Failed Progress"
          style={{ height: '20px', width: '200px' }}
        />
      </div>
      <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleFilterClick('skipped')}>
        <div>{skipped}</div>
        <Progress
          value={skipped}
          title="Skipped"
          variant={ProgressVariant.warning}
          measureLocation={ProgressMeasureLocation.none}
          aria-label="Skipped Progress"
          style={{ height: '20px', width: '200px' }}
        />
      </div>
   
      <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleFilterClick('all')}>
        <div>{total}</div>
        <Progress
          value={total}
          title="Total"
          measureLocation={ProgressMeasureLocation.none}
          aria-label="Total Progress"
          style={{ height: '20px', width: '200px' }}
        />
      </div>
    </div>
  );
};
