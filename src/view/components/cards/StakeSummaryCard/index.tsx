import React from 'react';
import { Card, Button } from 'reactstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';

export default () => (
  <Card>
    <p className="card-label mb-4 mb-md-6">Summary</p>
    <div className={styles.contentWrapper}>
      <div className={classnames(styles.fields)}>
        <h3 className={classnames('opacity-7', styles.label)}>
          Amount to stake:
        </h3>
        <h2 className={classnames(styles.value)}>
          1,746,306 FTM
          <Button
            color="topaz"
            className={classnames('outlined', styles.editBtn)}
          >
            Edit
          </Button>
        </h2>
      </div>
      <div className={classnames(styles.fields)}>
        <h3 className={classnames('opacity-7', styles.label)}>
          Validator node:
        </h3>
        <h2 className={classnames(styles.value)}>
          Fantom Foundation
          <Button
            color="topaz"
            className={classnames('outlined', styles.editBtn)}
          >
            Edit
          </Button>
        </h2>
      </div>
    </div>
    <div className={classnames('text-center', styles.btnWrapper)}>
      <Button color="topaz" className={classnames('outlined lg w-100')}>
        Stake
      </Button>
    </div>
  </Card>
);
