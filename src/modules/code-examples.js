import { Timeliner } from 'modules/Timeliner';

const startRotate = '0deg';
const endRotate = '45deg';


  const keyFrames = ['0deg', '60deg', '275deg', '360deg'];

console.log(keyFrames);

const animateElementTo = () => null;

  animateElementTo(keyFrames[0],
    () => animateElementTo(keyFrames[1],
      () => animateElementTo(keyFrames[2],
        () => animateElementTo(keyFrames[3]))),
  );

console.log(startRotate, endRotate);



// более реальная конфигурация

  const keyframe0 =  { rotation: '0deg', x: 0, y: 0 };
  const keyframe1 =  { rotation: '45deg', x: 100, y: 200 };
  const timeBetweenMs = 300;
  const interpolationType = 'ease-in-out';

console.log(keyframe0, keyframe1, timeBetweenMs, interpolationType);

// timeliner

  const someNode = document.getElementById('someNode');

  const someNodeTimeline = new Timeliner(someNode, [
    { rotation: '0deg', x: 0, y: 0, progress: 0 },
    { rotation: '60deg', x: 100, y: 200, interpolation: 'ease-in-out', progress: 50 },
    { rotation: '360deg', x: 0, y: -100, interpolation: 'ease', progress: 100 },
  ]);

  // начинаем анимацию, рисуем первый ключевой кадр
  someNodeTimeline.draw(0);
  // хотим отрисовать состояние анимации, когда исполнено 30%
  someNodeTimeline.draw(30);
  // хотим отрисовать состояние анимации, когда исполнено 72.32%
  someNodeTimeline.draw(72.32);
  // завершаем анимацию, рисуем последний ключевой кадр
  someNodeTimeline.draw(100);

console.log(someNodeTimeline);
