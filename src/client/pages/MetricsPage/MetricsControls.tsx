import React from 'react';
import Sticky from '../../components/Sticky';
import CategoryButtons from './CategoryButtons';
import RangeButtons from './RangeButtons';
import './MetricsControls.scss';
import { StateDispatchProps } from './useMetricsReducer';

const MetricControls: React.FC<StateDispatchProps> = ({ state, dispatch }) => {
  const { range, category } = state;

  return (
    <Sticky>
      {(stuck: boolean) => (
        <div className={`metrics-controls${stuck ? ' stuck' : ''}`}>
          <div className={stuck ? 'container' : ''}>
            <CategoryButtons
              category={category}
              setCategory={(payload) =>
                dispatch({ type: 'SET_CATEGORY', payload })
              }
            />
            <RangeButtons
              range={range}
              setRange={(payload) => dispatch({ type: 'SET_RANGE', payload })}
            />
          </div>
        </div>
      )}
    </Sticky>
  );
};

export default MetricControls;
