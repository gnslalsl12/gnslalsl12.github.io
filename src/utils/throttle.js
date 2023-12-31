export const throttle = (func, limit) => {
  let lastFunc; //마지막으로 실행된 함수
  let lastRan; //마지막으로 함수가 실행된 시간

  //새로운 함수 반환(스로틀링 된 함수)
  return function () {
    const context = this; //현재 함수의 컨텍스트(this);
    const args = arguments; //현재 함수의 인수(arguments);

    //처음 호출되었을 때 또는 실행 간격(limit)을 초과한 경우
    if (!lastRan || Date.now() - lastRan >= limit) {
      //함수를 실행하고 실행 시간을 기록
      func.apply(context, args);
      lastRan = Date.now();
    }
    //실행 간격이 지정된 limit 내에 있는 경우
    else {
      clearTimeout(lastFunc); //이전의 setTimeout을 취소

      //남은 시간동안 setTimeout을 설정하여
      //limit 내에 함수가 한 번만 실행되도록 보장
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          //함수를 실행하고 실행 시간을 기록
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
