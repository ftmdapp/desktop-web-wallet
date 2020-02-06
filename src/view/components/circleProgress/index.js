import React from 'react';
import { VictoryPie, VictoryLabel, VictoryAnimation } from 'victory';

export default class CircleProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 25,
      data: this.getData(0),
    };
  }

  componentDidMount() {
    let percent = 25;
    this.setStateInterval = window.setInterval(() => {
      percent += Math.random() * 25;
      percent = percent > 100 ? 0 : percent;
      this.setState({
        percent,
        data: this.getData(percent),
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  render() {
    const { data } = this.state;
    return (
      <div className="mx-auto" style={{ maxWidth: 139 }}>
        <svg viewBox="0 0 300 300" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={300}
            height={300}
            data={data}
            innerRadius={135}
            labels={() => null}
            style={{
              data: {
                fill: () => {
                  return '#e1e3e7';
                },
              },
            }}
          />
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={300}
            height={300}
            data={data}
            innerRadius={135}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: {
                fill: ({ datum }) => {
                  const color = datum.y > 30 ? 'green' : 'red';
                  return datum.x === 1 ? color : 'transparent';
                },
              },
            }}
          />
          <VictoryAnimation duration={1000} data={this.state}>
            {newProps => {
              return (
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={150}
                  y={150}
                  text={`${Math.round(newProps.percent)}%`}
                  style={{ fontSize: 45 }}
                />
              );
            }}
          </VictoryAnimation>
        </svg>
      </div>
    );
  }
}
